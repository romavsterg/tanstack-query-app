import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createProduct,
	deleteProduct,
	getMyProducts,
	getProductById,
	getProducts,
	updateProduct,
	type CreateProductReq,
	type CreateProductRes,
	type DeleteProductRes,
	type GetMyProductsQuery,
	type GetProductsQuery,
	type UpdateProductReq,
	type UpdateProductRes,
} from '..';
import { queryKeys } from '../../../shared/consts/queryKeys';
import type { Id } from '../../../shared/types/global';
import { useGetMe } from '../../user/model';
import {
	handleCreateProductPrevData,
	handleDeleteProductPrevData,
	handleUpdateProductPrevData,
	onOptimisticProductsError,
	onOptimisticProductsMutate,
	onOptimisticProductsSettled,
} from '../../../shared/lib/optimisticProducts';

export const useGetProducts = (options: GetProductsQuery, keepData = false) =>
	useQuery({
		queryKey: queryKeys.products.list(options),
		queryFn: ({ queryKey: [, _, args] }) =>
			getProducts(args as GetProductsQuery),
		placeholderData: keepData ? keepPreviousData : undefined,
	});

export const useGetProductById = (id: Id) =>
	useQuery({
		queryKey: queryKeys.products.detail(id),
		queryFn: ({ queryKey: [, _, id] }) => getProductById({ id: id as Id }),
	});

export const useCreateProduct = (
	onSuccess?: (res: CreateProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateProductReq) => createProduct(dto),
		onSuccess: res => {
			onSuccess?.(res);
		},
		onMutate: async newProductDto =>
			onOptimisticProductsMutate(qc, prevData =>
				handleCreateProductPrevData(prevData, newProductDto),
			),
		onError: (_err, _newProduct, context) => {
			onOptimisticProductsError(qc, context);
		},
		onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
	});
};

export const useUpdateProduct = (
	onSuccess?: (res: UpdateProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: Id; dto: UpdateProductReq }) =>
			updateProduct({ id }, dto),
		onSuccess: res => {
			onSuccess?.(res);
		},
		onMutate: async newProduct =>
			onOptimisticProductsMutate(qc, prevData =>
				handleUpdateProductPrevData(prevData, newProduct),
			),
		onError: (_err, _newProduct, context) =>
			onOptimisticProductsError(qc, context),
		onSettled: () => onOptimisticProductsSettled(qc),
	});
};

export const useDeleteProduct = (
	onSuccess?: (res: DeleteProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: Id) => deleteProduct({ id }),
		onSuccess: res => onSuccess?.(res),
		onMutate: async deletedProductId => {
			return onOptimisticProductsMutate(qc, prevData =>
				handleDeleteProductPrevData(prevData, deletedProductId),
			);
		},
		onError: (_err, _newProduct, context) =>
			onOptimisticProductsError(qc, context),
		onSettled: () => onOptimisticProductsSettled(qc),
	});
};

export const useGetMyProducts = (options?: GetMyProductsQuery) => {
	const { data: user } = useGetMe();
	return useQuery({
		queryKey: queryKeys.products.my(options),
		queryFn: ({ queryKey: [, _, args] }) =>
			getMyProducts(args as GetProductsQuery),
		enabled: !!user,
	});
};
