import {useQuery} from 'react-query';
import {loginPeerly} from '../services/api/login';
import {AxiosError} from 'axios';
import {APIError} from '../types';
import toast from '../../utils/toast';
import {PeerlyLoginResponse} from '../services/api/types';
import PeerlyAsyncStore from '../services/peerlyAsyncStorage';

export function useLoginPeerly() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['peerly_login'],
    queryFn: loginPeerly,

    onSuccess: async (response: PeerlyLoginResponse) => {
      await PeerlyAsyncStore.setItem(
        PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
        response.data.AuthToken,
      );
    },
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong, Please try after sometime', 'error');
      }
    },
    refetchOnMount: true,
  });
  return {data, isLoading, isFetching, isSuccess, isError};
}
