import { useMutation } from 'react-query';

import { groupApi } from '@/shared/api';
import { TUpdateGroupDetailsPayload } from '@/shared/types';

export const useUpdateGroupDetails = () => {
  const { mutate, ...rest } = useMutation(['update-group-details'], (data: TUpdateGroupDetailsPayload) =>
    groupApi.updateGroupDetails(data),
  );

  return {
    updateDetails: mutate,
    ...rest,
  };
};
