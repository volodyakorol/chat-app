import { api } from '@/shared/api';
import { TEmailRequest, TIdRequest } from '@/shared/types';

import { AcceptFriendRequestResponse, CancelFriendRequestResponse, Friend, FriendRequest } from '../types/friend.types';

export const friendsApi = {
  getFriends: () => api.get('/friends').then((res) => res.data),

  getFriendRequests: () => api.get('/friends/requests').then((res) => res.data),

  createFriendRequest: ({ email }: TEmailRequest) =>
    api.post<FriendRequest>('/friends/requests', { email }).then((res) => res.data),

  cancelFriendRequest: ({ id }: TIdRequest) =>
    api.delete<CancelFriendRequestResponse>(`/friends/requests/${id}/cancel`).then((res) => res.data),

  acceptFriendRequest: ({ id }: TIdRequest) =>
    api.patch<AcceptFriendRequestResponse>(`/friends/requests/${id}/accept`, {}).then((res) => res.data),

  rejectFriendRequest: ({ id }: TIdRequest) =>
    api.patch<FriendRequest>(`/friends/requests/${id}/reject`, {}).then((res) => res.data),

  removeFriend: ({ id }: TIdRequest) => api.delete<Friend>(`/friends/${id}/delete`).then((res) => res.data),
};
