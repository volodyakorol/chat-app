import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CreateGroupButton } from '@/features/CreateGroupButton/CreateGroupButton';
import { renderWithClient } from '@/shared/lib/testing';

describe('CreateGroupButton', () => {
  it('render a button', () => {
    renderWithClient(<CreateGroupButton />);

    expect(screen.getByText(/Create group/i)).toBeInTheDocument();
  });

  it('should render a modal', async () => {
    renderWithClient(<CreateGroupButton />);

    fireEvent.click(screen.getByText(/Create group/i));

    await waitFor(() => expect(screen.queryByTestId('create-group-modal')).toBeInTheDocument());
  });

  it('render a search input in modal', async () => {
    renderWithClient(<CreateGroupButton />);

    fireEvent.click(screen.getByText(/Create group/i));

    const input = await waitFor(() => screen.getByPlaceholderText(/enter email/i));
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'userEmail' } });

    expect(await waitFor(() => screen.getByPlaceholderText(/enter email/i))).toHaveAttribute('value', 'userEmail');
  });

  it('render a group title input in modal', async () => {
    renderWithClient(<CreateGroupButton />);

    fireEvent.click(screen.getByText(/Create group/i));

    const input = await waitFor(() => screen.getByPlaceholderText(/Enter group title/i));
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'title' } });

    expect(await waitFor(() => screen.getByPlaceholderText(/Enter group title/i))).toHaveAttribute('value', 'title');
  });

  it('error if not have group title', async () => {
    renderWithClient(<CreateGroupButton />);

    fireEvent.click(screen.getByText(/Create group/i));

    const submitButton = await waitFor(() => screen.getByRole('button', { name: /ok/i }));
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(await waitFor(() => screen.getByTestId('error').textContent)).toMatch(/enter Group title/i);
  });

  it('error if not select users', async () => {
    renderWithClient(<CreateGroupButton />);

    fireEvent.click(screen.getByText(/Create group/i));

    const submitButton = await waitFor(() => screen.getByRole('button', { name: /ok/i }));
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(await waitFor(() => screen.getByTestId('error').textContent)).toMatch(/please enter Group title/i);
  });
  it('toMatchSnapshot', () => {
    renderWithClient(<CreateGroupButton />);

    expect(screen).toMatchSnapshot();
  });
});
