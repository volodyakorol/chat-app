import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TDeleteGroupMessageParams } from '@/shared/types';

export const useDeleteGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['delete-group-message'], (data: TDeleteGroupMessageParams) =>
    groupApi.deleteGroupMessage(data),
  );

  return {
    deleteMessage: mutate,
    ...rest,
  };
};
