import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { conversationsApi } from '@/shared/api';
import { TConversation, TCreateConversationParams } from '@/shared/types/conversation.types';

export const useCreateConversation = <T = TConversation>(
  options?: UseMutationOptions<T, AxiosError, TCreateConversationParams>,
) => {
  const { mutate, ...rest } = useMutation<T, AxiosError, TCreateConversationParams>(
    ['create-conversation'],
    (data: TCreateConversationParams) => conversationsApi.createNewConversation(data),
    options,
  );

  return {
    createConversation: mutate,
    ...rest,
  };
};
