import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { userApi } from '@/shared/api';
import { StatusMessage, TEmailRequest, TSearchUserRequest, User } from '@/shared/types';

export const useSearchUsers = <T = User[]>(
  data: TSearchUserRequest,
  options?: UseQueryOptions<User[], AxiosError, T>,
) => useQuery<User[], AxiosError, T>(['search-user', JSON.stringify(data)], () => userApi.searchUsers(data), options);


export const useCheckEmailExist = () => {
  const { mutate, ...rest } = useMutation(['check-email'], (data: TEmailRequest) => userApi.checkEmailExists(data));

  return {
    checkEmail: mutate,
    ...rest,
  };
};

export const useUpdateUserStatus = () => {
  const { mutate, ...rest } = useMutation(['update-status-message'], (data: StatusMessage) =>
    userApi.updateStatusMessage(data),
  );

  return {
    updateStatus: mutate,
    ...rest,
  };
};
