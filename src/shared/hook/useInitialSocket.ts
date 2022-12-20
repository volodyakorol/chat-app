import { useQueryClient } from 'react-query';

import { useSocket } from '@/shared/hook';
import { TFetchGroupMessagePayload, TGetMessagesResponse, TGroup } from '@/shared/types';

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

  useSocket('onGroupMessage', async ({ group, message }) => {
    await queryClient.cancelQueries(['get-group-messages', group.id]);
    await queryClient.cancelQueries(['get-groups']);

    queryClient.setQueryData<TFetchGroupMessagePayload | undefined>(['get-group-messages', group.id], (data) => {
      return data && { ...data, messages: [...data.messages, message] };
    });

    queryClient.setQueryData<TGroup[] | undefined>(
      ['get-groups'],
      (data) =>
        data &&
        data.map((groups) =>
          groups.id === group.id
            ? {
                ...groups,
                lastMessageSent: { content: message.content ?? '', createdAt: message.createdAt, id: message.id },
              }
            : groups,
        ),
    );
  });
};
