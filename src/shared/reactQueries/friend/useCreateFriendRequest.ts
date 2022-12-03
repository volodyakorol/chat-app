import { getFriendsRequestQueryKeys } from '@/shared/reactQueries/friend/keys';
import { useMutation, useQueryClient } from 'react-query';

import { friendsApi } from '@/shared/api';
import { TEmailRequest } from '@/shared/types';

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
