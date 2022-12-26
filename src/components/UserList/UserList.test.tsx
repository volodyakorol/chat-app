import { fireEvent, screen } from '@testing-library/react';

import { UserList } from '@/components';
import { renderWithClient } from '@/shared/lib/testing';
import { server, usersMock } from '@/shared/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList', () => {
  it('render a UserList', () => {
    renderWithClient(<UserList users={usersMock} withMe />);

    expect(screen.getAllByTestId('user-item').length).toBe(usersMock.length);
  });

  it('render a UserList possibility to click on user', async () => {
    const mockFunc = jest.fn();
    renderWithClient(<UserList users={usersMock} onSelectUser={mockFunc} />);

    fireEvent.click(screen.getAllByTestId('user-item')[0]);

    expect(mockFunc).toBeCalledTimes(1);
  });
  it('toMatchSnapshot', () => {
    renderWithClient(<UserList users={usersMock} withMe />);

    expect(screen).toMatchSnapshot();
  });
});
