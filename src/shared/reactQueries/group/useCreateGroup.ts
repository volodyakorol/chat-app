import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { TCreateGroupParams } from '@/shared/types';

export const useCreateGroup = <T = unknown>(options?: UseMutationOptions<T, AxiosError, TCreateGroupParams>) => {
  const { mutate, ...rest } = useMutation<T, AxiosError, TCreateGroupParams>(
    ['create-group'],
    (data: TCreateGroupParams) => groupApi.createGroup(data),
    options,
  );

  return {
    createGroup: mutate,
    ...rest,
  };
};
