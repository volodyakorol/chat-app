import { Socket } from 'socket.io-client';

import {
  TConversation,
  TConversationId,
  TDeleteMessageResponse,
  TFriend,
  TFriendRequest,
  TGroup,
  TGroupId,
  TGroupMessageEventPayload,
  TMessageEventPayload,
} from '@/shared/types';

export type TSocketEmitTypes = {
  getOnlineFriends: () => void;
  getOnlineGroupUsers: () => void;
  onConversationJoin: (payload: TConversationId) => void;
  onConversationLeave: (payload: TConversationId) => void;
  onTypingStop: (payload: TConversationId) => void;
  onTypingStart: (payload: TConversationId) => void;
  onGroupJoin: (payload: TGroupId) => void;
  onGroupLeave: (payload: TGroupId) => void;
};

export type TSocketOnTypes = {
  connect: () => void;
  connect_error: (err: Error) => void;
  disconnect: (
    reason: Socket.DisconnectReason,
    description?:
      | {
          description: string;
        }
      | Error,
  ) => void;
  onTypingStart: () => void;
  onTypingStop: () => void;
  userLeave: () => void;
  userJoin: () => void;
  onMessage: (data: TMessageEventPayload) => void;
  onConversation: (data: TConversation) => void;
  onMessageDelete: (data: TDeleteMessageResponse) => void;
  getOnlineFriends: (data: TFriend[]) => void;
  onGroupMessage: (data: TGroupMessageEventPayload) => void;
  onGroupCreate: (data: TGroup) => void;
  onFriendRequestReceived: (data: TFriendRequest) => void;
};
