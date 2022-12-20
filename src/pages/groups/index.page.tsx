import { useState } from 'react';
import dayjs from 'dayjs';

import { Conversation, UserMessage } from '@/components';
import { CreateGroupButton } from '@/features';
import { useCreateGroupMessage, useGetGroupMessages, useGetGroups, useGetUserMe } from '@/shared/reactQueries';
import { GroupAside, MessageInput } from '@/widgets';

import styles from './styles.module.scss';

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const isOpenGroup = !!selectedGroup;

  const { data: userMe } = useGetUserMe();
  const { data: groups = [] } = useGetGroups();
  const { createGroupMessage } = useCreateGroupMessage();
  const { data: groupMessages } = useGetGroupMessages({ id: selectedGroup }, { enabled: isOpenGroup });
  const messages = groupMessages?.messages;

  return (
    <div className={styles.content}>
      <div className={styles.chats}>
        <div className={styles.createButton}>
          <CreateGroupButton />
        </div>
        <div>
          {!!groups.length || <div style={{ width: 100, height: 100, backgroundColor: 'red' }}>sdf</div>}
          {groups.map(({ id, lastMessageSent, lastMessageSentAt, avatar, title }) => {
            const { content } = lastMessageSent ?? {};

            return (
              <Conversation
                key={id}
                time={dayjs(lastMessageSentAt).format('h:mm a')}
                title={title}
                isActive={selectedGroup === id}
                avatar={avatar}
                description={lastMessageSent ? content : 'you was invited to this group'}
                onClick={() => setSelectedGroup(id)}
              />
            );
          })}
        </div>
      </div>
      {isOpenGroup ? (
        <>
          <div className={styles.chat}>
            <div className={styles.chatBody}>
              <div className={styles.messages}>
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
                <MessageInput
                  onSend={(content, attachments) =>
                    createGroupMessage({ content, attachments, groupId: selectedGroup })
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.aside}>
            <GroupAside selectedGroup={selectedGroup} />
          </div>
        </>
      ) : (
        <div className={styles.notChat}>
          <h1>Select group</h1>
        </div>
      )}
    </div>
  );
}
