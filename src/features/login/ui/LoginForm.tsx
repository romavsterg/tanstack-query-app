import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLogin } from '../../../entities/user/model';
import type { LoginReq } from '../../../entities/user/api';
import Form from '../../../shared/ui/form';
import {
	clearFormDraft,
	loadFormDraft,
} from '../../../shared/utils/formStorage';

const LoginForm = () => {
	const navigate = useNavigate();
	const loginMutation = useLogin();
	const savedValues = loadFormDraft<LoginReq>('login') ?? {};
	const form = useForm<LoginReq>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			...savedValues,
		},
	});
	const {
		register,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (values: LoginReq) => {
		try {
			await loginMutation.mutateAsync(values);
			clearFormDraft('login');
			navigate('/');
		} catch {
			void 0;
		}
	};

	const isPending = loginMutation.isPending || isSubmitting;
	const errorMessage = loginMutation.isError
		? ((loginMutation.error as Error | undefined)?.message ??
			'Не удалось войти. Проверьте данные и попробуйте ещё раз.')
		: null;

	return (
		<Form
			className='grid gap-5'
			formName='login'
			form={form}
			ignoreFields={['password']}
			onSubmit={onSubmit}
		>
			<label className='grid gap-2 text-sm'>
				<span className='font-semibold text-[#0f172a]'>Email</span>
				<input
					type='email'
					placeholder='you@example.com'
					className='rounded-[14px] border border-[rgba(15,23,42,0.14)] bg-white/90 px-4 py-3 text-sm transition focus:border-[rgba(255,107,53,0.5)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,107,53,0.12)] disabled:bg-slate-100/80 disabled:text-slate-500'
					autoComplete='email'
					disabled={isPending}
					{...register('email', {
						required: 'Введите email',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Введите корректный email',
						},
					})}
				/>
				{errors.email ? (
					<span className='text-xs text-[#d9480f]'>{errors.email.message}</span>
				) : null}
			</label>

			<label className='grid gap-2 text-sm'>
				<span className='font-semibold text-[#0f172a]'>Пароль</span>
				<input
					type='password'
					placeholder='••••••••'
					className='rounded-[14px] border border-[rgba(15,23,42,0.14)] bg-white/90 px-4 py-3 text-sm transition focus:border-[rgba(255,107,53,0.5)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,107,53,0.12)] disabled:bg-slate-100/80 disabled:text-slate-500'
					autoComplete='current-password'
					disabled={isPending}
					{...register('password', {
						required: 'Введите пароль',
						minLength: {
							value: 6,
							message: 'Минимум 6 символов',
						},
					})}
				/>
				{errors.password ? (
					<span className='text-xs text-[#d9480f]'>
						{errors.password.message}
					</span>
				) : null}
			</label>

			{errorMessage ? (
				<div className='rounded-[14px] border border-[rgba(255,107,53,0.4)] bg-[rgba(255,107,53,0.12)] px-4 py-3 text-sm text-[#0f172a]'>
					{errorMessage}
				</div>
			) : null}

			<div className='flex flex-wrap items-center gap-3'>
				<button
					type='submit'
					className='inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#e64a19_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(255,107,53,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-20px_rgba(255,107,53,0.9)] disabled:cursor-not-allowed disabled:opacity-70'
					disabled={isPending}
				>
					{isPending ? 'Входим...' : 'Войти'}
				</button>
				<span className='text-xs text-slate-500'>
					Мы используем безопасное соединение.
				</span>
			</div>
		</Form>
	);
};

export default LoginForm;
