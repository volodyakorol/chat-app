import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { userApi } from '@/shared/api';
import { TUser } from '@/shared/types';

export const useGetUser = ({ userId }: { userId: number }, options?: UseQueryOptions<TUser, AxiosError, TUser>) =>
  useQuery<TUser, AxiosError, TUser>(['get-user', userId], () => userApi.getById({ userId }), options);
