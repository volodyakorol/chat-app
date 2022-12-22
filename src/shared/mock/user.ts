import { rest } from 'msw';

export const userProfileMock = {
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
  presence: null,
  peer: {
    id: 'peerId',
  },
};

export const usersMock = [
  {
    id: 1,
    email: 'email1@gmail.com',
    firstName: 'firstName1',
    lastName: 'lastName1',
    profile: {
      id: 1,
      about: 'user-about',
      avatar: 'avatar',
      banner: 'banner',
    },
    presence: null,
    peer: {
      id: 'peerId',
    },
  },
  {
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
    presence: null,
    peer: {
      id: 'peerId',
    },
  },
];

export const userApiMock = [
  // rest.patch('*/users', async (req, res, ctx) => {
  //   const { username } = await req.json();
  //   userProfileMock.firstName = 'hello';
  // }),
  rest.get('*/users/id', (req, res, ctx) => {
    return res(ctx.json(userProfileMock));
  }),
  rest.get('*/users/search', (req, res, ctx) => {
    return res(ctx.json(userProfileMock));
  }),
];
