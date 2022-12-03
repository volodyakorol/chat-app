import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { userApi } from '@/shared/api';
import { TSearchUserRequest, User } from '@/shared/types';

export const useSearchUsers = <T = User[]>(
  data: TSearchUserRequest,
  options?: UseQueryOptions<User[], AxiosError, T>,
) => useQuery<User[], AxiosError, T>(['search-user', JSON.stringify(data)], () => userApi.searchUsers(data), options);
