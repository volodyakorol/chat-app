import { fireEvent, screen, waitFor } from '@testing-library/react';

import { AddFriendButton } from '@/features/AddFriendButton/AddFriendButton';
import { renderWithClient } from '@/shared/lib/testing';

describe('add friend button', () => {
  it('render a button', () => {
    renderWithClient(<AddFriendButton />);

    expect(screen.getByText(/add friend/i)).toBeInTheDocument();
  });

  it('should render a modal', async () => {
    renderWithClient(<AddFriendButton />);

    fireEvent.click(screen.getByText('Add friend'));

    await waitFor(() => expect(screen.queryByTestId('add-friend-modal')).toBeInTheDocument());
  });
});
