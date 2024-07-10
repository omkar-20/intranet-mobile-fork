import {useMutation, useQuery} from 'react-query';
import {
  getCoreValuesList,
  getCoworkerList,
  postAppreciationRequest,
} from '../../../services/PeerlyServices/appreciation';
import {PostAppreciationRequestBody} from '../../../services/PeerlyServices/appreciation/types';

export function useGetCoworkerList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['profile_icon'],
    queryFn: getCoworkerList,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}

export function useGetCoreValuesList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['profile_icon'],
    queryFn: getCoreValuesList,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}

export function usePostAppreciation() {
  const {mutate, isLoading, isSuccess, isError, data, reset} = useMutation({
    mutationFn: (payload: PostAppreciationRequestBody) =>
      postAppreciationRequest(payload),
    onSuccess: res => {
      console.log('Success', res);
    },
    onError: err => {
      console.log('Error', err);
    },
  });
  return {mutate, isLoading, isSuccess, isError, data, reset};
}
