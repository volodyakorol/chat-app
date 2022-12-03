import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { UpdateGroupOwnerParams } from '@/shared/types';

export const useUpdateGroupOwner = () => {
  const { mutate, ...rest } = useMutation(['update-group-owner'], (data: UpdateGroupOwnerParams) =>
    groupApi.updateGroupOwner(data),
  );

  return {
    updateOwner: mutate,
    ...rest,
  };
};
