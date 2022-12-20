import { TUser } from '@/shared/types';

export type TFriendRequestStatus = 'accepted' | 'pending' | 'rejected';
export type THandleFriendRequestAction = 'accept' | 'reject' | 'cancel';

export type TFriend = {
  id: number;
  friend: TUser;
  createdAt: string;
};

export type TFriendRequest = {
  id: number;
  sender: TUser;
  receiver: TUser;
  createdAt: number;
  status: TFriendRequestStatus;
};

export type TCancelFriendRequestResponse = {
  id: number;
};

export type AcceptFriendRequestResponse = {
  friend: TFriend;
  friendRequest: TFriendRequest;
};
