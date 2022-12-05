import { useGetUserMe, useUpdateUserProfile } from '@/shared/reactQueries';
import TextArea from 'antd/lib/input/TextArea';

import { UserAvatar } from '@/features';

import s from './styles.module.scss';

export default function Profile() {
  const { data } = useGetUserMe();
  const { updateProfile } = useUpdateUserProfile();

  return (
    <div className={s.screen}>
      <div className={s.content}>
        <UserAvatar canEdit={true} src={data?.profile?.avatar} onAvatarChange={(avatar) => updateProfile({ avatar })} />
        <div className={s.textareaWrapper}>
          <TextArea rows={4} showCount placeholder='About' maxLength={60} />
        </div>
      </div>
    </div>
  );
}
