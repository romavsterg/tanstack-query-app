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
	type DeleteProductRes,
	type GetMyProductsQuery,
	type GetProductsQuery,
	type UpdateProductReq,
	type UpdateProductRes,
} from '../api';
import { queryKeys } from '../../../shared/consts/queryKeys';
import type { Id } from '../../../shared/types/global';
import { useGetMe } from '../../user/model';
import type { Product } from './types';

export const useGetProducts = (options: GetProductsQuery) =>
	useQuery({
		queryKey: queryKeys.products.list(options),
		queryFn: ({ queryKey: [, _, args] }) =>
			getProducts(args as GetProductsQuery),
		refetchInterval: 1000 * 60 * 5,
		retry: 1,
		retryDelay: 1000 * 5,
	});

export const useGetProductById = (id: Id) =>
	useQuery({
		queryKey: queryKeys.products.detail(id),
		queryFn: ({ queryKey: [, _, id] }) => getProductById({ id: id as Id }),
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
			onSuccess?.(res);
		},
		onMutate: async newProduct => {
			await qc.cancelQueries({ queryKey: queryKeys.products.my() });

			const prev = qc.getQueryData(queryKeys.products.my());

			qc.setQueryData(queryKeys.products.my(), (old: Product[]) =>
				old
					? [...old, { ...newProduct, id: Date.now() }]
					: [{ ...newProduct, id: Date.now() }],
			);

			return { prev };
		},
		onError: (_err, _newProduct, context) => {
			qc.setQueryData(queryKeys.products.my(), context?.prev);
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
		retry: 1,
		retryDelay: 1000,
		onSuccess: res => {
			onSuccess?.(res);
		},
		onMutate: async newProduct => {
			await qc.cancelQueries({ queryKey: queryKeys.products.my() });

			const prev = qc.getQueryData(queryKeys.products.my());

			qc.setQueryData(queryKeys.products.my(), (prev: Product[]) =>
				prev.map(p =>
					p.id === newProduct.id ? { ...p, ...newProduct.dto } : p,
				),
			);

			return { prev };
		},
		onError: (_err, _newProduct, context) => {
			qc.setQueryData(queryKeys.products.my(), context?.prev);
		},
		onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
	});
};

export const useDeleteProduct = (
	onSuccess?: (res: DeleteProductRes) => void,
) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: Id) => deleteProduct({ id }),
		retry: 1,
		retryDelay: 1000,
		onSuccess: res => {
			onSuccess?.(res);
		},
		onMutate: async deletedProductId => {
			await qc.cancelQueries({ queryKey: queryKeys.products.my() });

			const prev = qc.getQueryData(queryKeys.products.my());

			qc.setQueryData(queryKeys.products.my(), (old: Product[]) =>
				old ? [...old.filter(p => p.id !== deletedProductId)] : [],
			);

			return { prev };
		},
		onError: (_err, _newProduct, context) => {
			qc.setQueryData(queryKeys.products.my(), context?.prev);
		},
		onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
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
