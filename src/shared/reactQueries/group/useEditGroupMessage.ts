import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TEditMessagePayload } from '@/shared/types';

export const useEditGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['edit-group-message'], (data: TEditMessagePayload) =>
    groupApi.editGroupMessage(data),
  );

  return {
    editMessage: mutate,
    ...rest,
  };
};
