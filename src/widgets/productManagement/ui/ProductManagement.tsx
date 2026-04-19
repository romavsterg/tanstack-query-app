import { useState } from 'react';
import {
	useDeleteProduct,
	useGetMyProducts,
	type Product,
} from '../../../entities/product/model';
import ProductManagementList from '../../../features/productManagement/ui/ProductManagementList';
import ProductManagementForm, {
	type ProductFormValue,
} from '../../../features/productManagement/ui/ProductManagementForm';
import { loadFormDraft } from '../../../shared/utils/formStorage';
import Popup from '../../../shared/ui/popup';
import type { CreateProductReq } from '../../../entities/product/api';

const ProductManagement = () => {
	const { data: products, error: listError } = useGetMyProducts();

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const createProductDraft = loadFormDraft<ProductFormValue>(
		'product-management-create',
	);

	const { mutate: deleteProduct, isPending: deletePending } =
		useDeleteProduct();

	const initialFormValues: CreateProductReq = selectedProduct ||
		createProductDraft || {
			name: '',
			price: 1,
			isPublic: true,
		};

	const handleStartEdit = (product: Product) => {
		setSelectedProduct(product);
		setDeletingProduct(null);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setSelectedProduct(null);
		setIsFormOpen(true);
	};

	const handleCloseForm = () => {
		setSelectedProduct(null);
		setDeletingProduct(null);
		setIsFormOpen(false);
	};

	return (
		<div className='mx-auto flex w-full max-w-[1200px] flex-col gap-8'>
			<div className='space-y-8 rounded-[24px] border border-[rgba(15,23,42,0.08)] bg-white/70 p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]'>
				<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
					<div className='space-y-2'>
						<p className='text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#ff6b35]'>
							Каталог
						</p>
						<h1 className='font-[var(--font-serif)] text-[clamp(1.8rem,3vw,2.4rem)] text-[#0f172a]'>
							Продукты
						</h1>
						<p className='max-w-[540px] text-sm leading-relaxed text-slate-500'>
							Просматривайте текущие позиции, выбирайте те, которые следует
							обновить, и удаляйте устаревшие товары без лишней логики.
						</p>
					</div>
					<button
						type='button'
						className='inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#e64a19_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(255,107,53,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-20px_rgba(255,107,53,0.9)]'
						onClick={handleCreate}
					>
						Создать продукт
					</button>
				</div>
				<ProductManagementList
					products={products}
					error={listError}
					selectedProduct={selectedProduct}
					deletingProduct={deletingProduct}
					onSelect={handleStartEdit}
					onDelete={setDeletingProduct}
				/>
			</div>
			{isFormOpen && (
				<Popup
					isOpen
					onClose={handleCloseForm}
					title={selectedProduct ? 'Изменить продукт' : 'Создание продукта'}
					className='max-w-[640px]'
					bodyClassName='p-0'
				>
					<ProductManagementForm
						initialValues={initialFormValues}
						id={selectedProduct?.id}
						mode={selectedProduct ? 'update' : 'create'}
						onCancel={handleCloseForm}
						onSuccess={handleCloseForm}
					/>
				</Popup>
			)}
			{deletingProduct && (
				<Popup
					isOpen
					onClose={() => setDeletingProduct(null)}
					title='Удаление продукта'
					closeButton={
						<button
							type='button'
							onClick={() => setDeletingProduct(null)}
							className='rounded-full border border-[rgba(15,23,42,0.2)] px-3 py-1 text-sm font-semibold text-[#0f172a] transition hover:border-[rgba(255,107,53,0.7)] hover:text-[#ff6b35]'
						>
							×
						</button>
					}
					actions={
						<>
							<button
								type='button'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.2)] px-4 py-2 text-sm font-semibold text-[#0f172a] transition hover:border-[rgba(255,107,53,0.7)] hover:text-[#ff6b35]'
								onClick={() => setDeletingProduct(null)}
							>
								Отменить
							</button>
							<button
								type='button'
								disabled={deletePending}
								onClick={() => {
									deleteProduct(deletingProduct.id);
									setDeletingProduct(null);
								}}
								className='inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[rgba(255,107,53,0.1)] px-4 py-2 text-sm font-semibold text-[#ff6b35] transition hover:bg-[rgba(255,107,53,0.18)] disabled:cursor-not-allowed disabled:opacity-60'
							>
								{deletePending ? 'Удаление...' : 'Удалить'}
							</button>
						</>
					}
				>
					<p className='text-sm text-slate-600'>
						Вы уверены, что хотите удалить продукт «{deletingProduct.name}»?
					</p>
				</Popup>
			)}
		</div>
	);
};

export default ProductManagement;
