import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { friendsApi } from '@/shared/api';
import { getFriendsQueryKeys } from '@/shared/reactQueries/friend/keys';
import { TFriend } from '@/shared/types';

export const useGetFriends = <T = TFriend[]>(options?: UseQueryOptions<TFriend[], AxiosError, T>) =>
  useQuery<TFriend[], AxiosError, T>(getFriendsQueryKeys, friendsApi.getFriends, options);
