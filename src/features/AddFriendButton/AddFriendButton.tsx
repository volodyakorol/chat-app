import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';

import { Input, UserItem } from '@/components';

import s from './styles.module.scss';

export const AddFriendButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectUsers, setSelectUsers] = useState<any>([]);
  const propositionUser = [] as any;

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button onClick={openModal}>Add friend</Button>
      <Modal data-testid='add-friend-modal' open={open} onCancel={closeModal}>
        <div className={s.modalBody}>
          <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder='Enter username' />
          <div className={s.selectedUsers}>
            <List
              itemLayout='horizontal'
              dataSource={value ? propositionUser : selectUsers}
              renderItem={() => (
                <UserItem description='dfsd' title='fgd'>
                  {!!value && <Button>Request</Button>}
                </UserItem>
              )}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
