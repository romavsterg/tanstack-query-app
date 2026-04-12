import { Link } from 'react-router';

const HomePage = () => {
	return (
		<section className='py-16'>
			<div className='mx-auto grid w-[min(1120px,calc(100%-32px))] items-center gap-10 md:grid-cols-2'>
				<div>
					<p className='text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#ff6b35]'>
						Новая коллекция
					</p>
					<h1 className='mt-4 font-[var(--font-serif)] text-[clamp(2.4rem,4vw,3.4rem)] text-[#0f172a]'>
						ShopDemo — товары, которые хочется забрать домой
					</h1>
					<p className='mt-4 text-[1.1rem] leading-relaxed text-slate-500'>
						Теплые цвета, аккуратные формы и приятные цены. Выбирайте, сохраняйте в избранное
						и возвращайтесь за вдохновением каждый день.
					</p>
					<div className='mt-6 flex flex-wrap gap-3'>
						<Link
							to='/products'
							className='inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#e64a19_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(255,107,53,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-20px_rgba(255,107,53,0.9)]'
						>
							Перейти в каталог
						</Link>
						<a
							href='#'
							className='inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.7)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white'
						>
							Смотреть коллекцию
						</a>
					</div>
					<div className='mt-7 flex flex-wrap gap-4'>
						<div className='min-w-[140px] rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.9)] px-4 py-3'>
							<h4 className='text-lg font-semibold text-[#0f172a]'>120+</h4>
							<p className='text-sm text-slate-500'>выбранных товаров</p>
						</div>
						<div className='min-w-[140px] rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.9)] px-4 py-3'>
							<h4 className='text-lg font-semibold text-[#0f172a]'>24/7</h4>
							<p className='text-sm text-slate-500'>доставка и поддержка</p>
						</div>
					</div>
				</div>
				<div className="relative before:absolute before:inset-[-20px] before:z-0 before:bg-[radial-gradient(240px_220px_at_30%_20%,rgba(255,107,53,0.25),transparent_60%),radial-gradient(260px_240px_at_90%_90%,rgba(27,153,139,0.25),transparent_65%)] before:content-['']">
					<div className='relative z-10 grid gap-4 rounded-[20px] border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]'>
						<div className='flex items-center justify-between'>
							<span className='rounded-full bg-[rgba(27,153,139,0.12)] px-3 py-1 text-xs font-semibold text-[#1b998b]'>
								Лимитированно
							</span>
							<span className='rounded-full border border-[rgba(15,23,42,0.1)] px-3 py-1 text-xs text-slate-500'>
								Бесплатная доставка
							</span>
						</div>
						<div className='text-lg font-semibold text-[#0f172a]'>
							Идеальный набор на каждый день
						</div>
						<div className='grid gap-3 text-sm text-slate-500'>
							<div>• Авторские находки и тренды сезона.</div>
							<div>• Комплекты, которые легко сочетать.</div>
							<div>• Качество, которое видно сразу.</div>
						</div>
						<div className='flex flex-wrap gap-3'>
							<Link
								to='/products'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.7)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white'
							>
								Собрать образ
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto mt-14 grid w-[min(1120px,calc(100%-32px))] gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				<div className='min-h-[160px] rounded-[18px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.85)] p-5 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.3)]'>
					<h3 className='text-[1.05rem] font-semibold text-[#0f172a]'>Любимые бренды</h3>
					<p className='mt-2 text-sm leading-relaxed text-slate-500'>
						Подборка вещей, которые выглядят дорого и служат долго.
					</p>
				</div>
				<div className='min-h-[160px] rounded-[18px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.85)] p-5 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.3)]'>
					<h3 className='text-[1.05rem] font-semibold text-[#0f172a]'>Стили по настроению</h3>
					<p className='mt-2 text-sm leading-relaxed text-slate-500'>
						Найдите капсулы, которые подходят под ваш ритм и сезон.
					</p>
				</div>
				<div className='min-h-[160px] rounded-[18px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.85)] p-5 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.3)]'>
					<h3 className='text-[1.05rem] font-semibold text-[#0f172a]'>Подарочная упаковка</h3>
					<p className='mt-2 text-sm leading-relaxed text-slate-500'>
						Готовим покупки так, чтобы приятно было дарить.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
