import type { Product } from '../../../entities/product/model';
import type { Id } from '../../../shared/types/global';
import ProductCard from '../../../shared/ui/productCard/ProductCard';

type Props = {
	products?: Product[];
	isLoading: boolean;
	isError: boolean;
	errorMessage?: string | null;
	selectedProduct?: Product | null;
	deletingProduct?: Product | null;
	onSelect: (product: Product) => void;
	onDelete: (product: Product) => void;
	userId: Id;
};

const ProductManagementList = ({
	products,
	isLoading,
	isError,
	errorMessage,
	selectedProduct,
	deletingProduct,
	onSelect,
	onDelete,
	userId,
}: Props) => {
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className='min-h-[200px] animate-pulse rounded-[18px] bg-slate-200/80'
					/>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className='rounded-[18px] border border-dashed border-[rgba(255,107,53,0.5)] bg-white/80 p-6 text-sm text-[#0f172a]'>
				<p>Не удалось загрузить список продуктов.</p>
				<p className='text-xs text-slate-500'>
					{errorMessage ?? 'Попробуйте позже.'}
				</p>
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className='rounded-[18px] border border-dashed border-slate-300 bg-white/80 p-6 text-sm text-slate-500'>
				Каталог пуст. Создайте первый продукт.
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
			{products.map(product => {
				const isSelected = product.id === selectedProduct?.id;
				const isDeleting = product.id === deletingProduct?.id;

				return (
					<article
						key={product.id}
						className={`rounded-[18px] border bg-white px-3 py-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.3)] transition ${
							isSelected
								? 'border-[rgba(255,107,53,0.8)]'
								: 'border border-[rgba(15,23,42,0.08)]'
						}
						`}
					>
						<ProductCard product={product} />
						<div className='mt-4 flex flex-wrap items-center gap-2 text-sm'>
							<button
								type='button'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.2)] px-4 py-2 font-semibold text-[#0f172a] transition hover:border-[rgba(255,107,53,0.7)] hover:text-[#ff6b35] disabled:cursor-not-allowed disabled:opacity-60'
								onClick={() => onSelect(product)}
								disabled={isDeleting || userId !== product.ownerId}
							>
								{isSelected ? 'Редактируется' : 'Редактировать'}
							</button>
							<button
								type='button'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[rgba(255,107,53,0.1)] px-4 py-2 text-sm font-semibold text-[#ff6b35] transition hover:bg-[rgba(255,107,53,0.18)] disabled:cursor-not-allowed disabled:opacity-60'
								onClick={() => onDelete(product)}
								disabled={isDeleting || userId !== product.ownerId}
							>
								{isDeleting ? 'Удаление...' : 'Удалить'}
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default ProductManagementList;
