import Groups from './index.page';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';
import { groupsMock } from '@/shared/mock/group';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Groups page', () => {
  it('fetches groups', async () => {
    renderWithClient(<Groups />);

    const conversations = await screen.findAllByTestId('conversation');
    expect(conversations.length).toEqual(groupsMock.length);
  });
  it('Select group text if no group selected', async () => {
    renderWithClient(<Groups />);

    expect(screen.getByText(/Select group/i)).toBeInTheDocument();
  });
  it('Able to select group', async () => {
    renderWithClient(<Groups />);

    const conversations = await screen.findAllByTestId('conversation');

    fireEvent.click(conversations[0]);
    expect(await screen.findByPlaceholderText(/Type something/i)).toBeInTheDocument();
  });
});
