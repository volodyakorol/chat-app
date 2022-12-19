import { Socket } from 'socket.io-client';

import {
  Conversation,
  ConversationId,
  DeleteMessageResponse,
  Friend,
  FriendRequest,
  Group,
  GroupMessageEventPayload,
  MessageEventPayload,
  TGroupId,
} from '@/shared/types';

export type TSocketEmitTypes = {
  getOnlineFriends: () => void;
  getOnlineGroupUsers: () => void;
  onConversationJoin: (payload: ConversationId) => void;
  onConversationLeave: (payload: ConversationId) => void;
  onTypingStop: (payload: ConversationId) => void;
  onTypingStart: (payload: ConversationId) => void;
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
  onMessage: (data: MessageEventPayload) => void;
  onConversation: (data: Conversation) => void;
  onMessageDelete: (data: DeleteMessageResponse) => void;
  getOnlineFriends: (data: Friend[]) => void;
  onGroupMessage: (data: GroupMessageEventPayload) => void;
  onGroupCreate: (data: Group) => void;
  onFriendRequestReceived: (data: FriendRequest) => void;
};
