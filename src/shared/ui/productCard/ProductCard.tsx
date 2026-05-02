import type { Product } from '../../../entities/product/';

interface Props {
	product: Product;
}

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(price);
};

const ProductCard = ({ product }: Props) => {
	const updatedAt = new Date(product.updatedAt).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

	return (
		<div className='grid min-h-[180px] gap-3 rounded-[18px] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.3)]'>
			<span className='w-fit rounded-full bg-[rgba(27,153,139,0.12)] px-3 py-1 text-xs font-semibold text-[#1b998b]'>
				{product.isPublic ? 'В наличии' : 'Скоро снова'}
			</span>
			<h3 className='text-[1.05rem] font-semibold text-[#0f172a]'>
				{product.name}
			</h3>
			<div className='text-[1.35rem] font-bold text-[#e64a19]'>
				{formatPrice(product.price)}
			</div>
			<div className='text-xs text-slate-500'>Обновлено: {updatedAt}</div>
		</div>
	);
};

export default ProductCard;
