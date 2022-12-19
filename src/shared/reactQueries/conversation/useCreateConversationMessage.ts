import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api';
import { TCreateMessage } from '@/shared/types/conversation.types';

export const useCreateConversationMessage = <T = unknown>(
  options?: UseMutationOptions<T, AxiosError, TCreateMessage>,
) => {
  const { mutate, ...rest } = useMutation<T, AxiosError, TCreateMessage>(
    ['create-conversation-message'],
    (data: TCreateMessage) => conversationsApi.createMessage(data),
    options,
  );

  return {
    createConversationMessage: mutate,
    ...rest,
  };
};
