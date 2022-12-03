import { getFriendsQueryKeys } from '@/shared/reactQueries/friend/keys';
import { useMutation, useQueryClient } from 'react-query';

import { friendsApi } from '@/shared/api';
import { Friend, TIdRequest } from '@/shared/types';

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
