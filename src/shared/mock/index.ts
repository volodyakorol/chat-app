import { setupServer } from 'msw/node';

import { authApiMock } from '@/shared/mock/auth';
import { conversationApiMock } from '@/shared/mock/conversation';
import { friendApiMock } from '@/shared/mock/friend';
import { groupApiMock } from '@/shared/mock/group';
import { userApiMock } from '@/shared/mock/user';

export const handlers = [...authApiMock, ...userApiMock, ...friendApiMock, ...groupApiMock, ...conversationApiMock];
export const server = setupServer(...handlers);
export * from './auth';
export * from './friend';
export * from './user';
