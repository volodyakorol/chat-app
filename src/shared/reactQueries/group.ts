import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { groupApi } from '@/shared/api';
import {
  AddGroupRecipientParams,
  CreateGroupParams,
  DeleteGroupMessageParams,
  EditMessagePayload,
  FetchGroupMessagePayload,
  Group,
  RemoveGroupRecipientParams,
  TIdRequest,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from '@/shared/types';

export const useGetGroups = <T = Group[]>(options?: UseQueryOptions<Group[], AxiosError, T>) =>
  useQuery<Group[], AxiosError, T>(['get-groups'], groupApi.getGroups, options);

export const useGetGroup = <T = FetchGroupMessagePayload>(
  data: TIdRequest,
  options?: UseQueryOptions<FetchGroupMessagePayload, AxiosError, T>,
) =>
  useQuery<FetchGroupMessagePayload, AxiosError, T>(
    ['get-group', JSON.stringify(data)],
    () => groupApi.getGroupMessages(data),
    options,
  );

export const useGetGroupMessages = <T = Group[]>(options?: UseQueryOptions<Group[], AxiosError, T>) =>
  useQuery<Group[], AxiosError, T>(['get-groups'], groupApi.getGroups, options);

export const useCreateGroup = () => {
  const { mutate, ...rest } = useMutation(['create-group'], (data: CreateGroupParams) => groupApi.createGroup(data));

  return {
    createGroup: mutate,
    ...rest,
  };
};

export const useDeleteGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['delete-group-message'], (data: DeleteGroupMessageParams) =>
    groupApi.deleteGroupMessage(data),
  );

  return {
    deleteMessage: mutate,
    ...rest,
  };
};

export const useEditGroupMessage = () => {
  const { mutate, ...rest } = useMutation(['edit-group-message'], (data: EditMessagePayload) =>
    groupApi.editGroupMessage(data),
  );

  return {
    editMessage: mutate,
    ...rest,
  };
};

export const useAddGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['add-recipient'], (data: AddGroupRecipientParams) =>
    groupApi.addGroupRecipient(data),
  );

  return {
    addRecipient: mutate,
    ...rest,
  };
};

export const useRemoveGroupRecipient = () => {
  const { mutate, ...rest } = useMutation(['remove-recipient'], (data: RemoveGroupRecipientParams) =>
    groupApi.removeGroupRecipient(data),
  );

  return {
    removeRecipient: mutate,
    ...rest,
  };
};

export const useUpdateGroupOwner = () => {
  const { mutate, ...rest } = useMutation(['update-group-owner'], (data: UpdateGroupOwnerParams) =>
    groupApi.updateGroupOwner(data),
  );

  return {
    updateOwner: mutate,
    ...rest,
  };
};

export const useLeaveGroup = () => {
  const { mutate, ...rest } = useMutation(['leave-group'], (data: TIdRequest) => groupApi.leaveGroup(data));

  return {
    leave: mutate,
    ...rest,
  };
};

export const useUpdateGroupDetails = () => {
  const { mutate, ...rest } = useMutation(['update-group-details'], (data: UpdateGroupDetailsPayload) =>
    groupApi.updateGroupDetails(data),
  );

  return {
    updateDetails: mutate,
    ...rest,
  };
};
