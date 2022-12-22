/* eslint-disable no-console */
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { render } from '@testing-library/react';

export function renderWithClient(ui: ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  setLogger({
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  });

  return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
}
