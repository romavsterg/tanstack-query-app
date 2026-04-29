import type { Id, OkRes } from '../../../shared/types/global';
import type { Product } from '../model';

export interface GetProductsQuery {
	search?: string;
	limit?: number;
	offset?: number;
}
export type GetAllProductRes = Product[];

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
	id: ID;
}
export type DeleteProductRes = OkRes;

export type GetMyProductsReq = void;
export type GetMyProductsRes = Product[];
