import { api } from '@/shared/api';
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
  TCreateGroupMessage,
  TIdRequest,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from '@/shared/types';

export const groupApi = {
  getGroups: () => api.get<Group[]>('/groups').then((res) => res.data),

  getGroupById: ({ id }: TIdRequest) => api.get<Group>(`/groups/${id}`).then((res) => res.data),

  getGroupMessages: ({ id }: TIdRequest) =>
    api.get<FetchGroupMessagePayload>(`/groups/${id}/messages`).then((res) => res.data),

  postGroupMessage: ({ id, content }: CreateMessageParams) =>
    api.post(`/groups/${id}/messages`, { content }).then((res) => res.data),

  createGroup: (params: CreateGroupParams) => api.post('/groups', params).then((res) => res.data),

  deleteGroupMessage: ({ id, messageId }: DeleteGroupMessageParams) =>
    api.delete<DeleteGroupMessageResponse>(`/groups/${id}/messages/${messageId}`).then((res) => res.data),

  editGroupMessage: ({ content, id, messageId }: EditMessagePayload) =>
    api.patch<GroupMessageType>(`/groups/${id}/messages/${messageId}`, { content }).then((res) => res.data),

  addGroupRecipient: ({ id, email }: AddGroupRecipientParams) =>
    api.post(`/groups/${id}/recipients`, { email }).then((res) => res.data),

  removeGroupRecipient: ({ id, userId }: RemoveGroupRecipientParams) =>
    api.delete<Group>(`/groups/${id}/recipients/${userId}`).then((res) => res.data),

  updateGroupOwner: ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
    api.patch(`/groups/${id}/owner`, { newOwnerId }).then((res) => res.data),

  leaveGroup: ({ id }: TIdRequest) => api.delete(`/groups/${id}/recipients/leave`).then((res) => res.data),

  updateGroupDetails: ({ id, data }: UpdateGroupDetailsPayload) =>
    api.patch<Group>(`/groups/${id}/details`, data).then((res) => res.data),

  createGroupMessage: ({ attachments, groupId, content }: TCreateGroupMessage) => {
    const formData = new FormData();
    formData.append('id', String(groupId));
    formData.append('content', content);
    attachments && attachments.forEach((attachment) => formData.append('attachments', attachment.file));

    return api
      .post(`/groups/${groupId}/messages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
};
