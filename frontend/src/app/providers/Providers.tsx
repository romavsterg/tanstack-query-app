import { RouterProvider } from 'react-router';
import { router } from '../router';
import QueryProvider from '../queryProvider';

const Providers = () => {
	return (
		<QueryProvider>
			<RouterProvider router={router} />
		</QueryProvider>
	);
};

export default Providers;
