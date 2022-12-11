import { useMutation, useQueryClient } from 'react-query';

import { userApi } from '@/shared/api';
import { UpdateUserProfile, User } from '@/shared/types';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['update-user-profile'],
    (data: UpdateUserProfile) => userApi.updateUserProfile(data),
    {
      onMutate: async ({ about, avatar, banner }) => {
        await queryClient.cancelQueries(['get-user-me']);
        const prevData = queryClient.getQueryData(['get-user-me']);

        queryClient.setQueryData<User | undefined>(
          ['get-user-me'],
          (data) =>
            data && {
              ...data,
              profile: {
                id: 0,
                ...data.profile,
                about,
                avatar: avatar && URL.createObjectURL(avatar as Blob),
                banner: banner && URL.createObjectURL(banner as Blob),
              },
            },
        );

        return { prevData };
      },
      onError: (err, _vars, context) => {
        queryClient.setQueryData(['get-user-me'], context?.prevData);
      },
    },
  );

  return {
    updateProfile: mutate,
    ...rest,
  };
};
