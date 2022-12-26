import { fireEvent, render, screen } from '@testing-library/react';

import { MessageInput } from '@/widgets';

describe('MessageInput', () => {
  it('render', () => {
    render(<MessageInput onSend={jest.fn()} />);

    expect(screen.getByPlaceholderText(/Type something/i)).toBeInTheDocument();
  });

  it('onClick', () => {
    const mockFunc = jest.fn();
    render(<MessageInput onSend={mockFunc} />);

    fireEvent.change(screen.getByPlaceholderText(/Type something/i), { target: { value: 'hello' } });

    fireEvent.click(screen.getByTestId('sent-btn'));

    expect(mockFunc).toBeCalledTimes(1);
  });
});
