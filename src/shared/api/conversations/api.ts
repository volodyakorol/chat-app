import { api } from '@/shared/api';
import { EditMessagePayload, MessageType } from '@/shared/api';

import {
  Conversation,
  ConversationType,
  CreateConversationParams,
  DeleteMessageParams,
  DeleteMessageResponse,
  FetchMessagePayload,
} from './types';

export const getConversations = () => api.get<Conversation[]>('/conversations');

export const getConversationById = (id: number) => api.get<Conversation>(`/conversations/${id}`);

export const getConversationMessages = (conversationId: number) =>
  api.get<FetchMessagePayload>(`/conversations/${conversationId}/messages`);

export const createMessage = (id: string, type: ConversationType, data: FormData) => {
  return api.post(`/conversations/${id}/messages`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const postNewConversation = (data: CreateConversationParams) => api.post<Conversation>('/conversations', data);

export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
  api.delete<DeleteMessageResponse>(`/conversations/${id}/messages/${messageId}`);

export const editMessage = ({ content, id, messageId }: EditMessagePayload) =>
  api.patch<MessageType>(`/conversations/${id}/messages/${messageId}`, { content });

export const checkConversationOrCreate = (recipientId: number) =>
  api.get<Conversation>(`/exists/conversations/${recipientId}`);
