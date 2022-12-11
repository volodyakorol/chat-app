import {
  useAcceptFriendRequest,
  useGetFriends,
  useGetFriendsRequests,
  useGetUserMe,
  useRejectFriendRequest,
} from '@/shared/reactQueries';
import { useState } from 'react';
import { Button, List, Tabs } from 'antd';

import { UserItem } from '@/components';
import { AddFriendButton } from '@/features';
import { User } from '@/shared/types';

import s from './styles.module.scss';

type TTab = 'friends' | 'request';

export default function Home() {
  const [tab, setTab] = useState<TTab>('friends');
  const isFriendsTab = tab === 'friends';

  const { data: userMe } = useGetUserMe();
  const { data: friends, isLoading } = useGetFriends({ enabled: isFriendsTab });
  const { data: requests } = useGetFriendsRequests({ enabled: isFriendsTab });

  const { rejectRequest } = useRejectFriendRequest();
  const { acceptRequest } = useAcceptFriendRequest();

  const resolveFriend = (sender: User, receiver: User) => {
    return userMe?.id !== sender.id ? sender : receiver;
  };

  return (
    <div className={s.screen}>
      <div className={s.content}>
        <Tabs
          defaultActiveKey='1'
          onChange={(actionKey) => setTab(actionKey as TTab)}
          tabBarExtraContent={{ right: <AddFriendButton /> }}
        >
          <Tabs.TabPane tab='Friends' key='friends'>
            <h4>Friends</h4>
            <div className='divider' />
            <List
              className={s.list}
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={friends}
              renderItem={({ id, receiver, sender }) => {
                const { firstName, lastName, email, profile } = resolveFriend(sender, receiver);

                return (
                  <UserItem key={id} title={`${firstName} ${lastName}`} description={email} avatar={profile?.avatar} />
                );
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Request' key='request'>
            <h4>Requests</h4>
            <div className='divider' />
            <List
              className={s.list}
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={requests}
              renderItem={({ id, receiver, sender }) => {
                const { firstName, lastName, email, profile } = resolveFriend(sender, receiver);

                return (
                  <UserItem key={id} title={`${firstName} ${lastName}`} description={email} avatar={profile?.avatar}>
                    {receiver.id === userMe?.id && (
                      <div className={s.actions}>
                        <Button type='primary' size='small' onClick={() => acceptRequest({ id })}>
                          accept
                        </Button>
                        <Button size='small' onClick={() => rejectRequest({ id })}>
                          reject
                        </Button>
                      </div>
                    )}
                  </UserItem>
                );
              }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
