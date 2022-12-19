import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { TFetchGroupMessagePayload, TIdRequest } from '@/shared/types';

export const useGetGroupMessages = <T = TFetchGroupMessagePayload>(
  data: TIdRequest,
  options?: UseQueryOptions<TIdRequest, AxiosError, T>,
) => useQuery<TIdRequest, AxiosError, T>(['get-group-messages'], () => groupApi.getGroupMessages(data), options);
