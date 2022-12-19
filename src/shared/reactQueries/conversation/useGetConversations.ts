import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api/conversation';
import { TConversation } from '@/shared/types/conversation.types';

export const useGetConversations = <T = TConversation[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(['get-conversations'], conversationsApi.getConversations, options);
