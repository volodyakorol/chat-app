import { AxiosRequestConfig } from 'axios';

import { api } from '@/shared/api';
import { TEmailRequest, TIdRequest } from '@/shared/types';

import {
  AcceptFriendRequestResponse,
  TCancelFriendRequestResponse,
  TFriend,
  TFriendRequest,
} from '../types/friend.types';

export const friendsApi = {
  getFriends: (options: AxiosRequestConfig) => api.get<TFriend[]>('/friends', options).then((res) => res.data),

  getFriendRequests: (options: AxiosRequestConfig) => api.get('/friends/requests', options).then((res) => res.data),

  createFriendRequest: ({ email }: TEmailRequest) =>
    api.post<TFriendRequest>('/friends/requests', { email }).then((res) => res.data),

  cancelFriendRequest: ({ id }: TIdRequest) =>
    api.delete<TCancelFriendRequestResponse>(`/friends/requests/${id}/cancel`).then((res) => res.data),

  acceptFriendRequest: ({ id }: TIdRequest) =>
    api.patch<AcceptFriendRequestResponse>(`/friends/requests/${id}/accept`, {}).then((res) => res.data),

  rejectFriendRequest: ({ id }: TIdRequest) =>
    api.patch<TFriendRequest>(`/friends/requests/${id}/reject`, {}).then((res) => res.data),

  removeFriend: ({ id }: TIdRequest) => api.delete<TFriend>(`/friends/${id}/delete`).then((res) => res.data),
};
