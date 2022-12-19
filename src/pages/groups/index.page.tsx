import { useState } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

import { Conversation, UserMessage } from '@/components';
import { CreateChatButton } from '@/features';
import { useGetGroupMessages, useGetGroups, useGetUserMe } from '@/shared/reactQueries';
import { GroupAside, MessageInput } from '@/widgets';

import s from './styles.module.scss';

export default function Groups() {
  const [selectedChat, setSelectedChat] = useState(0);
  const isOpenChat = !!selectedChat;

  const { data: userMe } = useGetUserMe();
  const { data: groups = [] } = useGetGroups();
  const { data: groupMessages } = useGetGroupMessages({ id: selectedChat }, { enabled: isOpenChat });

  const messages = groupMessages?.messages;

  return (
    <div className={s.content}>
      <div className={s.chats}>
        <div className={s.createButton}>
          <CreateChatButton />
        </div>
        <div>
          {groups.map(({ id, lastMessageSent, lastMessageSentAt, avatar, title }) => {
            const { content, author } = lastMessageSent ?? {};

            return (
              <Conversation
                key={id}
                time={dayjs(lastMessageSentAt).format('h:mm a')}
                title={title}
                isActive={selectedChat === id}
                avatar={avatar}
                description={
                  lastMessageSent ? (
                    <>
                      <b>{author.firstName}</b>
                      {content}
                    </>
                  ) : (
                    'you was invited to this group'
                  )
                }
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
                {messages?.map(({ id, author, content = '', createdAt }) => (
                  <UserMessage
                    key={id}
                    avatar={author.profile?.avatar}
                    isMyMessage={author.id === userMe?.id}
                    message={content}
                    time={dayjs(createdAt).format('h:mm a')}
                  />
                ))}
              </div>
              <div>
                <MessageInput onSend={() => alert('soon to be')} />
              </div>
            </div>
          </div>

          <div className={s.aside}>
            <GroupAside selectedGroup={selectedChat} />
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
