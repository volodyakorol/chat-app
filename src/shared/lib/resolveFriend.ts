import { TUser } from '@/shared/types';

export const resolveFriend = (sender: TUser, receiver: TUser, myId?: number) => {
  return myId !== sender.id ? sender : receiver;
};
