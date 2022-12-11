import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { config } from '@fortawesome/fontawesome-svg-core';
import { notification } from 'antd';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { authApi } from '@/shared/api';
import { User } from '@/shared/types';
import { AppLayout } from '@/widgets/layouts';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'antd/dist/antd.css';
import 'react-advanced-cropper/dist/style.css';
import '@/shared/styles/index.scss';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
          },
          mutations: {
            onError(error) {
              const mutationError = error as { message?: string };
              notification.error({
                message: 'Error',
                description: mutationError?.message ?? 'Something went wrong',
                placement: 'topRight',
              });
            },
          },
        },
      }),
  );

  const isAuthPage = ['/auth'].includes(router.pathname);

  useEffect(() => {
    async function loadUserFromCookies() {
      try {
        const user = await authApi.getAuthUser();
        if (user) setUser(user);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromCookies();
  }, []);

  if (loading) return <h1>Loading</h1>;

  if (user && isAuthPage) {
    router.push('/chat');
    return null;
  }

  if (!user && !isAuthPage) {
    router.push('/auth');
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        {user ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </Hydrate>
      <ReactQueryDevtools position='top-right' initialIsOpen={true} />
    </QueryClientProvider>
  );
}
