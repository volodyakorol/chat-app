import { useQueryClient } from 'react-query';

import { useSocket } from '@/shared/hook';
import { TGetMessagesResponse } from '@/shared/types';

export const useInitialSocket = () => {
  const queryClient = useQueryClient();

  useSocket('onMessage', async ({ conversation, message }) => {
    await queryClient.cancelQueries(['get-conversation-messages', conversation.id]);

    queryClient.setQueryData<TGetMessagesResponse | undefined>(
      ['get-conversation-messages', conversation.id],
      (data) => {
        return data && { ...data, messages: [...data.messages, message] };
      },
    );
  });
};
