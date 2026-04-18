import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../../shared/ui/form';
import type { CreateProductReq } from '../../../entities/product/api';
import {
	useCreateProduct,
	useUpdateProduct,
} from '../../../entities/product/model';
import type { Id } from '../../../shared/types/global';
import { formatError } from '../../../shared/utils/error';

export type ProductFormValue = CreateProductReq;

type Props = {
	mode: 'create' | 'update';
	id?: Id;
	initialValues: ProductFormValue;
	onCancel: () => void;
	onSuccess?: () => void;
};

const ProductManagementForm = ({
	mode,
	initialValues,
	id,
	onCancel,
	onSuccess,
}: Props) => {
	const form = useForm<CreateProductReq>({
		mode: 'onBlur',
	});

	const {
		register,
		reset,
		formState: { errors, isSubmitting },
	} = form;

	useEffect(() => {
		reset(initialValues);
	}, [initialValues, reset]);

	const { mutate: createProduct, error: createError } =
		useCreateProduct(onSuccess);
	const { mutate: updateProduct, error: updateError } =
		useUpdateProduct(onSuccess);

	const error = mode === 'create' ? createError : updateError;

	return (
		<Form
			className={'grid gap-4'}
			formName={`product-management-${mode}`}
			form={form}
			onSubmit={data =>
				(data satisfies CreateProductReq)
					? mode === 'create'
						? createProduct(data)
						: updateProduct({ id: id as Id, dto: data })
					: void 0
			}
		>
			<label className='grid gap-2 text-sm'>
				<span className='font-semibold text-[#0f172a]'>Название</span>
				<input
					type='text'
					placeholder='Название продукта'
					className='rounded-[14px] border border-[rgba(15,23,42,0.14)] bg-white/90 px-4 py-3 text-sm text-[#0f172a] placeholder:text-slate-400 transition focus:border-[rgba(255,107,53,0.5)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,107,53,0.12)] disabled:bg-slate-100/80 disabled:text-slate-500'
					disabled={isSubmitting}
					{...register('name', {
						required: 'Введите название продукта',
					})}
				/>
				{errors.name ? (
					<span className='text-xs text-[#d9480f]'>{errors.name.message}</span>
				) : null}
			</label>

			<label className='grid gap-2 text-sm'>
				<span className='font-semibold text-[#0f172a]'>Цена (₽)</span>
				<input
					type='number'
					min={0}
					step={1}
					placeholder='1000'
					className='rounded-[14px] border border-[rgba(15,23,42,0.14)] bg-white/90 px-4 py-3 text-sm text-[#0f172a] placeholder:text-slate-400 transition focus:border-[rgba(255,107,53,0.5)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,107,53,0.12)] disabled:bg-slate-100/80 disabled:text-slate-500'
					disabled={isSubmitting}
					{...register('price', {
						required: 'Введите цену',
						valueAsNumber: true,
						min: {
							value: 0,
							message: 'Цена не может быть отрицательной',
						},
					})}
				/>
				{errors.price ? (
					<span className='text-xs text-[#d9480f]'>{errors.price.message}</span>
				) : null}
			</label>

			<label className='flex items-center gap-3 text-sm'>
				<input
					type='checkbox'
					className='h-4 w-4 rounded border border-[rgba(15,23,42,0.2)] text-[#0f172a] accent-[#ff6b35] focus:ring-[#ff6b35]'
					disabled={isSubmitting}
					{...register('isPublic')}
				/>
				<span className='font-semibold text-[#0f172a]'>
					Показывать в каталоге
				</span>
			</label>

			{error ? (
				<div className='rounded-[14px] border border-[rgba(255,107,53,0.4)] bg-[rgba(255,107,53,0.12)] px-4 py-3 text-sm text-[#0f172a]'>
					{formatError(
						error,
						`Не удалось ${mode === 'create' ? 'создать' : 'сохранить'} продукт`,
					)}
				</div>
			) : null}

			<div className='flex flex-wrap items-center gap-3'>
				<button
					type='submit'
					className='inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#e64a19_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(255,107,53,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-20px_rgba(255,107,53,0.9)] disabled:cursor-not-allowed disabled:opacity-70'
					disabled={isSubmitting}
				>
					{isSubmitting
						? mode === 'create'
							? 'Создание...'
							: 'Сохраняем...'
						: mode === 'create'
							? 'Создать продукт'
							: 'Сохранить изменения'}
				</button>
				{mode === 'update' && onCancel ? (
					<button
						type='button'
						onClick={onCancel}
						className='rounded-full border border-[rgba(15,23,42,0.2)] px-5 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[rgba(255,107,53,0.7)] hover:text-[#ff6b35] disabled:cursor-not-allowed disabled:opacity-50'
						disabled={isSubmitting}
					>
						Отменить
					</button>
				) : null}
			</div>
		</Form>
	);
};

export default ProductManagementForm;
