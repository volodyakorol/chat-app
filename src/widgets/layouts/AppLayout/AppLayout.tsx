import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './styles.module.scss';
import ImageLogo from '~/logo.svg';

const tabs = [
  {
    label: 'Chat',
    path: '/chat',
    icon: regularIcons.faComment,
    activeIcon: solidIcons.faComment,
  },
  {
    label: 'Friends',
    path: '/friends',
    icon: solidIcons.faUserGroup,
    activeIcon: solidIcons.faUserGroup,
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: regularIcons.faUser,
    activeIcon: solidIcons.faUser,
  },
];

export const AppLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  // const isAuth = 'sdf';
  // const isAuthPage = ['/auth'].includes(router.pathname);

  // if (isAuth && isAuthPage) {
  //   router.push('/chat');
  // }

  // if (!isAuth && !isAuthPage) {
  //   router.push('/auth');
  // }

  // if (isAuthPage) return <>{children}</>;

  return (
    <div>
      <div className={s.sider}>
        <div className={s.logoWrapper}>
          <ImageLogo className={s.logo} />
        </div>

        <div className={s.menu}>
          {tabs.map(({ label, icon, path, activeIcon }) => {
            const active = router.pathname.startsWith(path);

            return (
              <Link key={path} href={path}>
                <a className={s.menuItem}>
                  <div className={clsx(s.menuIcon, { [s.active]: active })}>
                    <FontAwesomeIcon icon={active ? activeIcon : icon} />
                  </div>
                  <p>{label}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
