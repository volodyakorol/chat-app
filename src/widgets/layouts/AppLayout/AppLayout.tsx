import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import s from './styles.module.scss';

import ImageLogo from '~/logo.svg';

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();

  const paths = [
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

  return (
    <div>
      <div className={s.sider}>
        <div className={s.logoWrapper}>
          <ImageLogo className={s.logo} />
        </div>

        <div className={s.menu}>
          {paths.map(({ label, icon, path, activeIcon }) => {
            const active = pathname.startsWith(path);

            return (
              <a key={path} href={path} className={s.menuItem}>
                <div className={clsx(s.menuIcon, { [s.active]: active })}>
                  <FontAwesomeIcon icon={active ? activeIcon : icon} />
                </div>
                <p>{label}</p>
              </a>
            );
          })}
        </div>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
