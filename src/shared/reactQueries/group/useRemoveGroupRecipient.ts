import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TRemoveGroupRecipientParams } from '@/shared/types';

export const useRemoveGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['remove-recipient'], (data: TRemoveGroupRecipientParams) =>
    groupApi.removeGroupRecipient(data),
  );

  return {
    removeRecipient: mutate,
    ...rest,
  };
};
