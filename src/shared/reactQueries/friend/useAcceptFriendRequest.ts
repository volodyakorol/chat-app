import { useMutation, useQueryClient } from 'react-query';

import { friendsApi } from '@/shared/api';
import { getFriendsRequestQueryKeys } from '@/shared/reactQueries/friend/keys';
import { TFriendRequest, TIdRequest } from '@/shared/types';

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['accept-friend-request'],
    (data: TIdRequest) => friendsApi.acceptFriendRequest(data),
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(getFriendsRequestQueryKeys);
        const prevData = queryClient.getQueryData(getFriendsRequestQueryKeys);

        queryClient.setQueryData<TFriendRequest[] | undefined>(
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
