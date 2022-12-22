import Profile from './index.page';
import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Profile page', () => {
  it('fetches data', async () => {
    renderWithClient(<Profile />);

    const userName = await screen.findByText(/firstName lastName/i);
    expect(userName).toBeInTheDocument();
  });
  it('error fetches data', async () => {
    server.use(rest.get('*/api/auth/status', (req, res, ctx) => res(ctx.status(400))));
    renderWithClient(<Profile />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
