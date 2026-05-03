import { Link } from 'react-router';
import { useGetMe, useLogout } from '../../../entities/user/model';

const Header = () => {
	const { data, isSuccess } = useGetMe();
	const logoutMutation = useLogout();

	const handleLogout = async () => {
		if (logoutMutation.isPending) return;
		try {
			await logoutMutation.mutateAsync();
		} catch (e) {
			console.warn(e);
		}
	};

	return (
		<header className='sticky top-0 z-10 border-b border-[rgba(15,23,42,0.08)] bg-[rgba(246,243,239,0.65)] backdrop-blur-[18px]'>
			<div className='mx-auto flex w-[min(1120px,calc(100%-32px))] items-center justify-between gap-4 py-4'>
				<Link
					to='/'
					className='inline-flex items-center gap-3 text-[1.1rem] font-bold text-[#0f172a]'
				>
					<span className='grid h-[42px] w-[42px] place-items-center rounded-[14px] bg-[linear-gradient(135deg,#ff6b35_0%,#ff9f68_100%)] font-[var(--font-serif)] text-base tracking-[0.05em] text-white shadow-[0_14px_24px_-18px_rgba(255,107,53,0.8)]'>
						QD
					</span>
					<span>ShopDemo</span>
				</Link>
				<nav className='flex flex-wrap items-center gap-4 text-sm text-slate-500'>
					<Link
						to='/'
						className='relative pb-1 transition-colors hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6b35] after:transition-transform hover:after:scale-x-100'
					>
						Главная
					</Link>
					<Link
						to='/products'
						className='relative pb-1 transition-colors hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6b35] after:transition-transform hover:after:scale-x-100'
					>
						Каталог
					</Link>
					<Link
						to='/manage-products'
						className='relative pb-1 transition-colors hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6b35] after:transition-transform hover:after:scale-x-100'
					>
						Управление продуктами
					</Link>
				</nav>
				<div className='flex items-center gap-3'>
					{isSuccess ? (
						<div className='flex flex-wrap items-center gap-3'>
							<span className='rounded-full border border-[rgba(15,23,42,0.12)] bg-[rgba(255,255,255,0.7)] px-3 py-1.5 text-sm text-slate-500'>
								{data.email}
							</span>
							<button
								type='button'
								className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.7)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70'
								onClick={handleLogout}
								disabled={logoutMutation.isPending}
							>
								{logoutMutation.isPending ? 'Выходим...' : 'Выйти'}
							</button>
						</div>
					) : (
						<>
							<Link
								to='/login'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.7)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white'
							>
								Войти
							</Link>
							<Link
								to='/register'
								className='inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#e64a19_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(255,107,53,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-20px_rgba(255,107,53,0.9)]'
							>
								Регистрация
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
