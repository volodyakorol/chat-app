import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { TGroup, TIdRequest } from '@/shared/types';

export const useGetGroup = <T = TGroup>(data: TIdRequest, options?: UseQueryOptions<TIdRequest, AxiosError, T>) =>
  useQuery<TIdRequest, AxiosError, T>(['get-group', JSON.stringify(data)], () => groupApi.getGroupById(data), options);
