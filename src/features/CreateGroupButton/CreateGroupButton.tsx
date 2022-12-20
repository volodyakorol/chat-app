import React, { useState } from 'react';
import { Button, List, Modal, notification } from 'antd';

import { Input, UserItem } from '@/components';
import { useCreateGroup, useGetUserMe, useSearchUsers } from '@/shared/reactQueries';
import { TUser } from '@/shared/types';

import styles from './styles.module.scss';

export const CreateGroupButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);

  const { data: userMe } = useGetUserMe();
  const { createGroup } = useCreateGroup({ onSuccess: () => notification.success({ message: 'Group created' }) });
  const { data = [], isLoading } = useSearchUsers({ query: value });

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const removeUser = (email: string) => setSelectedUsers((prev) => prev.filter((user) => user.email !== email));
  const addUser = (user: TUser) => setSelectedUsers((prev) => [...prev, user]);

  const handleSubmit = () =>
    selectedUsers.length
      ? createGroup({ users: selectedUsers.map(({ email }) => email), title }, { onSuccess: closeModal })
      : setError('please enter Group title');

  return (
    <>
      <Button className={styles.createChat} type='primary' onClick={openModal}>
        Create group
      </Button>
      <Modal data-testid='add-friend-modal' title='Add friend' open={open} onOk={handleSubmit} onCancel={closeModal}>
        <Input placeholder='Enter email' value={value} onChange={(event) => setValue(event.target.value)} />

        <div className={styles.groupTitle}>
          <Input
            placeholder='Enter group title'
            status={error && 'error'}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <p>{error}</p>
        </div>

        <div className={styles.selectedUsers}>
          {value ? (
            <List
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={data}
              renderItem={(user) => {
                const { firstName, lastName, email, profile, id } = user;

                if (userMe?.id === id) return null;
                const selected = selectedUsers.find(({ id }) => user.id === id);

                return (
                  <UserItem avatar={profile?.avatar} description={email} title={`${firstName} ${lastName}`}>
                    <Button onClick={() => (selected ? removeUser(user.email) : addUser(user))}>
                      {selected ? 'Remove' : 'Add'}
                    </Button>
                  </UserItem>
                );
              }}
            />
          ) : (
            <>
              <List
                itemLayout='horizontal'
                header={<h4>Selected Users</h4>}
                dataSource={selectedUsers}
                renderItem={({ email, firstName, lastName }) => (
                  <UserItem key={email} title={`${firstName} ${lastName}`} description={email}>
                    <Button onClick={() => removeUser(email)}>remove user</Button>
                  </UserItem>
                )}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
