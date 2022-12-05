import { useCreateFriendRequest, useSearchUsers } from '@/shared/reactQueries';
import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';

import { Input, UserItem } from '@/components';

import s from './styles.module.scss';

export const AddFriendButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const { requestFriend } = useCreateFriendRequest();
  const { data = [], isLoading } = useSearchUsers({ query: value });

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button onClick={openModal}>Add friend</Button>
      <Modal
        data-testid='add-friend-modal'
        title='Add friend'
        open={open}
        okButtonProps={{ hidden: true }}
        onCancel={closeModal}
      >
        <Input placeholder='Enter email' value={value} onChange={(event) => setValue(event.target.value)} />
        <div className={s.selectedUsers}>
          <List
            itemLayout='horizontal'
            loading={isLoading}
            dataSource={data}
            renderItem={({ firstName, lastName, email, profile }) => (
              <UserItem avatar={profile?.avatar} description={email} title={`${firstName} ${lastName}`}>
                <Button onClick={() => requestFriend({ email: email })}>Request</Button>
              </UserItem>
            )}
          />
        </div>
      </Modal>
    </>
  );
};
