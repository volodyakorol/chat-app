import { useCreateConversation, useGetFriends } from '@/shared/reactQueries';
import React, { useState } from 'react';
import { Button, Input, List, Modal } from 'antd';

import { UserItem } from '@/components';

import s from './styles.module.scss';

export const CreateChatButton = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const { createConversation } = useCreateConversation();
  const { data = [], isLoading } = useGetFriends();

  const filteredFriends = data.filter(({ friend }) => friend.email.includes(email));

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleSubmit = (email: string) => createConversation({ email }, { onSuccess: closeModal });

  return (
    <>
      <Button className={s.createChat} type='primary' onClick={openModal}>
        Create chat
      </Button>
      <Modal
        title='Add friend'
        data-testid='add-friend-modal'
        open={open}
        onCancel={closeModal}
        okButtonProps={{ disabled: true }}
      >
        <Input placeholder='Enter message' value={email} onChange={(event) => setEmail(event.target.value)} />
        <List
          className={s.list}
          itemLayout='horizontal'
          loading={isLoading}
          dataSource={filteredFriends}
          renderItem={({ id, friend }) => {
            const { firstName, lastName, email, profile } = friend;

            return (
              <UserItem key={id} title={`${firstName} ${lastName}`} description={email} avatar={profile?.avatar}>
                <Button type='primary' onClick={() => handleSubmit(email)}>
                  Send Message
                </Button>
              </UserItem>
            );
          }}
        />
      </Modal>
    </>
  );
};
