import Header from '../header';
import Footer from '../footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
