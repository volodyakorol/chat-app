import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { RemoveGroupRecipientParams } from '@/shared/types';

export const useRemoveGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['remove-recipient'], (data: RemoveGroupRecipientParams) =>
    groupApi.removeGroupRecipient(data),
  );

  return {
    removeRecipient: mutate,
    ...rest,
  };
};
