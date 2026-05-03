import { useGetProducts } from './apiHooks';
import { useProductsParams } from '../../../shared/lib/productsParams';

export const useProductsList = (keepData = false) => {
	const params = useProductsParams();

	return useGetProducts(params, keepData);
};
