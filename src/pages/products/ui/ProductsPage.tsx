import ProductsList from '../../../widgets/productsList/ui';

const ProductsPage = () => {
	return (
		<section className='py-16'>
			<div className='mx-auto w-[min(1120px,calc(100%-32px))]'>
				<div className='mb-8 grid gap-3'>
					<p className='text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#ff6b35]'>
						Каталог
					</p>
					<h2 className='font-[var(--font-serif)] text-[clamp(2rem,3vw,2.6rem)] text-[#0f172a]'>
						Товары, которые украсят ваш день
					</h2>
					<p className='max-w-[560px] text-sm leading-relaxed text-slate-500'>
						Выбирайте любимые позиции: от минимализма до ярких акцентов. Всё собрано в одном
						месте, чтобы вдохновлять и радовать.
					</p>
				</div>
				<ProductsList />
			</div>
		</section>
	);
};

export default ProductsPage;
