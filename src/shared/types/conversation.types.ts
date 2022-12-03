import { MessageType, User } from '@/shared/types';

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

export type ConversationType = 'group' | 'private';

export type ConversationTypeData = {
  type: ConversationType;
  label: string;
};
export type GetMessagesResponse = {
  id: number;
  messages: MessageType[];
};

export type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

export type DeleteMessageParams = {
  id: number;
  messageId: number;
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: Conversation;
};
