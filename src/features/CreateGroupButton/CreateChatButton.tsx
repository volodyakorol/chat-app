import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import { Input, UserList } from '@/components';
import { useCreateGroup, useSearchUsers } from '@/shared/reactQueries';

import s from './styles.module.scss';

export const CreateChatButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const [selectedUsers, setSelectedUsers] = useState<{ label: string; email: string }[]>([]);

  const { createGroup } = useCreateGroup();
  const { data = [], isLoading } = useSearchUsers({ query: value });

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleSubmit = () =>
    selectedUsers.length &&
    createGroup({ users: selectedUsers.map(({ email }) => email), title }, { onSuccess: closeModal });

  return (
    <>
      <Button className={s.createChat} type='primary' onClick={openModal}>
        Create chat
      </Button>
      <Modal data-testid='add-friend-modal' title='Add friend' open={open} onOk={handleSubmit} onCancel={closeModal}>
        <Input placeholder='Enter email' value={value} onChange={(event) => setValue(event.target.value)} />
        <div className={s.groupTitle}>
          <Input placeholder='Enter group title' value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>

        {selectedUsers.map(({ email }) => (
          <p key={email}>{email}</p>
        ))}

        <div className={s.selectedUsers}>
          <UserList
            isLoading={isLoading}
            users={data}
            onSelectUser={({ firstName, lastName, email }) =>
              setSelectedUsers((prev) => [...prev, { label: `${firstName} ${lastName}`, email }])
            }
          />
        </div>

        <div>кроки 1 -2</div>
        <UserList
          isLoading={isLoading}
          users={data}
          onSelectUser={({ firstName, lastName, email }) =>
            setSelectedUsers((prev) => [...prev, { label: `${firstName} ${lastName}`, email }])
          }
        />
      </Modal>
    </>
  );
};
