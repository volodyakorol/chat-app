import { AxiosRequestConfig } from 'axios';

import { api } from '@/shared/api';
import { TCreateMessage, TEditMessagePayload, TMessageType } from '@/shared/types';

import { TCreateConversationParams, TDeleteMessageParams, TDeleteMessageResponse } from '../types/conversation.types';

export const conversationsApi = {
  getConversations: (options: AxiosRequestConfig) => api.get('/conversations', options).then((res) => res.data),
  getConversationById: (id: number) => api.get(`/conversations/${id}`).then((res) => res.data),
  // checkConversationOrCreate: (recipientId: number) =>
  //   api.get<Conversation>(`/exists/conversations/${recipientId}`).then((res) => res.data),

  getConversationMessages: (conversationId: number) =>
    api.get(`/conversations/${conversationId}/messages`).then((res) => res.data),

  createMessage: ({ attachments, conversationId, content }: TCreateMessage) => {
    const formData = new FormData();
    formData.append('id', String(conversationId));
    formData.append('content', content);

    attachments && attachments.forEach((attachment) => formData.append('attachments', attachment));

    return api
      .post(`/conversations/${conversationId}/messages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },

  createNewConversation: (data: TCreateConversationParams) => api.post('/conversations', data).then((res) => res.data),

  editMessage: ({ content, id, messageId }: TEditMessagePayload) =>
    api.patch<TMessageType>(`/conversations/${id}/messages/${messageId}`, { content }).then((res) => res.data),

  deleteMessage: ({ id, messageId }: TDeleteMessageParams) =>
    api.delete<TDeleteMessageResponse>(`/conversations/${id}/messages/${messageId}`).then((res) => res.data),
};
