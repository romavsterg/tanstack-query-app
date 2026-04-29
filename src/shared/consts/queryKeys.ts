import type { GetProductsQuery } from '../../entities/product/api';
import type { Id } from '../types/global';

export const queryKeys = {
	user: {
		getMe: 'getMe',
	},
	products: {
		all: ['products'],
		list: (params?: GetProductsQuery) => ['products', 'list', params],
		detail: (id: Id) => ['products', 'detail', id],
		my: ['products', 'my'],
	},
};
