import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { saveFormDraft } from '../../utils/formStorage';

type FormProps<T extends FieldValues> = {
	formName: string;
	form: UseFormReturn<T>;
	onSubmit: (values: T) => void | Promise<void>;
	ignoreFields?: Array<keyof T & string>;
	children: ReactNode;
	className?: string;
};

const Form = <T extends FieldValues>({
	formName,
	form,
	onSubmit,
	ignoreFields = [],
	children,
	className,
}: FormProps<T>) => {
	useEffect(() => {
		const subscription = form.watch(values => {
			saveFormDraft(formName, values as Record<string, unknown>, [
				...ignoreFields,
			]);
		});

		return () => subscription.unsubscribe();
	}, [form, formName, ignoreFields]);

	return (
		<form
			className={className}
			onSubmit={form.handleSubmit(onSubmit)}
			noValidate
		>
			{children}
		</form>
	);
};

export default Form;
