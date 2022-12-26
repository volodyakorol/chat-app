import Auth from './index.page';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithClient } from '@/shared/lib/testing';
import { server } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Auth page', () => {
  it('login form', async () => {
    renderWithClient(<Auth />);

    expect(screen.getByRole('form', { name: 'login' })).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByTestId('pass')).toBeInTheDocument();

    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
  it('register form', async () => {
    renderWithClient(<Auth />);

    fireEvent.click(screen.getByText(/register/i));

    expect(screen.getByRole('form', { name: 'register' })).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();

    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
});
