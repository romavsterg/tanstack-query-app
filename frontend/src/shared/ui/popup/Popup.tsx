import type { MouseEvent, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
	title?: ReactNode;
	actions?: ReactNode;
	closeButton?: ReactNode;
	className?: string;
	bodyClassName?: string;
};

const Popup = ({
	children,
	isOpen,
	onClose,
	title,
	actions,
	closeButton,
	className,
	bodyClassName,
}: Props) => {
	if (!isOpen) {
		return null;
	}

	const handleOverlayClick = () => {
		onClose?.();
	};

	const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const defaultCloseButton = (
		<button
			type='button'
			onClick={onClose}
			className='rounded-full border border-transparent bg-[rgba(15,23,42,0.1)] px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-[rgba(15,23,42,0.08)]'
		>
			Закрыть
		</button>
	);

	const closeActionButton =
		closeButton ?? (onClose ? defaultCloseButton : null);

	return (
		<div
			role='presentation'
			className='fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10'
			onClick={handleOverlayClick}
		>
			<div
				className={`w-full max-w-[520px] ${className ?? ''}`}
				onClick={stopPropagation}
			>
				<div className='flex w-full flex-col rounded-[28px] bg-white p-6 shadow-[0_25px_60px_-32px_rgba(15,23,42,0.8)]'>
					{(title || closeActionButton) && (
						<div className='flex items-start justify-between gap-3'>
							{title ? (
								<div className='text-lg font-semibold text-[#0f172a]'>
									{title}
								</div>
							) : null}
							{closeActionButton}
						</div>
					)}
					<div className={`mt-4 flex flex-col gap-4 ${bodyClassName ?? ''}`}>
						{children}
					</div>
					{actions ? (
						<div className='mt-6 flex flex-wrap items-center justify-end gap-3'>
							{actions}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Popup;
