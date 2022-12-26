import { dehydrate, QueryClient } from 'react-query';
import { Button, List, Tabs } from 'antd';
import { GetServerSideProps } from 'next';

import { UserItem } from '@/components';
import { AddFriendButton } from '@/features';
import { friendsApi } from '@/shared/api';
import { resolveFriend } from '@/shared/lib';
import {
  getFriendsQueryKeys,
  getFriendsRequestQueryKeys,
  useAcceptFriendRequest,
  useGetFriends,
  useGetFriendsRequests,
  useGetUserMe,
  useRejectFriendRequest,
} from '@/shared/reactQueries';

import styles from './styles.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getFriendsQueryKeys, () =>
    friendsApi.getFriends({ headers: { cookie: ctx.req.headers.cookie } }),
  );

  await queryClient.prefetchQuery(getFriendsRequestQueryKeys, () =>
    friendsApi.getFriendRequests({ headers: { cookie: ctx.req.headers.cookie } }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Friends() {
  const { data: userMe } = useGetUserMe();
  const { data: friends, isLoading } = useGetFriends();
  const { data: requests } = useGetFriendsRequests();

  const { rejectRequest } = useRejectFriendRequest();
  const { acceptRequest } = useAcceptFriendRequest();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <Tabs defaultActiveKey='1' tabBarExtraContent={{ right: <AddFriendButton /> }}>
          <Tabs.TabPane tab='Friends' key='friends'>
            <h4>Friends</h4>
            <div className='divider' />
            <List
              className={styles.list}
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={friends}
              renderItem={({ id, friend }) => {
                const { firstName, lastName, email, profile } = friend;

                return (
                  <UserItem data-testid="friend-user-item" key={id} title={`${firstName} ${lastName}`} description={email} avatar={profile?.avatar} />
                );
              }}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Request' key='request'>
            <h4>Requests</h4>
            <div className='divider' />
            <List
              className={styles.list}
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={requests}
              renderItem={({ id, receiver, sender }) => {
                const { firstName, lastName, email, profile } = resolveFriend(sender, receiver, userMe?.id);

                return (
                  <UserItem data-testid="request-user-item" key={id} title={`${firstName} ${lastName}`} description={email} avatar={profile?.avatar}>
                    {receiver.id === userMe?.id && (
                      <div className={styles.actions}>
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
