import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TAddGroupRecipientParams } from '@/shared/types';

export const useAddGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['add-recipient'], (data: TAddGroupRecipientParams) =>
    groupApi.addGroupRecipient(data),
  );

  return {
    addRecipient: mutate,
    ...rest,
  };
};
