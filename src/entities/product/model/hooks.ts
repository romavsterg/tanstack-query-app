import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createProduct,
	deleteProduct,
	getMyProducts,
	getProductById,
	getProducts,
	updateProduct,
	type CreateProductReq,
	type CreateProductRes,
	type GetProductsQuery,
	type UpdateProductReq,
	type UpdateProductRes,
} from '../api';
import { queryKeys } from '../../../shared/consts/queryKeys';
import type { Id } from '../../../shared/types/global';

export const useGetAllProducts = (options: GetProductsQuery) =>
	useQuery({
		queryKey: [queryKeys.products.get, options],
		queryFn: ({ queryKey: [, args] }) => getProducts(args as GetProductsQuery),
		refetchInterval: 1000 * 60 * 5,
		retry: 1,
		retryDelay: 1000 * 5,
	});

export const useGetProductById = (id: Id) =>
	useQuery({
		queryKey: [queryKeys.products.get, id],
		queryFn: ({ queryKey: [, id] }) => getProductById({ id: id as Id }),
		retry: 1,
		retryDelay: 1000 * 5,
	});

export const useCreateProduct = (
	onSuccess?: (res: CreateProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateProductReq) => createProduct(dto),
		retry: 1,
		retryDelay: 1000,
		onSuccess: res => {
			qc.invalidateQueries({ queryKey: [queryKeys.products.get] });
			onSuccess?.(res);
		},
	});
};

export const useUpdateProduct = (
	onSuccess?: (res: UpdateProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: Id; dto: UpdateProductReq }) =>
			updateProduct({ id }, dto),
		retry: 1,
		retryDelay: 1000,
		onSuccess: res => {
			qc.invalidateQueries({ queryKey: [queryKeys.products.get] });
			onSuccess?.(res);
		},
	});
};

export const useDeleteProduct = () => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: Id) => deleteProduct({ id }),
		retry: 1,
		retryDelay: 1000,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [queryKeys.products.get] });
		},
	});
};

export const useGetMyProducts = () =>
	useQuery({
		queryKey: [queryKeys.products.get, 'my-products'],
		queryFn: getMyProducts,
	});
