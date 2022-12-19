import { User } from '@/shared/types';

export const resolveFriend = (sender: User, receiver: User, myId?: number) => {
  return myId !== sender.id ? sender : receiver;
};
