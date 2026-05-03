import { createBrowserRouter } from 'react-router';
import MainLayout from '../../shared/ui/mainLayout';
import HomePage from '../../pages/home/ui';
import ProductsPage from '../../pages/products/ui';
import LoginPage from '../../pages/login/ui';
import RegisterPage from '../../pages/register/ui';
import ProductManagementPage from '../../pages/productManagement/ui';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
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
			{
				path: '/manage-products',
				element: <ProductManagementPage />,
			},
			{
				index: true,
				element: <HomePage />,
			},
		],
	},
]);
