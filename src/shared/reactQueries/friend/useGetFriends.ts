import { getFriendsQueryKeys } from '@/shared/reactQueries/friend/keys';
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { friendsApi } from '@/shared/api';
import { Friend } from '@/shared/types';

export const useGetFriends = <T = Friend[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(getFriendsQueryKeys, friendsApi.getFriends, options);
