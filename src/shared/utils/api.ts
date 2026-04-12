import { AxiosError } from 'axios';

export const reqAuthRetries = (errorCount: number, error: Error) =>
	error instanceof AxiosError
		? error.response?.status === 401
			? false
			: errorCount === 0
		: errorCount === 0;
