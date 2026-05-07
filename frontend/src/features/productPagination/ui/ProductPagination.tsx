import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import {
	getProducts,
	type GetProductsQuery,
	type GetProductsRes,
} from '../../../entities/product/';
import { queryKeys } from '../../../shared/consts/queryKeys';
import { useEffect } from 'react';
import { useProductsParams } from '../../../shared/lib/productsParams';

const ProductPagination = () => {
	const setSearchParams = useSearchParams()[1];
	const qc = useQueryClient();
	const { page, search } = useProductsParams();

	useIsFetching({ queryKey: queryKeys.products.all });

	const currentPageRaw = Number(page);
	const currentPage =
		Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? currentPageRaw : 1;

	const prevData = qc.getQueryData(
		queryKeys.products.list({ search, page: currentPage, limit: 6 }),
	) as GetProductsRes;

	const hasNextPage = prevData?.hasNextPage;
	const totalPages = prevData?.totalPages;

	const updatePage = (nextPage: number) => {
		setSearchParams(prev => {
			const params = new URLSearchParams(prev);

			if (nextPage <= 1) params.delete('page');
			else params.set('page', String(nextPage));

			return params;
		});
	};

	useEffect(() => {
		if (hasNextPage)
			qc.prefetchQuery({
				queryKey: queryKeys.products.list({
					search,
					page: currentPage + 1,
					limit: 6,
				}),
				queryFn: ({ queryKey: [, _, args] }) =>
					getProducts(args as GetProductsQuery),
				retry: 1,
				retryDelay: 1000 * 5,
			});
	}, [currentPage, qc, search, hasNextPage]);

	return (
		<div className='mt-8 flex items-center justify-center gap-2 text-sm text-slate-700'>
			<button
				type='button'
				onClick={() => updatePage(currentPage - 1)}
				disabled={!prevData || currentPage <= 1}
				className='rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50'
			>
				Предыдущая
			</button>
			<span className='px-2'>
				Страница {currentPage}
				{typeof totalPages === 'number' ? ` из ${totalPages}` : ''}
			</span>
			<button
				type='button'
				onClick={() => updatePage(currentPage + 1)}
				disabled={!prevData || hasNextPage === false}
				className='rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50'
			>
				Следующая
			</button>
		</div>
	);
};

export default ProductPagination;
