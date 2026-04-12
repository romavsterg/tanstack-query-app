import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { useState, type ReactElement } from 'react';

const QueryProvider = ({ children }: { children: ReactElement }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						gcTime: 1000 * 60 * 60 * 24,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	const persister = createAsyncStoragePersister({
		storage: window.localStorage,
	});

	useState(() => {
		persistQueryClient({
			queryClient,
			persister,
			maxAge: 1000 * 60 * 60 * 24,
		});
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default QueryProvider;
