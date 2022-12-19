import { MessageType, User } from '@/shared/types';

export type Attachment = {
  id: number;
  file: File;
};

export type ConversationId = {
  conversationId: string | number;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  email: string;
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

export type TCreateMessage = {
  attachments?: File[];
  conversationId: number;
  content: string;
};
