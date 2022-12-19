import { TAttachment, TConversation, TUser } from '@/shared/types';

export type TGroupId = {
  groupId: number | string;
};

export type TMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: TUser;
  conversation: TConversation;
  attachments?: TMessageAttachment[];
};

export type TGroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: TUser;
  group: TGroup;
  attachments?: TMessageAttachment[];
};

export type TGroup = {
  id: number;
  title?: string;
  users: TUser[];
  creator: TUser;
  owner: TUser;
  messages: TGroupMessageType[];
  createdAt: number;
  lastMessageSent: TMessageType;
  lastMessageSentAt: string;
  avatar?: string;
};

export type TFetchGroupMessagePayload = {
  id: number;
  messages: TGroupMessageType[];
};

export type TCreateMessageParams = {
  id: number;
  content: string;
};

export type TDeleteGroupMessageParams = {
  id: number;
  messageId: number;
};

export type TDeleteGroupMessageResponse = {
  groupId: number;
  messageId: number;
};

export type TEditMessagePayload = {
  id: number;
  messageId: number;
  content: string;
};
export type TMessageAttachment = {
  key: string;
  fileType: string;
  originalname: string;
};

export type TCreateGroupParams = {
  users: string[];
  title: string;
};

export type TAddGroupRecipientParams = {
  id: number;
  email: string;
};

export type TRemoveGroupRecipientParams = {
  id: number;
  userId: number;
};

export type TUpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};

export type TUpdateGroupDetailsPayload = {
  id: number;
  data: FormData;
};

export type TGroupMessage = {
  id: number;
  messages: TGroupMessageType[];
};

export type TGroupMessageEventPayload = {
  message: TGroupMessageType;
  group: TGroup;
};

export type GroupParticipantLeftPayload = {
  group: TGroup;
  userId: number;
};

export type TCreateGroupMessage = {
  attachments?: TAttachment[];
  groupId: number;
  content: string;
};
