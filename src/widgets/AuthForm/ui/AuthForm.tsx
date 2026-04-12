import type { ReactNode } from 'react';

type AuthFormProps = {
	title: string;
	subtitle?: string;
	footer?: ReactNode;
	children: ReactNode;
};

const AuthForm = ({ title, subtitle, footer, children }: AuthFormProps) => {
	return (
		<section className='py-16 pt-12'>
			<div className='mx-auto grid w-[min(1120px,calc(100%-32px))] place-items-center'>
				<div className='grid w-full max-w-[520px] gap-6 rounded-[20px] border border-[rgba(15,23,42,0.08)] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]'>
					<div className='grid gap-3'>
						<p className='text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#ff6b35]'>
							Аккаунт
						</p>
						<h2 className='font-[var(--font-serif)] text-[clamp(1.8rem,3vw,2.4rem)] text-[#0f172a]'>
							{title}
						</h2>
						{subtitle ? (
							<p className='text-sm leading-relaxed text-slate-500'>{subtitle}</p>
						) : null}
					</div>
					{children}
					{footer ? (
						<div className='border-t border-dashed border-[rgba(15,23,42,0.15)] pt-4'>
							{footer}
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default AuthForm;
