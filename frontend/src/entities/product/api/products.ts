import { api } from '../../../shared/api/base';
import type {
	CreateProductReq,
	CreateProductRes,
	DeleteProductRes,
	GetProductRes,
	GetProductParams,
	GetProductsQuery,
	UpdateProductParams,
	UpdateProductReq,
	UpdateProductRes,
	GetMyProductsRes,
	GetProductsRes,
	GetMyProductsQuery,
} from './types';

export const getProducts = async (query: GetProductsQuery) => {
	const { data } = await api.get<GetProductsRes>('/products', {
		params: query,
	});
	return data;
};

export const getProductById = async (params: GetProductParams) => {
	const { data } = await api.get<GetProductRes>(`/products/${params.id}`);
	return data;
};

export const createProduct = async (dto: CreateProductReq) => {
	const { data } = await api.post<CreateProductRes>('/products', dto);
	return data;
};

export const updateProduct = async (
	params: UpdateProductParams,
	dto: UpdateProductReq,
) => {
	const { data } = await api.patch<UpdateProductRes>(
		`/products/${params.id}`,
		dto,
	);
	return data;
};

export const deleteProduct = async (params: GetProductParams) => {
	const { data } = await api.delete<DeleteProductRes>(`/products/${params.id}`);
	return data;
};

export const getMyProducts = async (query: GetMyProductsQuery) => {
	const { data } = await api.get<GetMyProductsRes>('/my-products', {
		params: query,
	});
	return data;
};
