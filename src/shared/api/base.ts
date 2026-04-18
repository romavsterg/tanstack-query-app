import axios, { AxiosError } from 'axios';
import { getAccessToken, saveAccessToken } from '../utils/accessToken';
import { refreshToken } from '../../entities/user/api';
import { objectToCamel, objectToSnake } from 'ts-case-convert';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

export const authApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(res => {
	return res;
});

api.interceptors.request.use(config => {
	if (config.data) {
		config.data = objectToSnake(config.data);
	}
	if (config.params) {
		config.params = objectToSnake(config.params);
	}
	if (getAccessToken())
		config.headers.Authorization = `Bearer ${getAccessToken()}`;

	return config;
});

api.interceptors.response.use(
	res => {
		if (res.data) {
			res.data = objectToCamel(res.data);
		}

		return res;
	},
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
				const token = await refreshToken();

				saveAccessToken(token.access);

				return api.request(req);
			} catch (e) {
				return Promise.reject(e);
			}
		}

		return Promise.reject(error);
	},
);
