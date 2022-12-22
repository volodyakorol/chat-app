import { useMutation, useQueryClient } from 'react-query';

import { userApi } from '@/shared/api';
import { TUpdateUserProfile, TUser } from '@/shared/types';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ['update-user-profile'],
    (data: TUpdateUserProfile) => userApi.updateUserProfile(data),
    {
      onMutate: async ({ about, avatar, banner }) => {
        await queryClient.cancelQueries(['get-user-me']);
        const prevData = queryClient.getQueryData(['get-user-me']);

        queryClient.setQueryData<TUser | undefined>(
          ['get-user-me'],
          (data) =>
            data && {
              ...data,
              profile: {
                id: 0,
                ...data.profile,
                about,
                avatar: avatar ? URL.createObjectURL(avatar as Blob) : data.profile?.avatar,
                banner: banner ? URL.createObjectURL(banner as Blob) : data.profile?.banner,
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
