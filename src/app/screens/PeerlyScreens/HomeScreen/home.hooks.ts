import {useMutation, useQuery, useQueryClient} from 'react-query';
import {AxiosError} from 'axios';

import {loginPeerlySystemRequest} from '../../../services/PeerlyServices';
import toast from '../../../utils/toast';
import {PeerlyError} from '../../../services/PeerlyServices/types';
import {
  getProfileIcon,
  getTopUsersList,
  getActiveUsersList,
  getAppreciationList,
} from '../../../services/PeerlyServices/home/home';

export const loginPeerlySystem = () => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: any) => loginPeerlySystemRequest(),
    {
      onSuccess: (successData, variables) => {
        toast(successData.data.message);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as PeerlyError;
        //toast(error.message || 'Failed to delete timesheet.', 'error');
      },
    },
  );

  return {mutate, isLoading};
};

export function useGetProfileIcon() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['profile_icon'],
    queryFn: getProfileIcon,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}

export function useGetTopUsersList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['top_users_list'],
    queryFn: getTopUsersList,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}

export function useGetActiveUsersList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['active_user_list'],
    queryFn: getActiveUsersList,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}

export function useGetAppreciationList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['appreciation_list'],
    queryFn: getAppreciationList,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}
