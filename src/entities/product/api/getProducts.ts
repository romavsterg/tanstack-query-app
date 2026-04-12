import { api } from '../../../shared/api/base';
import type { Product } from '../model';

export const getAllProducts = async () => {
	const { data } = await api.get<Product[]>('/products');

	return data;
};
