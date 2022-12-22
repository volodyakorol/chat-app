import { rest } from 'msw';

import { userProfileMock } from '@/shared/mock/user';

export const authApiMock = [
  rest.get('*/api/auth/status', (req, res, ctx) => {
    return res(ctx.json(userProfileMock));
  }),
];
