import { api } from '../../../shared/api/base';
import type {
	CreateProductReq,
	CreateProductRes,
	DeleteProductRes,
	GetAllProductRes,
	GetProductParams,
	GetProductsQuery,
	UpdateProductParams,
	UpdateProductReq,
	UpdateProductRes,
} from './types';

export const getProducts = async (query: GetProductsQuery) => {
	const { data } = await api.get<GetAllProductRes>('/products', {
		params: query,
	});
	return data;
};

export const getProductById = async (params: GetProductParams) => {
	const { data } = await api.get<GetAllProductRes>(`/products/${params.id}`);
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

export const getMyProducts = async () => {
	const { data } = await api.get<GetAllProductRes>('/my-products');
	return data;
};
