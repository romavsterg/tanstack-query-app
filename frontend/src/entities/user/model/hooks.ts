import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, login, logout, refreshToken, register } from '../api';
import { queryKeys } from '../../../shared/consts/queryKeys';
import {
	removeAccessToken,
	saveAccessToken,
} from '../../../shared/utils/accessToken';
import { reqAuthRetries } from '../../../shared/utils/api';

export const useRegister = () =>
	useMutation({
		mutationFn: register,
		retry: reqAuthRetries,
		retryDelay: 500,
	});

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess: res => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.user.getMe] });
			saveAccessToken(res.access);
		},
		retry: reqAuthRetries,
		retryDelay: 500,
	});
};

export const useRefreshToken = () =>
	useMutation({
		mutationFn: refreshToken,
		onSuccess: res => {
			saveAccessToken(res.access);
		},
		retry: reqAuthRetries,
		retryDelay: 500,
	});

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => logout(),
		retry: 3,
		retryDelay: 500,
		onSuccess: () => {
			queryClient.clear();
			removeAccessToken();
		},
	});
};

export const useGetMe = () =>
	useQuery({
		queryFn: getMe,
		queryKey: [queryKeys.user.getMe],
		staleTime: 1000 * 15,
		retry: reqAuthRetries,
	});
