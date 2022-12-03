import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/shared/api/auth';
import { TRegister } from '@/shared/types/auth.types';

export const useRegister = (options?: UseMutationOptions<TRegister, AxiosError, TRegister>) => {
  const { mutate, ...rest } = useMutation(['post-register'], (data: TRegister) => authApi.register(data), options);

  return {
    register: mutate,
    ...rest,
  };
};
