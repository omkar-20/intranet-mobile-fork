import {
  GET_ACTIVE_USERS_ROUTE,
  GET_APPRECIATION_LIST_ROUTE,
  GET_TOP_USERS_ROUTE,
  PROFILE_DETAILS_ROUTE,
} from '../../../constant/apiRoutes';
import {apiCall} from '../index';
import {
  GetActiveUsersListResponse,
  GetAppreciationListResponse,
  GetProfileDetailsResponse,
  GetTopUsersListResponse,
} from './types';

export const getProfileDetails = async () => {
  const response = await apiCall<any, GetProfileDetailsResponse>({
    method: 'GET',
    url: PROFILE_DETAILS_ROUTE,
  });
  return response.data;
};

export const getTopUsersList = async () => {
  const response = await apiCall<any, GetTopUsersListResponse>({
    method: 'GET',
    url: GET_TOP_USERS_ROUTE,
  });
  return response.data;
};

export const getActiveUsersList = async () => {
  const response = await apiCall<any, GetActiveUsersListResponse>({
    method: 'GET',
    url: GET_ACTIVE_USERS_ROUTE,
  });
  return response.data;
};

export const getAppreciationList = async () => {
  const response = await apiCall<any, GetAppreciationListResponse>({
    method: 'GET',
    url: GET_APPRECIATION_LIST_ROUTE,
  });
  return response.data;
};
