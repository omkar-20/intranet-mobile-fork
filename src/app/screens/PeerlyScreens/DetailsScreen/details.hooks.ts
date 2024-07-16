import {useMutation} from 'react-query';
import {
  postReward,
  postObjection,
} from '../../../services/PeerlyServices/appreciationDetails';
import toast from '../../../utils/toast';
import {AxiosError} from 'axios';
import {APIError} from '../types';
import {
  PostObjectionRequest,
  PostRewardRequest,
} from '../../../services/PeerlyServices/appreciationDetails/types';

export function usePostReward() {
  const {mutate, data, isLoading, isSuccess, isError, reset} = useMutation({
    mutationKey: ['post_reward'],
    mutationFn: (payload: PostRewardRequest) => postReward(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving reward', 'error');
      }
    },
  });

  return {mutate, data, isLoading, isSuccess, isError, reset};
}

export function usePostObjection(payload: PostObjectionRequest) {
  const {mutate, data, isLoading, isError} = useMutation({
    mutationKey: ['post_objection'],
    mutationFn: () => postObjection(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving objection', 'error');
      }
    },
  });
  return {mutate, data, isLoading, isError};
}
