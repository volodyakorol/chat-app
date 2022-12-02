/* eslint-disable no-console */
import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: ReactElement) {
  const testQueryClient = createTestQueryClient();

  setLogger({
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  });

  return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
}
