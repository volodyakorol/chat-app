import { api } from '@/shared/api';
import { TLogin, TRegister, TUser } from '@/shared/types';

export const authApi = {
  getAuthUser: () => api.get<TUser>('/auth/status').then((res) => res.data),

  register: (data: TRegister) => api.post('/auth/register', data).then((res) => res.data),

  login: (data: TLogin) => api.post('/auth/login', data).then((res) => res.data),

  logout: () => api.post('/auth/logout').then((res) => res.data),
};
