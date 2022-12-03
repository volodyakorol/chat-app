import { getFriendsRequestQueryKeys } from '@/shared/reactQueries/friend/keys';
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { friendsApi } from '@/shared/api';
import { FriendRequest } from '@/shared/types';

export const useGetFriendsRequests = <T = FriendRequest[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(getFriendsRequestQueryKeys, friendsApi.getFriendRequests, options);
