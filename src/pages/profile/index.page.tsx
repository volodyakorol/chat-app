import { useGetUserMe, useUpdateUserProfile } from '@/shared/reactQueries';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { UserAvatar } from '@/features';

import s from './styles.module.scss';

export default function Profile() {
  const [about, setAbout] = useState('');

  const { data } = useGetUserMe();
  const { updateProfile } = useUpdateUserProfile();

  useEffect(() => {
    setAbout(data?.profile?.about ?? '');
  }, [data?.profile?.about]);

  return (
    <div className={s.screen}>
      <div className={s.content}>
        <UserAvatar canEdit={true} src={data?.profile?.avatar} onAvatarChange={(avatar) => updateProfile({ avatar })} />
        <div className={s.textareaWrapper}>
          <TextArea
            value={about}
            rows={4}
            showCount
            placeholder='About'
            maxLength={60}
            onChange={(event) => setAbout(event.target.value)}
          />
          <Button onClick={() => updateProfile({ about })}>Save</Button>
        </div>
      </div>
    </div>
  );
}
