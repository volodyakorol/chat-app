import { useGetConversations, useGetGroups, useGetUserMe } from '@/shared/reactQueries';
import { Radio, RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';

import { Conversation } from '@/components';
import { CreateChatButton } from '@/features';

import s from './styles.module.scss';

type TChatsListProps = {
  selectedGroup?: number;
  onSelectGroup: (chatId: number) => void;
  selectedChat?: number;
  onSelectChat: (chatId: number) => void;
  isGroup: boolean;
  setIsGroup: (isGroup: boolean) => void;
};

export const ChatsList = ({
  selectedChat,
  onSelectChat,
  selectedGroup,
  onSelectGroup,
  isGroup,
  setIsGroup,
}: TChatsListProps) => {

  const { data } = useGetUserMe();
  const { data: chats = [] } = useGetConversations({ enabled: !isGroup });
  const { data: groups = [] } = useGetGroups({ enabled: isGroup });

  const handleModeChange = (e: RadioChangeEvent) => {
    setIsGroup(e.target.value === 'groups');
  };

  return (
    <div className={s.chats}>
      <div className={s.search}>
        <CreateChatButton />
      </div>
      <Radio.Group className={s.chatTypes} onChange={handleModeChange} value={isGroup ? 'groups' : 'chats'}>
        <Radio.Button value='chats'>Chats</Radio.Button>
        <Radio.Button value='groups'>Groups</Radio.Button>
      </Radio.Group>
      <div>
        {!isGroup &&
          chats.map(({ id, lastMessageSent, lastMessageSentAt, recipient, creator }) => {
            const { firstName, lastName, profile } = data?.id === recipient.id ? creator : recipient;

            return (
              <Conversation
                key={id}
                time={dayjs(lastMessageSentAt).format('h:mm a')}
                title={`${firstName} ${lastName}`}
                isActive={selectedChat === id}
                description={lastMessageSent?.content}
                avatar={profile?.avatar}
                onClick={() => onSelectChat(id)}
              />
            );
          })}

        {isGroup &&
          groups.map(({ id, lastMessageSent, lastMessageSentAt, avatar, title }) => {
            const { content, author } = lastMessageSent ?? {};

            return (
              <Conversation
                key={id}
                time={dayjs(lastMessageSentAt).format('h:mm a')}
                title={title}
                isActive={selectedGroup === id}
                avatar={avatar}
                description={
                  lastMessageSent ? (
                    <>
                      <b>{author.firstName}</b>
                      {content}
                    </>
                  ) : (
                    'you wsa invited to this group'
                  )
                }
                onClick={() => onSelectGroup(id)}
              />
            );
          })}
      </div>
    </div>
  );
};
