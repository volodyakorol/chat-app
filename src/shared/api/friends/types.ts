import { User } from "@/shared/api/users";

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';
export type HandleFriendRequestAction = 'accept' | 'reject' | 'cancel';

export type Friend = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
};

export type FriendRequest = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
  status: FriendRequestStatus;
};

export type CancelFriendRequestResponse = {
  id: number;
};

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};
