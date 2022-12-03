import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api/conversation';
import { GetMessagesResponse } from '@/shared/types/conversation.types';

export const useGetConversationMessages = <T = GetMessagesResponse>(
  conversationId: number,
  options?: UseQueryOptions<T, AxiosError>,
) =>
  useQuery<T, AxiosError, T>(
    ['get-conversation-messages', conversationId],
    () => conversationsApi.getConversationMessages(conversationId),
    options,
  );
