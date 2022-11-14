import { api } from '@/shared/api';

import { TLogin, TRegister } from './types';

export const register = (data: TRegister) => api.post<TRegister>('/auth/register', data);

export const login = (data: TLogin) => api.post<TLogin>('/auth/login', data);

export const getAuthUser = () => api.get<User>('/auth/status');

export const logout = () => api.post('/auth/logout');
