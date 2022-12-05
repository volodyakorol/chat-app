import { useGetUserMe, useGetConversationMessages, useGetGroupMessages } from '@/shared/reactQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faHelicopter, faSearch } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { Input, UserMessage } from '@/components';
import { ChatsList, GroupAside, UserAside } from '@/widgets';

import s from './styles.module.scss';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [isGroup, setIsGroup] = useState(false);
  const { data: userMe } = useGetUserMe();

  const { data: conversationMessages } = useGetConversationMessages(selectedChat, {
    enabled: !isGroup && !!selectedChat,
  });
  const { data: groupMessages } = useGetGroupMessages({ id: selectedGroup }, { enabled: isGroup && !!selectedGroup });

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
      <div className={s.chat}>
        <div className={s.chatHeader}>
          <div className={s.chatActions}>
            <FontAwesomeIcon fixedWidth={true} icon={faHelicopter} />
            <FontAwesomeIcon fixedWidth={true} icon={faHelicopter} />
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
            <Input
              size='large'
              placeholder='Type something'
              prefix={<FontAwesomeIcon color='#C5C7D2' icon={faSearch} />}
            />
          </div>
        </div>
      </div>
      <div className={s.aside}>
        {isGroup ? <GroupAside selectedGroup={selectedGroup} /> : <UserAside selectedChat={selectedChat} />}
      </div>
    </div>
  );
}
