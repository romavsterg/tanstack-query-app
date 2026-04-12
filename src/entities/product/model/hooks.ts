import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/getProducts';
import { queryKeys } from '../../../shared/consts/queryKeys';

export const useGetAllProducts = () =>
	useQuery({
		queryKey: [queryKeys.products.getAllProducts],
		queryFn: () => getAllProducts(),
		staleTime: 15 * 1000,
		refetchInterval: 15 * 1000,
		retry: 1,
		retryDelay: 5 * 1000,
	});
