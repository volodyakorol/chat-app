import { setupServer } from 'msw/node';

import { authApiMock } from '@/shared/mock/auth';
import { userApiMock } from '@/shared/mock/user';

export const handlers = [...authApiMock, ...userApiMock];
export const server = setupServer(...handlers);
