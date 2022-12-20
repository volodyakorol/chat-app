import { api } from '@/shared/api';
import {
  TAddGroupRecipientParams,
  TCreateGroupMessage,
  TCreateGroupParams,
  TCreateMessageParams,
  TDeleteGroupMessageParams,
  TDeleteGroupMessageResponse,
  TEditMessagePayload,
  TFetchGroupMessagePayload,
  TGroup,
  TGroupMessageType,
  TIdRequest,
  TRemoveGroupRecipientParams,
  TUpdateGroupDetailsPayload,
  TUpdateGroupOwnerParams,
} from '@/shared/types';

export const groupApi = {
  getGroups: () => api.get<TGroup[]>('/groups').then((res) => res.data),

  getGroupById: ({ id }: TIdRequest) => api.get<TGroup>(`/groups/${id}`).then((res) => res.data),

  getGroupMessages: ({ id }: TIdRequest) =>
    api.get<TFetchGroupMessagePayload>(`/groups/${id}/messages`).then((res) => res.data),

  postGroupMessage: ({ id, content }: TCreateMessageParams) =>
    api.post(`/groups/${id}/messages`, { content }).then((res) => res.data),

  createGroup: (params: TCreateGroupParams) => api.post('/groups', params).then((res) => res.data),

  deleteGroupMessage: ({ id, messageId }: TDeleteGroupMessageParams) =>
    api.delete<TDeleteGroupMessageResponse>(`/groups/${id}/messages/${messageId}`).then((res) => res.data),

  editGroupMessage: ({ content, id, messageId }: TEditMessagePayload) =>
    api.patch<TGroupMessageType>(`/groups/${id}/messages/${messageId}`, { content }).then((res) => res.data),

  addGroupRecipient: ({ id, email }: TAddGroupRecipientParams) =>
    api.post(`/groups/${id}/recipients`, { email }).then((res) => res.data),

  removeGroupRecipient: ({ id, userId }: TRemoveGroupRecipientParams) =>
    api.delete<TGroup>(`/groups/${id}/recipients/${userId}`).then((res) => res.data),

  updateGroupOwner: ({ id, newOwnerId }: TUpdateGroupOwnerParams) =>
    api.patch(`/groups/${id}/owner`, { newOwnerId }).then((res) => res.data),

  leaveGroup: ({ id }: TIdRequest) => api.delete(`/groups/${id}/recipients/leave`).then((res) => res.data),

  updateGroupDetails: ({ id, data }: TUpdateGroupDetailsPayload) =>
    api.patch<TGroup>(`/groups/${id}/details`, data).then((res) => res.data),

  createGroupMessage: ({ attachments, groupId, content }: TCreateGroupMessage) => {
    const formData = new FormData();
    formData.append('id', String(groupId));
    formData.append('content', content);
    attachments && attachments.forEach((attachment) => formData.append('attachments', attachment));

    return api
      .post(`/groups/${groupId}/messages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
};
