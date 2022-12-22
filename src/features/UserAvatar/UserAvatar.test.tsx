import { fireEvent, screen, waitFor } from '@testing-library/react';

import { UserAvatar } from '@/features/UserAvatar/UserAvatar';
import { SDN_URL } from '@/shared/constant';
import { renderWithClient } from '@/shared/lib/testing';

describe('UserAvatar', () => {
  it('render a button', () => {
    renderWithClient(<UserAvatar />);

    expect(screen.getByTestId(/avatar/i)).toBeInTheDocument();
  });

  it('should render a cropper modal', async () => {
    renderWithClient(<UserAvatar canEdit={true} />);

    fireEvent.click(screen.getByTestId(/avatar/i));

    await waitFor(() => expect(screen.queryByTestId('image-cropper')).toBeInTheDocument());
  });

  it('should not render a cropper modal', async () => {
    renderWithClient(<UserAvatar canEdit={false} />);

    fireEvent.click(screen.getByTestId(/avatar/i));

    await waitFor(() => expect(screen.queryByTestId('image-cropper')).not.toBeInTheDocument());
  });

  it('should avatar src start with SDN_URL', async () => {
    renderWithClient(<UserAvatar src='' />);

    expect(screen.getByRole('img')).toHaveAttribute('src', SDN_URL);
  });

  it('should show url image', async () => {
    renderWithClient(<UserAvatar src='https://image' />);

    screen.debug();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://image');
  });
});
