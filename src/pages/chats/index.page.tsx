import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';

import { Conversation, UserMessage } from '@/components';
import { CreateChatButton } from '@/features';
import { conversationsApi } from '@/shared/api';
import {
  useCreateConversationMessage,
  useGetConversationMessages,
  useGetConversations,
  useGetUserMe,
} from '@/shared/reactQueries';
import { MessageInput, UserAside } from '@/widgets';

import styles from './styles.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['get-conversations'], () =>
    conversationsApi.getConversations({ headers: { cookie: ctx.req.headers.cookie } }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(0);
  const isOpenChat = !!selectedChat;

  const { data: userMe } = useGetUserMe();
  const { data: chats = [] } = useGetConversations();
  const { createConversationMessage } = useCreateConversationMessage();
  const { data: conversationMessages } = useGetConversationMessages(selectedChat, {
    enabled: isOpenChat,
  });

  return (
    <div className={styles.content}>
      <div className={styles.chats}>
        <div className={styles.createButton}>
          <CreateChatButton />
        </div>
        <div>
          {chats.map(({ id, lastMessageSent, lastMessageSentAt, recipient, creator }) => {
            const { firstName, lastName, profile } = userMe?.id === recipient.id ? creator : recipient;

            return (
              <Conversation
                key={id}
                time={dayjs(lastMessageSentAt).format('h:mm a')}
                title={`${firstName} ${lastName}`}
                isActive={selectedChat === id}
                description={lastMessageSent?.content}
                avatar={profile?.avatar}
                onClick={() => setSelectedChat(id)}
              />
            );
          })}
        </div>
      </div>

      {isOpenChat ? (
        <>
          <div className={styles.chat}>
            <div className={styles.chatBody}>
              <div className={styles.messages}>
                {conversationMessages?.messages?.map(({ id, author, content = '', createdAt, attachments }) => (
                  <UserMessage
                    key={id}
                    avatar={author.profile?.avatar}
                    attachments={attachments}
                    isMyMessage={author.id === userMe?.id}
                    message={content}
                    time={dayjs(createdAt).format('h:mm a')}
                  />
                ))}
              </div>
              <div>
                <MessageInput
                  onSend={(content, attachments) =>
                    createConversationMessage({ content, attachments, conversationId: selectedChat })
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.aside}>
            <UserAside selectedChat={selectedChat} />
          </div>
        </>
      ) : (
        <div className={styles.notChat}>
          <h1>Select chat</h1>
        </div>
      )}
    </div>
  );
}
