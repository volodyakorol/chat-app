import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TCreateGroupParams } from '@/shared/types';

export const useCreateGroup = () => {
  const { mutate, ...rest } = useMutation(['create-group'], (data: TCreateGroupParams) => groupApi.createGroup(data));

  return {
    createGroup: mutate,
    ...rest,
  };
};
