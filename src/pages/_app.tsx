import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';

import { AppLayout } from '@/widgets/layouts';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'antd/dist/antd.css';
import 'react-advanced-cropper/dist/style.css';
import '@/shared/styles/index.scss';

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default App;
