import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { config } from '@fortawesome/fontawesome-svg-core';
import { notification } from 'antd';
import type { AppProps } from 'next/app';

import { AppLayout } from '@/widgets/layouts';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-advanced-cropper/dist/style.css';
import '@/shared/styles/index.scss';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Hydrate>
      <ReactQueryDevtools position='top-right' initialIsOpen={true} />
    </QueryClientProvider>
  );
}
