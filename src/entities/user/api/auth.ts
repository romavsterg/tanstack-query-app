import { api, authApi } from '../../../shared/api/base';
import type {
	LoginReq,
	LoginRes,
	LogoutRes,
	RefreshRes,
	RegisterReq,
	RegisterRes,
} from './types';

export const register = async (dto: RegisterReq) => {
	const { data } = await api.post<RegisterRes>('/auth/register', dto);

	return data;
};

export const login = async (dto: LoginReq) => {
	const { data } = await api.post<LoginRes>('/auth/login', dto);

	return data;
};

export const refreshToken = async () => {
	const { data } = await authApi.post<RefreshRes>('/auth/refresh');

	return data;
};

export const logout = async () => await api.post<LogoutRes>('/auth/logout');
