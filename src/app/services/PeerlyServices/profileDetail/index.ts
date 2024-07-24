import {PROFILE_DETAILS_ROUTE} from '../../../constant/apiRoutes';
import {apiCall} from '../index';
import {GetProfileDetailsResponse} from './types';

export const getProfileDetails = async () => {
  const response = await apiCall<any, GetProfileDetailsResponse>({
    method: 'GET',
    url: PROFILE_DETAILS_ROUTE,
  });
  return response.data;
};
