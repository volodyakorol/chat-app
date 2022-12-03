import { UserItem } from '@/components';
import { AddFriendButton } from '@/features';

import s from './styles.module.scss';

export default function Home() {
  return (
    <div className={s.screen}>
      <div className={s.content}>
        <div>tabs</div>
        <AddFriendButton />
        <div>
          <UserItem description='sdfsdfsd' title='dsfsff'>
            sdf{' '}
          </UserItem>
        </div>
      </div>
    </div>
  );
}
