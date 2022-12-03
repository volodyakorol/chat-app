import { getFriendsRequestQueryKeys } from '@/shared/reactQueries/friend/keys';
import { useMutation, useQueryClient } from 'react-query';

import { friendsApi } from '@/shared/api';
import { FriendRequest, TIdRequest } from '@/shared/types';

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
