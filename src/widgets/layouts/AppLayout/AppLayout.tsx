import { useAuthUser } from '@/shared/reactQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { authApi } from '@/shared/api';

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

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['get-auth-user'], authApi.getAuthUser);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const AppLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isLoading, isSuccess } = useAuthUser();
  const isAuthPage = ['/auth'].includes(router.pathname);

  if (isLoading) {
    return <h1>LOADING ...</h1>;
  }

  if (!isSuccess && !isAuthPage) {
    router.push('/auth');
  }

  if (isSuccess && isAuthPage) {
    router.push('/chat');
  }

  if (isAuthPage) return <>{children}</>;

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
