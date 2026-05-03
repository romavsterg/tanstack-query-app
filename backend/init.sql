CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INT NOT NULL,

  owner_id INT REFERENCES users(id) ON DELETE CASCADE,

  is_public BOOLEAN DEFAULT true NOT NULL,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO users (email, password)
VALUES ('test@test.com', '$2b$10$hashedpasswordplaceholder');

INSERT INTO products (name, price, owner_id) VALUES
('iPhone', 1000, 1),
('MacBook', 2000, 1),
('AirPods', 200, 1);