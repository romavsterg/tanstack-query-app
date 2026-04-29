import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const ProductSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [search, setSearch] = useState(searchParams.get('search') || '');

	useEffect(() => {
		setSearchParams(prev => {
			if (search) prev.set('search', search);
			else prev.delete('search');

			return prev;
		});
	}, [search, setSearchParams]);

	return (
		<div>
			<input
				value={search}
				onChange={e => setSearch(e.target.value)}
				type='search'
				placeholder='Поиск'
				className='rounded-full px-4 py-1.5 outline-0 border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)]'
			/>
		</div>
	);
};

export default ProductSearch;
