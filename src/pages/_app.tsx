import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';

import { WithProviders } from '@/shared/provider';
import { AppLayout } from '@/widgets/layouts';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/shared/styles/index.scss';
import 'antd/dist/antd.css';

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {

  return (
    <WithProviders>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </WithProviders>
  );
}

export default App;
