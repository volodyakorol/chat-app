import { useEffect, useState } from 'react';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Head from 'next/head';

import { UserAvatar } from '@/features';
import { useGetUserMe, useUpdateUserProfile } from '@/shared/reactQueries';

import styles from './styles.module.scss';

export default function MyProfile() {
  const [about, setAbout] = useState('');

  const { data, isError } = useGetUserMe();
  const { updateProfile } = useUpdateUserProfile();

  useEffect(() => {
    if (data?.profile?.about) setAbout(data?.profile?.about);
  }, [data?.profile?.about]);

  if (isError) return <p>error</p>;

  return (
    <div className={styles.screen}>
      <Head>
        <title>User profile</title>
      </Head>
      <div className={styles.content}>
        <h1 data-testid='username'>
          {data?.firstName} {data?.lastName}
        </h1>
        <UserAvatar canEdit={true} src={data?.profile?.avatar} onAvatarChange={(avatar) => updateProfile({ avatar })} />
        <div className={styles.textareaWrapper}>
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
