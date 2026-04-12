import type { OkRes } from '../../../shared/types/global';
import type { User } from '../model';

export interface JwtPayload {
	id: Id;
	email: string;
	iat: number;
	exp: number;
}

export interface RegisterReq {
	email: string;
	password: string;
}
export type RegisterRes = User;

export interface LoginReq {
	email: string;
	password: string;
}
export interface LoginRes {
	access: string;
}

export type RefreshReq = void;
export type RefreshRes = LoginRes;

export type LogoutReq = void;
export type LogoutRes = OkRes;

export type GetMeReq = void;
export type GetMeRes = User;
