import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { authApi } from '@/shared/api/auth';

export const useLogout = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation(['logout'], authApi.logout, {
    onSuccess: (data, variables, context) => {
      queryClient.removeQueries(['get-user-me']);
      options?.onSuccess && options?.onSuccess(data, variables, context);
    },
    ...options,
  });

  return {
    logout: mutate,
    ...rest,
  };
};
