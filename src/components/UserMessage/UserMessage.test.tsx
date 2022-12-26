import { render, screen } from '@testing-library/react';

import { UserMessage } from '@/components';

describe('UserMessage', () => {
  it('render a UserMessage', () => {
    render(<UserMessage message='message' time='' />);

    expect(screen.getByText(/message/i)).toBeInTheDocument();
  });

  it('render a attachments', () => {
    render(<UserMessage message='message' time='' attachments={[{ fileType: 'image/jpeg', key: '', originalname: 'files' }]} />);

    expect(screen.getByTestId('image-file')).toBeInTheDocument();
  });
  it('toMatchSnapshot', () => {
    render(<UserMessage message='message' time='' attachments={[{ fileType: 'image/jpeg', key: '', originalname: 'files' }]} />);

    expect(screen).toMatchSnapshot();
  });
});
