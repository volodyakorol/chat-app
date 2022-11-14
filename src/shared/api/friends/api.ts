import { api } from '@/shared/api';

import { AcceptFriendRequestResponse, CancelFriendRequestResponse, Friend, FriendRequest } from './types';

export const fetchFriends = () => api.get<Friend[]>('/friends');

export const fetchFriendRequests = () => api.get<FriendRequest[]>('/friends/requests');

export const createFriendRequest = (username: string) => api.post<FriendRequest>('/friends/requests', { username });

export const cancelFriendRequest = (id: number) =>
  api.delete<CancelFriendRequestResponse>(`/friends/requests/${id}/cancel`);

export const acceptFriendRequest = (id: number) =>
  api.patch<AcceptFriendRequestResponse>(`/friends/requests/${id}/accept`, {});

export const rejectFriendRequest = (id: number) => api.patch<FriendRequest>(`/friends/requests/${id}/reject`, {});

export const removeFriend = (id: number) => api.delete<Friend>(`/friends/${id}/delete`);
