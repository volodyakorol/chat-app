import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { DeleteGroupMessageParams } from '@/shared/types';

export const useDeleteGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['delete-group-message'], (data: DeleteGroupMessageParams) =>
    groupApi.deleteGroupMessage(data),
  );

  return {
    deleteMessage: mutate,
    ...rest,
  };
};
