import { createBrowserRouter } from 'react-router';
import MainLayout from '../../shared/ui/mainLayout';
import HomePage from '../../pages/home/ui';
import ProductsPage from '../../pages/products/ui';
import LoginPage from '../../pages/login/ui';
import RegisterPage from '../../pages/register/ui';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/products',
				element: <ProductsPage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
		],
	},
]);
