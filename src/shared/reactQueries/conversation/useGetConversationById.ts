import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api/conversation';
import { TConversation } from '@/shared/types/conversation.types';

export const useGetConversationById = <T = TConversation>(
  conversationId: number,
  options?: UseQueryOptions<T, AxiosError>,
) =>
  useQuery<T, AxiosError, T>(
    ['get-conversation-id', conversationId],
    () => conversationsApi.getConversationById(conversationId),
    options,
  );
