import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import { FetchGroupMessagePayload, TIdRequest } from '@/shared/types';

export const useGetGroup = <T = FetchGroupMessagePayload>(
  data: TIdRequest,
  options?: UseQueryOptions<FetchGroupMessagePayload, AxiosError, T>,
) =>
  useQuery<FetchGroupMessagePayload, AxiosError, T>(
    ['get-group', JSON.stringify(data)],
    () => groupApi.getGroupMessages(data),
    options,
  );
