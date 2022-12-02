import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/shared/api/auth';
import { User } from '@/shared/types';
import { TLogin, TRegister } from '@/shared/types/auth.types';

export const useAuthUser = (options?: UseQueryOptions<User, AxiosError, User>) =>
  useQuery<User, AxiosError, User>(['get-auth-user'], authApi.getAuthUser, options);

export const useLogin = (options?: UseMutationOptions<TLogin, AxiosError, TLogin>) => {
  const { mutate, ...rest } = useMutation('post-login', (data: TLogin) => authApi.login(data), options);

  return {
    login: mutate,
    ...rest,
  };
};

export const useRegister = (options?: UseMutationOptions<TLogin, AxiosError, TLogin>) => {
  const { mutate, ...rest } = useMutation('post-register', (data: TRegister) => authApi.register(data), options);

  return {
    register: mutate,
    ...rest,
  };
};

export const useLogout = (options?: UseMutationOptions) => {
  const { mutate, ...rest } = useMutation('post-logout', authApi.logout, options);

  return {
    register: mutate,
    ...rest,
  };
};
