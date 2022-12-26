import { rest } from 'msw';

import { userMeMock, userProfileMock } from '@/shared/mock/user';
import { TFriend } from '@/shared/types';

export const friendMock: TFriend = {
  id: 1,
  createdAt: '2022-12-24T09:21:50.372Z',
  friend: {
    id: 1,
    email: 'email@gmail.com',
    firstName: 'firstName',
    lastName: 'lastName',
    profile: {
      id: 1,
      about: 'user-about',
      avatar: 'avatar',
      banner: 'banner',
    },
    peer: {
      id: 'peerId',
    },
  },
};

export const friendsMock: TFriend[] = [
  {
    id: 1,
    createdAt: '2022-12-24T09:21:50.372Z',
    friend: {
      id: 1,
      email: 'email@gmail.com',
      firstName: 'firstName',
      lastName: 'lastName',
      profile: {
        id: 1,
        about: 'user-about',
        avatar: 'avatar',
        banner: 'banner',
      },
      peer: {
        id: 'peerId',
      },
    },
  },
  {
    id: 2,
    createdAt: '2022-12-24T09:21:50.372Z',
    friend: {
      id: 2,
      email: 'email2@gmail.com',
      firstName: 'firstName2',
      lastName: 'lastName2',
      profile: {
        id: 2,
        about: 'user-about',
        avatar: 'avatar',
        banner: 'banner',
      },
      peer: {
        id: 'peerId',
      },
    },
  },
];

export const requestsMock = [
  {
    id: 4,
    createdAt: '2022-12-16T07:29:38.486Z',
    status: 'pending',
    receiver: userMeMock,
    sender: userProfileMock,
  },
];

export const friendApiMock = [
  rest.get('*/friends', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(friendsMock));
  }),
  rest.get('*/friends/requests', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(requestsMock));
  }),
];
