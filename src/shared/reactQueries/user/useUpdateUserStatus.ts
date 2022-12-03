import { useMutation } from 'react-query';

import { userApi } from '@/shared/api';
import { StatusMessage } from '@/shared/types';

export const useUpdateUserStatus = () => {
  const { mutate, ...rest } = useMutation(['update-status-message'], (data: StatusMessage) =>
    userApi.updateStatusMessage(data),
  );

  return {
    updateStatus: mutate,
    ...rest,
  };
};
