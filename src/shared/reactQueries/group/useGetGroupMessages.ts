import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { Group } from '@/shared/types';

export const useGetGroupMessages = <T = Group[]>(options?: UseQueryOptions<Group[], AxiosError, T>) =>
  useQuery<Group[], AxiosError, T>(['get-groups'], groupApi.getGroups, options);
