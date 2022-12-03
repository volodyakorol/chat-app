import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api/conversation';
import { Conversation, GetMessagesResponse } from '@/shared/types/conversation.types';

export const useGetConversations = <T = Conversation[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(['get-conversations'], conversationsApi.getConversations, options);

export const useGetConversationById = <T = Conversation>(
  conversationId: number,
  options?: UseQueryOptions<T, AxiosError>,
) =>
  useQuery<T, AxiosError, T>(
    ['get-conversation-id', conversationId],
    () => conversationsApi.getConversationById(conversationId),
    options,
  );

export const useGetConversationMessages = <T = GetMessagesResponse>(
  conversationId: number,
  options?: UseQueryOptions<T, AxiosError>,
) =>
  useQuery<T, AxiosError, T>(
    ['get-conversation-messages', conversationId],
    () => conversationsApi.getConversationMessages(conversationId),
    options,
  );

// export const useCreateConversation = (options?: UseMutationOptions<Conversation, AxiosError, >) => {
//   const { mutate, ...rest } = useMutation<Conversation>(
//     'post-logout',
//     (data: CreateConversationParams) => authAoi.postNewConversation(data),
//     options,
//   );

//   return {
//     createConversation: mutate,
//     ...rest,
//   };
// };
