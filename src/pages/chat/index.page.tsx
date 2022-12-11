import { useGetConversationMessages, useGetGroupMessages, useGetUserMe } from '@/shared/reactQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { UserMessage } from '@/components';
import { ChatsList, GroupAside, MessageInput, UserAside } from '@/widgets';

import s from './styles.module.scss';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const isOpenChat = !!(isGroup ? selectedGroup : selectedChat);

  const { data: userMe } = useGetUserMe();
  const { data: groupMessages } = useGetGroupMessages({ id: selectedGroup }, { enabled: isGroup && !!selectedGroup });
  const { data: conversationMessages } = useGetConversationMessages(selectedChat, {
    enabled: !isGroup && !!selectedChat,
  });

  const messages = isGroup ? groupMessages?.messages : conversationMessages?.messages;

  return (
    <div className={s.content}>
      <ChatsList
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        isGroup={isGroup}
        setIsGroup={setIsGroup}
      />
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
              <div className={s.inputContainer}>
                <MessageInput />
              </div>
            </div>
          </div>

          <div className={s.aside}>
            {isGroup ? <GroupAside selectedGroup={selectedGroup} /> : <UserAside selectedChat={selectedChat} />}
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
