import { rest } from 'msw';

import { userMeMock } from '@/shared/mock/user';

export const authApiMock = [
  rest.get('*/auth/status', (req, res, ctx) => {
    return res(ctx.json(userMeMock));
  }),
  rest.get('*/auth/login', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('*/auth/register', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
