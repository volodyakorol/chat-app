import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api';
import { Conversation, CreateConversationParams } from '@/shared/types/conversation.types';

export const useCreateConversation = <T = Conversation>(
  options?: UseMutationOptions<T, AxiosError, CreateConversationParams>,
) => {
  const { mutate, ...rest } = useMutation<T, AxiosError, CreateConversationParams>(
    ['create-conversation'],
    (data: CreateConversationParams) => conversationsApi.createNewConversation(data),
    options,
  );

  return {
    createConversation: mutate,
    ...rest,
  };
};
