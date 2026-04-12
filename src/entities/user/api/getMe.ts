import { api } from '../../../shared/api/base';
import type { GetMeRes } from './types';

export const getMe = async () => {
	const { data } = await api.get<GetMeRes>('/me');

	return data;
};
