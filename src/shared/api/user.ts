import { api } from '@/shared/api';
import { TEmailRequest } from '@/shared/types';

import { StatusMessage, TSearchUserRequest, UpdateUserProfile, User } from '../types/user.types';

export const userApi = {
  checkEmailExists: (params: TEmailRequest) => api.get('/users/check', { params }).then((res) => res.data),

  searchUsers: (params: TSearchUserRequest) => api.get<User[]>('/users/search', { params }).then((res) => res.data),

  updateStatusMessage: (data: StatusMessage) => api.patch('/users/presence/status', data).then((res) => res.data),

  updateUserProfile: ({banner, avatar, about}: UpdateUserProfile) => {
    const formData = new FormData();
    banner && formData.append('banner', banner);
    avatar && formData.append('avatar', avatar);
    about && formData.append('about', about);

    return api
      .patch<User>('/users/profiles', formData, {
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
