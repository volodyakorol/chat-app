import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TIdRequest } from '@/shared/types';

export const useLeaveGroup = () => {
  const { mutate, ...rest } = useMutation(['leave-group'], (data: TIdRequest) => groupApi.leaveGroup(data));

  return {
    leave: mutate,
    ...rest,
  };
};
