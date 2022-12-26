import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CreateChatButton } from '@/features';
import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CreateChatButton', () => {
  it('render a button', () => {
    renderWithClient(<CreateChatButton />);

    expect(screen.getByText(/Create chat/i)).toBeInTheDocument();
  });

  it('should render a modal', async () => {
    renderWithClient(<CreateChatButton />);

    fireEvent.click(screen.getByText(/Create chat/i));

    await waitFor(() => expect(screen.queryByTestId('add-friend-modal')).toBeInTheDocument());
  });

  it('render a email input in modal', async () => {
    renderWithClient(<CreateChatButton />);

    fireEvent.click(screen.getByText(/Create chat/i));

    const input = await waitFor(() => screen.getByPlaceholderText(/enter email/i));
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'userEmail' } });

    expect(await waitFor(() => screen.getByPlaceholderText(/enter email/i))).toHaveAttribute('value', 'userEmail');
  });

  it('render users', async () => {
    renderWithClient(<CreateChatButton />);

    fireEvent.click(screen.getByText(/Create chat/i));

    const input = await waitFor(() => screen.getByPlaceholderText(/enter email/i));

    fireEvent.change(input, { target: { value: 'email2@gmail.com' } });

    expect(await screen.findByText('email2@gmail.com')).toBeInTheDocument();
  });
  it('toMatchSnapshot', () => {
    renderWithClient(<CreateChatButton />);

    expect(screen).toMatchSnapshot();
  });
});
