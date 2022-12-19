import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { friendsApi } from '@/shared/api';
import { getFriendsRequestQueryKeys } from '@/shared/reactQueries/friend/keys';
import { TFriendRequest } from '@/shared/types';

export const useGetFriendsRequests = <T = TFriendRequest[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(getFriendsRequestQueryKeys, friendsApi.getFriendRequests, options);
