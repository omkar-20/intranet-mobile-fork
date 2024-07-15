import {useMutation, useQuery} from 'react-query';
import {
  getCoreValuesList,
  getCoworkerList,
  postAppreciationRequest,
} from '../../../services/PeerlyServices/appreciation';
import {
  PostAppreciationRequestBody,
  GetCoworkersListRequest,
  UserDetails,
  CoreValue,
} from '../../../services/PeerlyServices/appreciation/types';
import toast from '../../../utils/toast';
import {AxiosError} from 'axios';
import {APIError} from './types';

export function useGetCoworkerList(payload: GetCoworkersListRequest) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['coworker_list'],
    queryFn: () => getCoworkerList(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching co-workers list', 'error');
      }
    },
  });

  let coworkerList = data?.data?.user_list?.map((item: UserDetails) => {
    return {
      label: `${item.first_name} ${item.last_name}`,
      value: item.id,
    };
  });

  return {data: coworkerList || [], isLoading, isError};
}

export function useGetCoreValuesList() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['profile_core_values'],
    queryFn: getCoreValuesList,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching core values', 'error');
      }
    },
  });

  let coreKeyValueList = data?.data?.map((item: CoreValue) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return {
    data: data?.data || [],
    coreKeyValueList: coreKeyValueList || [],
    isLoading,
    isError,
  };
}

export function usePostAppreciation() {
  const {mutate, isLoading, isSuccess, isError, reset} = useMutation({
    mutationKey: ['post_appreciation'],
    mutationFn: (payload: PostAppreciationRequestBody) =>
      postAppreciationRequest(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving appreciation', 'error');
      }
    },
  });
  return {mutate, isLoading, isSuccess, isError, reset};
}
