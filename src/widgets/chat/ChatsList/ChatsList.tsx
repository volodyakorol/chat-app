import { useGetConversations, useGetGroups } from '@/shared/reactQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Radio, RadioChangeEvent } from 'antd';

import { Conversation, Input } from '@/components';

import s from './styles.module.scss';
import dayjs from 'dayjs';

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
  const { data: chats = [] } = useGetConversations({ enabled: !isGroup });
  const { data: groups = [] } = useGetGroups({ enabled: isGroup });

  const handleModeChange = (e: RadioChangeEvent) => {
    setIsGroup(e.target.value === 'groups');
  };

  return (
    <div className={s.chats}>
      <div className={s.search}>
        <Input
          size='large'
          placeholder='Search messages'
          prefix={<FontAwesomeIcon color='#C5C7D2' icon={faSearch} />}
        />
      </div>
      <Radio.Group className={s.chatTypes} onChange={handleModeChange} value={isGroup ? 'groups' : 'chats'}>
        <Radio.Button value='chats'>Chats</Radio.Button>
        <Radio.Button value='groups'>Groups</Radio.Button>
      </Radio.Group>
      <div>
        {!isGroup &&
          chats.map(({ id, lastMessageSent, recipient }) => {
            const { content, createdAt } = lastMessageSent;
            const { firstName, lastName, profile } = recipient;

            return (
              <Conversation
                key={id}
                time={dayjs(createdAt).format('h:mm a')}
                title={`${firstName} ${lastName}`}
                isActive={selectedChat === id}
                description={content}
                avatar={profile?.avatar}
                onChange={() => onSelectChat(id)}
              />
            );
          })}

        {isGroup &&
          groups.map(({ id, lastMessageSent, avatar, title }) => {
            const { content, author, createdAt } = lastMessageSent;

            return (
              <Conversation
                key={id}
                time={dayjs(createdAt).format('h:mm a')}
                title={title}
                isActive={selectedGroup === id}
                avatar={avatar}
                description={
                  <>
                    <b>{author.firstName}</b>
                    {content}
                  </>
                }
                onChange={() => onSelectGroup(id)}
              />
            );
          })}
      </div>
    </div>
  );
};
