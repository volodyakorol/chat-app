import Friends from './index.page';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithClient } from '@/shared/lib/testing';
import { friendsMock, requestsMock, server } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Friends page', () => {
  it('fetches friends', async () => {
    renderWithClient(<Friends />);

    const conversations = await screen.findAllByTestId('friend-user-item');
    expect(conversations.length).toEqual(friendsMock.length);
  });
  it('fetches request', async () => {
    renderWithClient(<Friends />);

    fireEvent.click(screen.getByText(/Request/i));

    const requests = await screen.findAllByTestId('request-user-item');
    expect(requests.length).toEqual(requestsMock.length);
  });
  it('Able to accept or reject invite', async () => {
    renderWithClient(<Friends />);

    fireEvent.click(screen.getByText(/Request/i));

    expect(await screen.findByText(/accept/i)).toBeInTheDocument();
    expect(await screen.findByText(/reject/i)).toBeInTheDocument();
  });
});
