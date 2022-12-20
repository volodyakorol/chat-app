import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { TGroup } from '@/shared/types';

export const useGetGroups = <T = TGroup[]>(options?: UseQueryOptions<TGroup[], AxiosError, T>) =>
  useQuery<TGroup[], AxiosError, T>(['get-groups'], groupApi.getGroups, options);
