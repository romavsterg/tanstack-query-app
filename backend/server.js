import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import pkg from "pg"

const { Pool } = pkg

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const router = express.Router()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const JWT_SECRET = "secret_access"
const REFRESH_SECRET = "secret_refresh"

// -------------------- AUTH HELPERS --------------------

function signAccess(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  )
}

function signRefresh(user) {
  return jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  )
}

// -------------------- AUTH MIDDLEWARE --------------------

// строгий (обязательно токен)
function auth(req, res, next) {
  const access = req.headers.authorization?.split(" ")[1]

  if (access) {
    try {
      req.user = jwt.verify(access, JWT_SECRET)
      return next()
    } catch {}
  }

  const refresh = req.cookies.refresh

  if (!refresh) {
    return res.status(401).json({ error: "no token" })
  }

  try {
    const data = jwt.verify(refresh, REFRESH_SECRET)
    req.user = { id: data.id }
    next()
  } catch {
    return res.status(401).json({ error: "invalid token" })
  }
}

// мягкий (может быть null)
function optionalAuth(req, res, next) {
  const header = req.headers.authorization
  const token = header?.split(" ")[1]

  if (!token) {
    req.user = null
    return next()
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET)
  } catch {
    req.user = null
  }

  next()
}

// -------------------- AUTH ROUTES --------------------

router.post("/auth/register", async (req, res) => {
  const { email, password } = req.body

  const hash = await bcrypt.hash(password, 10)
  
  const user = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id,email",
    [email, hash]
  )

  res.json(user.rows[0])
})

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body

  const userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  )

  const user = userRes.rows[0]
  if (!user) return res.status(401).json({ error: "no user" })

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: "bad password" })

  const access = signAccess(user)
  const refresh = signRefresh(user)

  await pool.query(
    "INSERT INTO refresh_tokens (token, user_id) VALUES ($1,$2)",
    [refresh, user.id]
  )

  res.cookie("refresh", refresh, {
    httpOnly: true,
    sameSite: "lax"
  })

  res.json({ access })
})

router.post("/auth/refresh", async (req, res) => {
  const token = req.cookies.refresh
  if (!token) return res.sendStatus(401)

  try {
    const data = jwt.verify(token, REFRESH_SECRET)

    const stored = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token=$1",
      [token]
    )

    if (!stored.rows.length) return res.sendStatus(403)

    const user = await pool.query(
      "SELECT id,email FROM users WHERE id=$1",
      [data.id]
    )

    const access = signAccess(user.rows[0])

    res.json({ access })
  } catch {
    res.sendStatus(403)
  }
})

router.post("/auth/logout", async (req, res) => {
  const token = req.cookies.refresh

  await pool.query(
    "DELETE FROM refresh_tokens WHERE token=$1",
    [token]
  )

  res.clearCookie("refresh")
  res.json({ ok: true })
})

// -------------------- USER --------------------

router.get("/me", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT id,email FROM users WHERE id=$1",
    [req.user.id]
  )

  const user = result.rows[0]


  if (!user) {
    return res.status(401).json({ error: "user not found" })
  }

  res.json(user)
})

// -------------------- PRODUCTS --------------------

// 🌍 PUBLIC (без токена вообще)
router.get("/products", async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  const pageRaw = Number(req.query.page ?? 1);
  const limitRaw = Number(req.query.limit ?? 10);

  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 100) : 10;

  const offset = (page - 1) * limit;
  const searchPattern = `%${search}%`;

  const countQuery = pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM products
    WHERE is_public = true
      AND name ILIKE $1
    `,
    [searchPattern]
  );

  const itemsQuery = pool.query(
    `
    SELECT id, name, price, owner_id, is_public, created_at, updated_at
    FROM products
    WHERE is_public = true
      AND name ILIKE $1
    ORDER BY id
    LIMIT $2 OFFSET $3
    `,
    [searchPattern, limit, offset]
  );

  const [countResult, itemsResult] = await Promise.all([countQuery, itemsQuery]);

  const total = countResult.rows[0]?.total ?? 0;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  res.json({
    items: itemsResult.rows,
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
  });
});

// 🌍 PUBLIC item
router.get("/products/:id", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM products
     WHERE id=$1 AND is_public=true`,
    [req.params.id]
  )

  if (!result.rows[0]) return res.sendStatus(404)

  res.json(result.rows[0])
})

// 🔐 my products
router.get("/my-products", auth, async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  const pageRaw = Number(req.query.page ?? 1);
  const limitRaw = Number(req.query.limit ?? 10);

  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 100) : 10;

  const offset = (page - 1) * limit;
  const searchPattern = `%${search}%`;

  const countQuery = pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM products
    WHERE owner_id = $1
      AND name ILIKE $2
    `,
    [req.user.id, searchPattern]
  );

  const itemsQuery = pool.query(
    `
    SELECT id, name, price, owner_id, is_public, created_at, updated_at
    FROM products
    WHERE owner_id = $1
      AND name ILIKE $2
    ORDER BY id
    LIMIT $3 OFFSET $4
    `,
    [req.user.id, searchPattern, limit, offset]
  );

  const [countResult, itemsResult] = await Promise.all([countQuery, itemsQuery]);

  const total = countResult.rows[0]?.total ?? 0;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  res.json({
    items: itemsResult.rows,
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
  });
});

// 🔐 create
router.post("/products", auth, async (req, res) => {
  const { name, price, is_public = true } = req.body

  const result = await pool.query(
    `INSERT INTO products (name, price, owner_id, is_public)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, price, req.user.id, is_public]
  )

  res.json(result.rows[0])
})

// 🔐 update
router.patch("/products/:id", auth, async (req, res) => {
  const { name, price, is_public } = req.body

  const result = await pool.query(
    `UPDATE products
     SET name=$1, price=$2, is_public=$3
     WHERE id=$4 AND owner_id=$5
     RETURNING *`,
    [name, price, is_public, req.params.id, req.user.id]
  )

  if (!result.rows[0]) return res.sendStatus(403)

  res.json(result.rows[0])
})

// 🔐 delete
router.delete("/products/:id", auth, async (req, res) => {
  const result = await pool.query(
    `DELETE FROM products
     WHERE id=$1 AND owner_id=$2`,
    [req.params.id, req.user.id]
  )

  if (!result.rowCount) return res.sendStatus(403)

  res.json({ ok: true })
})

// -------------------- MOUNT --------------------

app.use((req, res, next) => setTimeout(next, 1000))

// ВАЖНО: теперь ВСЁ под /api
app.use("/api", router)

// -------------------- START --------------------

app.listen(3001, () => {
  console.log("🚀 API running on http://localhost:3001/api")
})