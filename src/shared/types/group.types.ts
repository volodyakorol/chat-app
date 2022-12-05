import { Conversation, User } from '@/shared/types';

export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
  attachments?: MessageAttachment[];
};

export type GroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  group: Group;
  attachments?: MessageAttachment[];
};

export type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: GroupMessageType[];
  createdAt: number;
  lastMessageSent: MessageType;
  lastMessageSentAt: Date;
  avatar?: string;
};

export type FetchGroupMessagePayload = {
  id: number;
  messages: GroupMessageType[];
};

export type CreateMessageParams = {
  id: number;
  content: string;
};

export type DeleteGroupMessageParams = {
  id: number;
  messageId: number;
};

export type DeleteGroupMessageResponse = {
  groupId: number;
  messageId: number;
};

export type EditMessagePayload = {
  id: number;
  messageId: number;
  content: string;
};
export type MessageAttachment = {
  key: string;
};



export type CreateGroupParams = {
  users: string[];
  title: string;
};

export type AddGroupRecipientParams = {
  id: number;
  email: string;
};

export type RemoveGroupRecipientParams = {
  id: number;
  userId: number;
};

export type UpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};

export type UpdateGroupDetailsPayload = {
  id: number;
  data: FormData;
};

export type GroupMessage = {
  id: number;
  messages: GroupMessageType[];
};

export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};
export enum UpdateGroupAction {
  NEW_MESSAGE = 'newMessage',
}

export type UpdateGroupPayload = {
  type?: UpdateGroupAction;
  group: Group;
};

export type GroupParticipantLeftPayload = {
  group: Group;
  userId: number;
};
