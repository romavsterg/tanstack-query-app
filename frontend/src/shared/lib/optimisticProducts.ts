import type { QueryClient, QueryFilters } from '@tanstack/react-query';
import { queryKeys } from '../consts/queryKeys';
import type {
	CreateProductReq,
	GetProductsRes,
	UpdateProductReq,
} from '../../entities/product';
import type { Id } from '../types/global';

const queryKeyFilter: QueryFilters = {
	queryKey: queryKeys.products.all,
	predicate: ({ queryKey }) => queryKey.find(key => key === 'my') === undefined,
};

export const onOptimisticProductsMutate = async (
	qc: QueryClient,
	handleNewData: (prev: GetProductsRes | undefined) => GetProductsRes,
) => {
	await qc.cancelQueries(queryKeyFilter);

	const prev = qc.getQueriesData(queryKeyFilter);

	qc.setQueriesData(queryKeyFilter, (prevData: GetProductsRes | undefined) =>
		handleNewData(prevData),
	);

	return { prev };
};

export const onOptimisticProductsError = (
	qc: QueryClient,
	context: { prev: [readonly unknown[], unknown][] } | undefined,
) => {
	context?.prev.forEach(([queryKeys, data]) =>
		qc.setQueryData(queryKeys, data),
	);
};

export const onOptimisticProductsSettled = (qc: QueryClient) =>
	qc.invalidateQueries(queryKeyFilter);

const emptyPrevData = {
	items: [],
	page: 1,
	limit: 6,
	total: 0,
	totalPages: 1,
	hasNextPage: false,
};

export const handleCreateProductPrevData = (
	prevData: GetProductsRes | undefined,
	newProductDto: CreateProductReq,
) => {
	const newProduct = {
		...newProductDto,
		id: -1,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		ownerId: -1,
		isPublic: newProductDto.isPublic ?? true,
	};
	return prevData
		? {
				...prevData,
				items:
					prevData.items.length < 6
						? [...prevData.items, newProduct]
						: prevData.items,
				total: prevData.total + 1,
				totalPages: Math.ceil((prevData.total + 1) / 6),
				hasNextPage: prevData.page < Math.ceil((prevData.total + 1) / 6),
			}
		: { ...emptyPrevData, items: [newProduct] };
};

export const handleUpdateProductPrevData = (
	prevData: GetProductsRes | undefined,
	newProduct: { id: Id; dto: UpdateProductReq },
) =>
	prevData
		? {
				...prevData,
				items: prevData.items.map(p =>
					p.id === newProduct.id
						? {
								...p,
								...newProduct.dto,
							}
						: p,
				),
			}
		: emptyPrevData;

export const handleDeleteProductPrevData = (
	prevData: GetProductsRes | undefined,
	deletedProductId: Id,
) =>
	prevData
		? {
				...prevData,
				items: prevData.items.filter(p => p.id !== deletedProductId),
				page: Math.max(
					1,
					prevData.items.length > 1 ? prevData.page : prevData.page - 1,
				),
				total: prevData.total - 1,
				totalPages: Math.ceil((prevData.total - 1) / 6),
				hasNextPage: prevData.page < Math.ceil((prevData.total - 1) / 6),
			}
		: emptyPrevData;
