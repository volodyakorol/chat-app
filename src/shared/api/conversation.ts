import { api } from '@/shared/api';
import { EditMessagePayload, MessageType } from '@/shared/types';

import { CreateConversationParams, DeleteMessageParams, DeleteMessageResponse } from '../types/conversation.types';

export const conversationsApi = {
  getConversations: () => api.get('/conversations').then((res) => res.data),
  getConversationById: (id: number) => api.get(`/conversations/${id}`).then((res) => res.data),
  // checkConversationOrCreate: (recipientId: number) =>
  //   api.get<Conversation>(`/exists/conversations/${recipientId}`).then((res) => res.data),

  getConversationMessages: (conversationId: number) =>
    api.get(`/conversations/${conversationId}/messages`).then((res) => res.data),

  // createMessage: (id: string, data: FormData) =>
  //   api
  //     .post(`/conversations/${id}/messages`, data, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     })
  //     .then((res) => res.data),

  createNewConversation: (data: CreateConversationParams) => api.post('/conversations', data).then((res) => res.data),

  editMessage: ({ content, id, messageId }: EditMessagePayload) =>
    api.patch<MessageType>(`/conversations/${id}/messages/${messageId}`, { content }).then((res) => res.data),

  deleteMessage: ({ id, messageId }: DeleteMessageParams) =>
    api.delete<DeleteMessageResponse>(`/conversations/${id}/messages/${messageId}`).then((res) => res.data),
};
