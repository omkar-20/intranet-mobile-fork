import {useQuery} from 'react-query';
import {AxiosError} from 'axios';

import toast from '../../../utils/toast';

import {
  getProfileIcon,
  getTopUsersList,
  getActiveUsersList,
  getAppreciationList,
} from '../../../services/PeerlyServices/home';

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
