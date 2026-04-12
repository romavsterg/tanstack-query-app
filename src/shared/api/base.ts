import axios, { AxiosError } from 'axios';
import { getAccessToken } from '../utils/accessToken';
import { refreshToken } from '../../entities/user/api';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

export const authApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.request.use(config => {
	if (getAccessToken())
		config.headers.Authorization = `Bearer ${getAccessToken()}`;

	return config;
});

api.interceptors.response.use(
	config => config,
	async error => {
		if (!(error instanceof AxiosError)) {
			return Promise.reject(error);
		}

		const req = error.config as typeof error.config & {
			_retry?: boolean;
		};

		if (!req || req._retry) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401) {
			req._retry = true;

			try {
				await refreshToken();

				return api.request(req);
			} catch (e) {
				return Promise.reject(e);
			}
		}

		return Promise.reject(error);
	},
);
