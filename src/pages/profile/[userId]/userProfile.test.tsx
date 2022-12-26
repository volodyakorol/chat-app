import UserProfile from './index.page';
import { screen } from '@testing-library/react';

import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('User profile page', () => {
  it('fetches data', async () => {
    renderWithClient(<UserProfile />);

    const userName = await screen.findByRole('heading', { name: /firstName2 lastName2/i });
    expect(userName).toBeInTheDocument();
  });
  it('about', async () => {
    renderWithClient(<UserProfile />);

    expect(await screen.findByText<HTMLInputElement>(/user-about/i)).toBeInTheDocument();
  });
});
