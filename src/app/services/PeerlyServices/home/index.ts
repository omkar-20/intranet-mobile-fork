import {
  GET_ACTIVE_USERS_ROUTE,
  GET_APPRECIATION_LIST_ROUTE,
  GET_TOP_USERS_ROUTE,
  PROFILE_DETAILS_ROUTE,
} from '../../../constant/apiRoutes';
import {apiCall} from '../index';
import {
  GetActiveOrTopUsersListResponse,
  GetAppreciationListResponse,
  GetAppreciationListRequest,
  GetProfileDetailsResponse,
} from './types';

export const getProfileDetails = async () => {
  const response = await apiCall<any, GetProfileDetailsResponse>({
    method: 'GET',
    url: PROFILE_DETAILS_ROUTE,
  });
  return response.data;
};

export const getTopUsersList = async () => {
  const response = await apiCall<any, GetActiveOrTopUsersListResponse>({
    method: 'GET',
    url: GET_TOP_USERS_ROUTE,
  });
  return response.data;
};

export const getActiveUsersList = async () => {
  const response = await apiCall<any, GetActiveOrTopUsersListResponse>({
    method: 'GET',
    url: GET_ACTIVE_USERS_ROUTE,
  });
  return response.data;
};

export const getAppreciationList = async (
  payload: GetAppreciationListRequest,
) => {
  const response = await apiCall<
    GetAppreciationListRequest,
    GetAppreciationListResponse
  >({
    method: 'GET',
    url: GET_APPRECIATION_LIST_ROUTE,
    params: payload,
  });
  return response.data;
};
