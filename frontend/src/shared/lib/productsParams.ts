import { useSearchParams } from 'react-router';
import { useDebounce } from './debounce';
import { useMemo } from 'react';

export const useProductsParams = () => {
	const params = useSearchParams()[0];
	const search = params.get('search') || '';
	const pageParam = Number(params.get('page'));
	const limitParam = Number(params.get('limit'));

	const debouncedSearch = useDebounce(search, 200);
	const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
	const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 6;

	return useMemo(
		() => ({ page, limit, search: debouncedSearch || undefined }),
		[page, limit, debouncedSearch],
	);
};
