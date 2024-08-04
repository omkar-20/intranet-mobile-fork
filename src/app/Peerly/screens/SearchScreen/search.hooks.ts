import {AxiosError} from 'axios';
import {getAppreciationList} from '../../services/home';
import {GetAppreciationListRequest} from '../../services/home/types';
import {APIError} from '../../types';
import {useQuery} from 'react-query';
import toast from '../../../utils/toast';

export function useGetSearchAppreciationList(
  payload: GetAppreciationListRequest,
) {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['Search_appriciation_list', payload.name],
    enabled: !!payload.name,
    queryFn: () => getAppreciationList(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching appreciation list', 'error');
      }
    },
  });
  return {
    data: data?.data.appreciations || [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
