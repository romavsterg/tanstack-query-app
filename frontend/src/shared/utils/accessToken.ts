export const saveAccessToken = (token: string) =>
	localStorage.setItem('token', token);

export const getAccessToken = () => localStorage.getItem('token');

export const removeAccessToken = () => localStorage.removeItem('token');
