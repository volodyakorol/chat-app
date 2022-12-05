import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { FetchGroupMessagePayload, TIdRequest } from '@/shared/types';

export const useGetGroupMessages = <T = FetchGroupMessagePayload>(
  data: TIdRequest,
  options?: UseQueryOptions<TIdRequest, AxiosError, T>,
) => useQuery<TIdRequest, AxiosError, T>(['get-groups'], () => groupApi.getGroupMessages(data), options);
