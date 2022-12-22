import { render, screen } from '@testing-library/react';

import { GoogleAuthButton } from '@/features/GoogleAuthButton/GoogleAuthButton';

describe('GoogleAuthButton', () => {
  it('render a google button', () => {
    render(<GoogleAuthButton />);

    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });
});
