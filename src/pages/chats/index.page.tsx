import {
  useCreateConversationMessage,
  useGetConversationMessages,
  useGetConversations,
  useGetUserMe,
} from '@/shared/reactQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { Conversation, UserMessage } from '@/components';
import { CreateChatButton } from '@/features';
import { MessageInput, UserAside } from '@/widgets';

import s from './styles.module.scss';

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
    <div className={s.content}>
      <div className={s.chats}>
        <div className={s.createButton}>
          <CreateChatButton />
        </div>
        <div>
          {chats.reverse().map(({ id, lastMessageSent, lastMessageSentAt, recipient, creator }) => {
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
          <div className={s.chat}>
            <div className={s.chatHeader}>
              <div className={s.chatActions}>
                <FontAwesomeIcon fixedWidth={true} icon={faPhone} />
              </div>
            </div>
            <div className={s.chatBody}>
              <div className={s.messages}>
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

          <div className={s.aside}>
            <UserAside selectedChat={selectedChat} />
          </div>
        </>
      ) : (
        <div className={s.notChat}>
          <h1>Select chat</h1>
        </div>
      )}
    </div>
  );
}
