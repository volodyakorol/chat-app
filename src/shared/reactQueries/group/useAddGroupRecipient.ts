import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { AddGroupRecipientParams } from '@/shared/types';

export const useAddGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['add-recipient'], (data: AddGroupRecipientParams) =>
    groupApi.addGroupRecipient(data),
  );

  return {
    addRecipient: mutate,
    ...rest,
  };
};
