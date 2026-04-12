import { Link } from 'react-router';
import LoginForm from '../../../features/login/ui';
import AuthForm from '../../../widgets/AuthForm/ui';

const LoginPage = () => {
	return (
		<AuthForm
			title='С возвращением'
			subtitle='Войдите, чтобы продолжить подбор товаров и сохранить избранное.'
			footer={
				<p className='text-sm text-slate-500'>
					Нет аккаунта?{' '}
					<Link to='/register' className='font-semibold text-[#e64a19]'>
						Создать
					</Link>
				</p>
			}
		>
			<LoginForm />
		</AuthForm>
	);
};

export default LoginPage;
