import { api } from '@/shared/api';
import { TEmailRequest } from '@/shared/types';

import { StatusMessage, TSearchUserRequest, User } from '../types/user.types';

export const userApi = {
  checkEmailExists: (params: TEmailRequest) =>
    api.get('/users/check', { params }).then((res) => res.data),

  searchUsers: (params: TSearchUserRequest) => api.get<User[]>('/users/search', { params }).then((res) => res.data),

  updateStatusMessage: (data: StatusMessage) => api.patch('/users/presence/status', data).then((res) => res.data),
};

// export const updateUserProfile = (data: FormData) =>
//   api.patch<User>('/users/profiles', data, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });

// export const completeUserProfile = (data: FormData) =>
//   api.post('/users/profiles', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
