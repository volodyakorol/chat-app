import { dehydrate, QueryClient } from 'react-query';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { UserAvatar } from '@/features';
import { userApi } from '@/shared/api';
import { useGetUser, useUpdateUserProfile } from '@/shared/reactQueries';

import styles from '../styles.module.scss';

export async function getStaticPaths() {
  const userIds = await userApi.getUserIds();

  const paths = userIds.map((id) => ({
    params: { userId: String(id) },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  const USER_ID = Number(userId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['get-user', USER_ID], () => userApi.getById({ userId: USER_ID }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 30,
  };
};

export default function Profile() {
  const { query } = useRouter();

  const { data } = useGetUser({ userId: Number(query.userId) });
  const { updateProfile } = useUpdateUserProfile();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <h1>
          {data?.firstName} {data?.lastName}
        </h1>
        <UserAvatar src={data?.profile?.avatar} onAvatarChange={(avatar) => updateProfile({ avatar })} />
        <div data-testid="about" className={styles.textareaWrapper}>{data?.profile?.about}</div>
      </div>
    </div>
  );
}
