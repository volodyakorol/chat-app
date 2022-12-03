import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { CreateGroupParams } from '@/shared/types';


export const useCreateGroup = () => {
  const { mutate, ...rest } = useMutation(['create-group'], (data: CreateGroupParams) => groupApi.createGroup(data));

  return {
    createGroup: mutate,
    ...rest,
  };
};
