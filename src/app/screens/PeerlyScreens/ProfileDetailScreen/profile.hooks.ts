import {useQuery} from 'react-query';
import {AxiosError} from 'axios';
import {APIError} from '../types';
import toast from '../../../utils/toast';

import {getProfileDetails} from '../../../services/PeerlyServices/profileDetail';

export function useGetProfileDetails(userId?: number) {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: userId ? ['profile_icon', userId] : ['profile_icon'],
    queryFn: getProfileDetails,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching profile details', 'error');
      }
    },
  });
  return {data: data?.data, isLoading, isFetching, isSuccess, isError};
}
