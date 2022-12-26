import { rest } from 'msw';

import { userMeMock, userProfileMock } from '@/shared/mock/user';
import { TConversation } from '@/shared/types';

const conversationMock: TConversation = {
  creator: userProfileMock,
  recipient: userMeMock,
  id: 1,
  createdAt: '2022-12-24T09:21:50.372Z',
  lastMessageSentAt: '2022-12-24T09:21:50.372Z',
  lastMessageSent: null,
};

export const conversationsMock = [
  {
    id: 1,
    createdAt: '2022-12-08T18:39:34.555Z',
    lastMessageSentAt: '2022-12-20T18:18:42.555Z',
    lastMessageSent: {
      id: 1,
      content: 'message',
      createdAt: '2022-12-20T18:18:42.541Z',
    },
    creator: userProfileMock,
    recipient: userMeMock,
  },
];

export const conversationApiMock = [
  rest.get('*/conversations', (req, res, ctx) => {
    return res(ctx.json(conversationsMock));
  }),
  rest.get('*/conversations/*', (req, res, ctx) => {
    return res(ctx.json(conversationMock));
  }),
];
