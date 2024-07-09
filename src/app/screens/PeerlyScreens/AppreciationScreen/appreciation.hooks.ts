import {useMutation} from 'react-query';
import {postAppreciationRequest} from '../../../services/PeerlyServices/appreciation';
import {PostAppreciationRequestBody} from '../../../services/PeerlyServices/appreciation/types';

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
