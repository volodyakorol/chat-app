import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { userApi } from '@/shared/api';
import { TSearchUserRequest, TUser } from '@/shared/types';

export const useSearchUsers = <T = TUser[]>(
  data: TSearchUserRequest,
  options?: UseQueryOptions<TUser[], AxiosError, T>,
) =>
  useQuery<TUser[], AxiosError, T>(['search-user', JSON.stringify(data)], () => userApi.searchUsers(data), {
    enabled: !!data.query,
    ...options,
  });
