import { UserAvatar } from '@/features';

import s from './styles.module.scss';

export default function Profile() {
  return (
    <div className={s.screen}>
      <div className={s.content}>
        <UserAvatar canEdit={true} src='sdf' />
      </div>
    </div>
  );
}
