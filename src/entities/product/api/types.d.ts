import type { Id, OkRes } from '../../../shared/types/global';
import type { Product } from '../model';

export interface GetProductsQuery {
	search?: string;
	page?: number;
	limit?: number;
}
export interface GetProductsRes {
	items: Product[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
}

export interface GetProductParams {
	id: Id;
}
export type GetProductRes = Product;

export interface CreateProductReq {
	name: string;
	price: number;
	isPublic?: boolean;
}
export type CreateProductRes = Product;

export interface UpdateProductParams {
	id: Id;
}
export interface UpdateProductReq {
	name?: string;
	price?: number;
	isPublic?: boolean;
}
export type UpdateProductRes = Product;

export interface DeleteProductParams {
	id: Id;
}
export type DeleteProductRes = OkRes;

export type GetMyProductsQuery = GetProductsQuery;
export type GetMyProductsRes = GetProductsRes;
