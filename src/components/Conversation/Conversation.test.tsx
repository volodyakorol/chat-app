import { render, screen } from '@testing-library/react';

import { Conversation } from '@/components';

describe('Conversation', () => {
  it('render a Conversation', () => {
    render(<Conversation description='description' title='title' time='12:00' />);

    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/12:00/i)).toBeInTheDocument();
  });

  it('should be active', () => {
    render(<Conversation description='description' title='title' time='12:00' isActive />);

    expect(screen.getByTestId('conversation')).toBeInTheDocument();
    expect(screen.getByTestId('conversation')).toHaveClass('active');
  });

  it('should be not active', () => {
    render(<Conversation description='description' title='title' time='12:00' />);

    expect(screen.getByTestId('conversation')).toBeInTheDocument();
    expect(screen.getByTestId('conversation')).not.toHaveClass('active');
  });
  it('toMatchSnapshot', () => {
    render(<Conversation description='description' title='title' time='12:00' />);

    expect(screen).toMatchSnapshot();
  });
});
