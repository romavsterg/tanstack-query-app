import { Link } from 'react-router';
import RegisterForm from '../../../features/register/ui';
import AuthForm from '../../../widgets/AuthForm/ui';

const RegisterPage = () => {
	return (
		<AuthForm
			title='Создайте аккаунт'
			subtitle='Пара кликов — и ваши подборки всегда под рукой.'
			footer={
				<p className='text-sm text-slate-500'>
					Уже есть аккаунт?{' '}
					<Link to='/login' className='font-semibold text-[#e64a19]'>
						Войти
					</Link>
				</p>
			}
		>
			<RegisterForm />
		</AuthForm>
	);
};

export default RegisterPage;
