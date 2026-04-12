const Footer = () => {
	return (
		<footer className='py-8 text-slate-500'>
			<div className='mx-auto flex w-[min(1120px,calc(100%-32px))] flex-col items-center gap-3 border-t border-[rgba(15,23,42,0.1)] pt-5 text-center'>
				<div>© {new Date().getFullYear()} ShopDemo</div>
				<div className='flex flex-wrap justify-center gap-3 text-sm text-slate-800'>
					<a href='/' className='transition hover:text-[#ff6b35]'>
						Главная
					</a>
					<a href='/products' className='transition hover:text-[#ff6b35]'>
						Каталог
					</a>
					<a href='#' className='transition hover:text-[#ff6b35]'>
						Документация
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
