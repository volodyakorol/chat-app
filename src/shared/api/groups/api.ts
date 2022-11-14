import { api } from '@/shared/api';
import { ConversationType } from '@/shared/api';

import {
  AddGroupRecipientParams,
  CreateGroupParams,
  CreateMessageParams,
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  EditMessagePayload,
  FetchGroupMessagePayload,
  Group,
  GroupMessageType,
  RemoveGroupRecipientParams,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from './types';

export const createGroupMessage = (id: string, type: ConversationType, data: FormData) => {
  return api.post(`/groups/${id}/messages`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchGroups = () => api.get<Group[]>('/groups');

export const fetchGroupById = (id: number) => api.get<Group>(`/groups/${id}`);

export const fetchGroupMessages = (id: number) => api.get<FetchGroupMessagePayload>(`/groups/${id}/messages`);

export const postGroupMessage = ({ id, content }: CreateMessageParams) =>
  api.post(`/groups/${id}/messages`, { content });

export const createGroup = (params: CreateGroupParams) => api.post('/groups', params);

export const deleteGroupMessage = ({ id, messageId }: DeleteGroupMessageParams) =>
  api.delete<DeleteGroupMessageResponse>(`/groups/${id}/messages/${messageId}`);

export const editGroupMessage = ({ content, id, messageId }: EditMessagePayload) =>
  api.patch<GroupMessageType>(`/groups/${id}/messages/${messageId}`, { content });

export const addGroupRecipient = ({ id, username }: AddGroupRecipientParams) =>
  api.post(`/groups/${id}/recipients`, { username });

export const removeGroupRecipient = ({ id, userId }: RemoveGroupRecipientParams) =>
  api.delete<Group>(`/groups/${id}/recipients/${userId}`);

export const updateGroupOwner = ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
  api.patch(`/groups/${id}/owner`, { newOwnerId });

export const leaveGroup = (id: number) => api.delete(`/groups/${id}/recipients/leave`);

export const updateGroupDetails = ({ id, data }: UpdateGroupDetailsPayload) =>
  api.patch<Group>(`/groups/${id}/details`, data);
