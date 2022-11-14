import { api } from '@/shared/api';

import { StatusMessage, User } from './types';

export const completeUserProfile = (data: FormData) =>
  api.post('/users/profiles', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const checkUsernameExists = (params: { username: string }) => api.get('/users/check', { params });

export const updateUserProfile = (data: FormData) =>
  api.patch<User>('/users/profiles', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateStatusMessage = (data: StatusMessage) => api.patch('/users/presence/status', data);

export const searchUsers = (params: { query: string }) => api.get<User[]>('/users/search', { params });
