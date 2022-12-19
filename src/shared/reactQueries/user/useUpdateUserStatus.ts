import { useMutation } from 'react-query';

import { userApi } from '@/shared/api';
import { TStatusMessage } from '@/shared/types';

export const useUpdateUserStatus = () => {
  const { mutate, ...rest } = useMutation(['update-user-status-message'], (data: TStatusMessage) =>
    userApi.updateStatusMessage(data),
  );

  return {
    updateStatus: mutate,
    ...rest,
  };
};
