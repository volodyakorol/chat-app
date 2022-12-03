import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

import { friendsApi } from '@/shared/api';
import { Friend, FriendRequest, TEmailRequest, TIdRequest } from '@/shared/types';

const getFriendsQueryKeys = ['get-friends'];
const getFriendsRequestQueryKeys = ['get-friends-requests'];

export const useGetFriends = <T = Friend[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(getFriendsQueryKeys, friendsApi.getFriends, options);

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(['remove-friend'], (data: TIdRequest) => friendsApi.removeFriend(data), {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(getFriendsQueryKeys);
      const prevData = queryClient.getQueryData(getFriendsQueryKeys);

      queryClient.setQueryData<Friend[] | undefined>(
        getFriendsQueryKeys,
        (data) => data && data.filter((friend) => friend.id !== id),
      );

      return { prevData };
    },
    onError: (err, _vars, context) => {
      queryClient.setQueryData(getFriendsQueryKeys, context?.prevData);
    },
  });

  return {
    removeFriend: mutate,
    ...rest,
  };
};

export const useGetFriendsRequests = <T = FriendRequest[]>(options?: UseQueryOptions<T, AxiosError, T>) =>
  useQuery<T, AxiosError, T>(getFriendsRequestQueryKeys, friendsApi.getFriendRequests, options);

export const useCreateFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['create-friend-request'],
    (data: TEmailRequest) => friendsApi.createFriendRequest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFriendsRequestQueryKeys);
      },
    },
  );

  return {
    requestFriend: mutate,
    ...rest,
  };
};

export const useCancelFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['cancel-friend-request'],
    (data: TIdRequest) => friendsApi.cancelFriendRequest(data),
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(getFriendsRequestQueryKeys);
        const prevData = queryClient.getQueryData(getFriendsRequestQueryKeys);

        queryClient.setQueryData<FriendRequest[] | undefined>(
          getFriendsRequestQueryKeys,
          (data) => data && data.filter((request) => request.id !== id),
        );

        return { prevData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(getFriendsRequestQueryKeys);
      },
      onError: (err, _vars, context) => {
        queryClient.setQueryData(getFriendsRequestQueryKeys, context?.prevData);
      },
    },
  );

  return {
    cancelRequest: mutate,
    ...rest,
  };
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['accept-friend-request'],
    (data: TIdRequest) => friendsApi.acceptFriendRequest(data),
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(getFriendsRequestQueryKeys);
        const prevData = queryClient.getQueryData(getFriendsRequestQueryKeys);

        queryClient.setQueryData<FriendRequest[] | undefined>(
          getFriendsRequestQueryKeys,
          (data) => data && data.filter((request) => request.id !== id),
        );

        return { prevData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(getFriendsRequestQueryKeys);
      },
      onError: (err, _vars, context) => {
        queryClient.setQueryData(getFriendsRequestQueryKeys, context?.prevData);
      },
    },
  );

  return {
    acceptRequest: mutate,
    ...rest,
  };
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['reject-friend-request'],
    (data: TIdRequest) => friendsApi.rejectFriendRequest(data),
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(getFriendsRequestQueryKeys);
        const prevData = queryClient.getQueryData(getFriendsRequestQueryKeys);

        queryClient.setQueryData<FriendRequest[] | undefined>(
          getFriendsRequestQueryKeys,
          (data) => data && data.filter((request) => request.id !== id),
        );

        return { prevData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(getFriendsRequestQueryKeys);
      },
      onError: (err, _vars, context) => {
        queryClient.setQueryData(getFriendsRequestQueryKeys, context?.prevData);
      },
    },
  );

  return {
    rejectRequest: mutate,
    ...rest,
  };
};
