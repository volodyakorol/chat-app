import { AxiosRequestConfig } from 'axios';

import { api } from '@/shared/api';
import { TEmailRequest } from '@/shared/types';

import { TSearchUserRequest, TStatusMessage, TUpdateUserProfile, TUser } from '../types/user.types';

export const userApi = {
  checkEmailExists: (params: TEmailRequest) => api.get('/users/check', { params }).then((res) => res.data),

  getUserIds: () => api.get<number[]>('/users/ids').then((res) => res.data),

  getById: (params: { userId: number }, options?: AxiosRequestConfig) =>
    api.get('/users/id', { params, ...options }).then((res) => res.data),

  searchUsers: (params: TSearchUserRequest) => api.get<TUser[]>('/users/search', { params }).then((res) => res.data),

  updateStatusMessage: (data: TStatusMessage) => api.patch('/users/presence/status', data).then((res) => res.data),

  updateUserProfile: ({ banner, avatar, about }: TUpdateUserProfile) => {
    const formData = new FormData();
    banner && formData.append('banner', banner);
    avatar && formData.append('avatar', avatar);
    about && formData.append('about', about);

    return api
      .patch<TUser>('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
};

// export const completeUserProfile = (data: FormData) =>
//   api.post('/users/profiles', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
