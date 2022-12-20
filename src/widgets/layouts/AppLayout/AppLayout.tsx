import { PropsWithChildren } from 'react';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useInitialSocket } from '@/shared/hook/useInitialSocket';
import { useGetUserMe, useLogout } from '@/shared/reactQueries';

import styles from './styles.module.scss';
import ImageLogo from '~/logo.svg';

export const AppLayout = ({ children }: PropsWithChildren) => {
  useInitialSocket();
  const router = useRouter();
  const { logout } = useLogout();

  const isAuthPage = ['/auth'].includes(router.pathname);

  const { data, isLoading } = useGetUserMe();

  if (isLoading) return <h1>Loading</h1>;

  if (data && isAuthPage) {
    router.push('/chats');
    return null;
  }

  if (!data && !isAuthPage) {
    router.push('/auth');
    return null;
  }

  if (!data) return <>{children}</>;

  const tabs = [
    {
      label: 'Chats',
      path: '/chats',
      icon: regularIcons.faComment,
      activeIcon: solidIcons.faComment,
    },
    {
      label: 'Groups',
      path: '/groups',
      icon: regularIcons.faObjectGroup,
      activeIcon: solidIcons.faObjectGroup,
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

  return (
    <div>
      <div className={styles.sider}>
        <div className={styles.logoWrapper}>
          <ImageLogo className={styles.logo} />
        </div>

        <div className={styles.menu}>
          {tabs.map(({ label, icon, path, activeIcon }) => {
            const active = router.pathname.startsWith(path);

            return (
              <Link key={path} href={path}>
                <a className={styles.menuItem}>
                  <div className={clsx(styles.menuIcon, { [styles.active]: active })}>
                    <FontAwesomeIcon icon={active ? activeIcon : icon} />
                  </div>
                  <p>{label}</p>
                </a>
              </Link>
            );
          })}

          <div className={styles.menuItem} onClick={() => logout()}>
            <div className={styles.menuIcon}>
              <FontAwesomeIcon icon={solidIcons.faRightFromBracket} />
            </div>
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
