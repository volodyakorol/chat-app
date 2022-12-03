import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/shared/api/auth';
import { User } from '@/shared/types';

export const useAuthUser = (options?: UseQueryOptions<User, AxiosError, User>) =>
  useQuery<User, AxiosError, User>(['get-auth-user'], authApi.getAuthUser, options);
