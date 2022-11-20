import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AddFriendButton } from '@/features/AddFriendButton/AddFriendButton';

describe('add friend button', () => {
  it('render a button', () => {
    render(<AddFriendButton />);

    const button = screen.getByText(/Add friend/i);

    expect(button).toBeInTheDocument();
  });

  it('should render a modal', async () => {
    const { getByText } = render(<AddFriendButton />);

    fireEvent.click(getByText('Add friend'));

    await waitFor(() => expect(screen.queryByTestId('add-friend-modal')).toBeInTheDocument());
  });
});
