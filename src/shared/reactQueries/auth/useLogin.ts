import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/shared/api/auth';
import { TLogin } from '@/shared/types/auth.types';

export const useLogin = (options?: UseMutationOptions<TLogin, AxiosError, TLogin>) => {
  const { mutate, ...rest } = useMutation(['login'], (data: TLogin) => authApi.login(data), options);

  return {
    login: mutate,
    ...rest,
  };
};
