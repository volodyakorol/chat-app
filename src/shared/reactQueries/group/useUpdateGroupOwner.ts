import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TUpdateGroupOwnerParams } from '@/shared/types';

export const useUpdateGroupOwner = () => {
  const { mutate, ...rest } = useMutation(['update-group-owner'], (data: TUpdateGroupOwnerParams) =>
    groupApi.updateGroupOwner(data),
  );

  return {
    updateOwner: mutate,
    ...rest,
  };
};
