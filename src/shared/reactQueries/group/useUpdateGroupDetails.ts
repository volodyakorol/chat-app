import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { UpdateGroupDetailsPayload } from '@/shared/types';

export const useUpdateGroupDetails = () => {
  const { mutate, ...rest } = useMutation(['update-group-details'], (data: UpdateGroupDetailsPayload) =>
    groupApi.updateGroupDetails(data),
  );

  return {
    updateDetails: mutate,
    ...rest,
  };
};
