import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { EditMessagePayload } from '@/shared/types';

export const useEditGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['edit-group-message'], (data: EditMessagePayload) =>
    groupApi.editGroupMessage(data),
  );

  return {
    editMessage: mutate,
    ...rest,
  };
};
