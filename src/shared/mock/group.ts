import { rest } from 'msw';

import { userMeMock, usersMock } from '@/shared/mock/user';

import { TGroup } from '../types/group.types';

export const groupsMock: TGroup[] = [
  {
    id: 1,
    title: 'hello group',
    createdAt: '2022-12-14T07:09:07.338Z',
    lastMessageSentAt: '2022-12-14T07:09:07.338Z',
    users: usersMock,
    creator: userMeMock,
    owner: userMeMock,
    lastMessageSent: {
      id: 1,
      content: 'content1',
      createdAt: '2022-12-20T18:12:40.031Z',
    },
  },
  {
    id: 2,
    title: 'hello group',
    createdAt: '2022-12-14T07:09:07.338Z',
    lastMessageSentAt: '2022-12-14T07:09:07.338Z',
    users: usersMock,
    creator: userMeMock,
    owner: userMeMock,
    lastMessageSent: {
      id: 2,
      content: 'content2',
      createdAt: '2022-12-20T18:12:40.031Z',
    },
  },
];

export const groupApiMock = [
  rest.get('*/groups*', (req, res, ctx) => {
    return res(ctx.json(groupsMock));
  }),
];
