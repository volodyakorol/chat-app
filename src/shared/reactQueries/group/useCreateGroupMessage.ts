import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { TCreateGroupMessage } from '@/shared/types';

export const useCreateGroupMessage = <T = unknown>(
  options?: UseMutationOptions<T, AxiosError, TCreateGroupMessage>,
) => {
  const { mutate, ...rest } = useMutation<T, AxiosError, TCreateGroupMessage>(
    ['create-group-message'],
    (data: TCreateGroupMessage) => groupApi.createGroupMessage(data),
    options,
  );

  return {
    createGroupMessage: mutate,
    ...rest,
  };
};
