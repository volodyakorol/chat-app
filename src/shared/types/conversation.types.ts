import { TMessageType, TUser } from '@/shared/types';

export type TAttachment = {
  id: number;
  file: File;
};

export type TConversationId = {
  conversationId: string | number;
};

export type TConversation = {
  id: number;
  creator: TUser;
  recipient: TUser;
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: TMessageType;
};

export type TCreateConversationParams = {
  email: string;
};

export type TConversationMessage = {
  id: number;
  messages: TMessageType[];
};

export type TConversationType = 'group' | 'private';

export type TConversationTypeData = {
  type: TConversationType;
  label: string;
};
export type TGetMessagesResponse = {
  id: number;
  messages: TMessageType[];
};

export type TDeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

export type TDeleteMessageParams = {
  id: number;
  messageId: number;
};

export type TMessageEventPayload = {
  message: TMessageType;
  conversation: TConversation;
};

export type TCreateMessage = {
  attachments?: File[];
  conversationId: number;
  content: string;
};
