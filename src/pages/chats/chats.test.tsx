import Chats from './index.page';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';
import { conversationsMock } from '@/shared/mock/conversation';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Chats page', () => {
  it('fetches chats', async () => {
    renderWithClient(<Chats />);

    const conversations = await screen.findAllByTestId('conversation');
    expect(conversations.length).toEqual(conversationsMock.length);
  });
  it('Select chat text if no chat selected', async () => {
    renderWithClient(<Chats />);

    expect(screen.getByText(/Select chat/i)).toBeInTheDocument();
  });
  it('Able to select chat', async () => {
    renderWithClient(<Chats />);

    const conversations = await screen.findAllByTestId('conversation');

    fireEvent.click(conversations[0]);
    expect(await screen.findByPlaceholderText(/Type something/i)).toBeInTheDocument();
  });
});
