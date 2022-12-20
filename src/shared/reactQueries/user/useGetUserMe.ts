import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/shared/api/auth';
import { TUser } from '@/shared/types';

export const useGetUserMe = (options?: UseQueryOptions<TUser, AxiosError, TUser>) =>
  useQuery<TUser, AxiosError, TUser>(['get-user-me'], authApi.getAuthUser, options);
