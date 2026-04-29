import { useSearchParams } from 'react-router';
import { useGetProducts } from '../../../entities/product/model';
import ProductCard from '../../../shared/ui/productCard/ProductCard';
import { useDebounce } from '../../../shared/lib/debounce';

const ProductsList = () => {
	const params = useSearchParams()[0];

	const debouncedParams = useDebounce(params, 200);

	const {
		data: products,
		isLoading,
		error,
		isError,
	} = useGetProducts({ search: debouncedParams.get('search') || undefined });

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='min-h-[160px] animate-pulse rounded-2xl bg-slate-200/80'
					/>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className='rounded-2xl border border-dashed border-[rgba(255,107,53,0.5)] bg-white/80 p-6 text-slate-900'>
				Не удалось открыть каталог.{' '}
				{error?.message ?? 'Пожалуйста, попробуйте позже.'}
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className='rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 text-slate-500'>
				Товары не найдены.
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductsList;
