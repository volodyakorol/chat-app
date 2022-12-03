import { useMutation } from 'react-query';

import { userApi } from '@/shared/api';
import { TEmailRequest } from '@/shared/types';

export const useCheckEmailExist = () => {
  const { mutate, ...rest } = useMutation(['check-email'], (data: TEmailRequest) => userApi.checkEmailExists(data));

  return {
    checkEmail: mutate,
    ...rest,
  };
};
