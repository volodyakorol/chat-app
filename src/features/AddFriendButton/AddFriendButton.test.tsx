import { fireEvent, screen, waitFor } from '@testing-library/react';

import { AddFriendButton } from '@/features/AddFriendButton/AddFriendButton';
import { renderWithClient } from '@/shared/lib/testing';

describe('AddFriendButton', () => {
  it('render a button', () => {
    renderWithClient(<AddFriendButton />);

    expect(screen.getByText(/add friend/i)).toBeInTheDocument();
  });

  it('should render a modal', async () => {
    renderWithClient(<AddFriendButton />);

    fireEvent.click(screen.getByText('Add friend'));

    await waitFor(() => expect(screen.queryByTestId('add-friend-modal')).toBeInTheDocument());
  });

  it('render a input in modal', async () => {
    renderWithClient(<AddFriendButton />);

    fireEvent.click(screen.getByText('Add friend'));

    const input = await waitFor(() => screen.getByPlaceholderText(/enter email/i));
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(await waitFor(() => screen.getByPlaceholderText(/enter email/i))).toHaveAttribute('value', 'hello');
  });
  it('toMatchSnapshot', () => {
    renderWithClient(<AddFriendButton />);

    expect(screen).toMatchSnapshot();
  });
});
