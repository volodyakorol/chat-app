import { AppProps } from 'next/app';

import { WithProviders } from '@/shared/provider';

import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <WithProviders>
      <div className='app'>
        <Component {...pageProps} />
      </div>
    </WithProviders>
  );
}

export default App;
