import { useMutation, UseMutationOptions } from 'react-query';

import { authApi } from '@/shared/api/auth';

export const useLogout = (options?: UseMutationOptions) => {
  const { mutate, ...rest } = useMutation(['logout'], authApi.logout, options);

  return {
    register: mutate,
    ...rest,
  };
};
