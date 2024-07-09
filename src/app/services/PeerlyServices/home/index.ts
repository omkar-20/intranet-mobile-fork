import {
  GET_ACTIVE_USERS_ROUTE,
  GET_APPRECIATION_LIST_ROUTE,
  GET_TOP_USERS_ROUTE,
  PROFILE_ICON_ROUTE,
} from '../../../constant/apiRoutes';
import {apiCall} from '../../api';
import {
  GetActiveUsersListResponse,
  GetAppreciationListResponse,
  GetProfileIconResponse,
  GetTopUsersListResponse,
} from './types';

export const getProfileIcon = async () => {
  const response = await apiCall<any, GetProfileIconResponse>({
    method: 'GET',
    url: PROFILE_ICON_ROUTE,
  });
  return response;
};

export const getTopUsersList = async () => {
  const response = await apiCall<any, GetTopUsersListResponse>({
    method: 'GET',
    url: GET_TOP_USERS_ROUTE,
  });
  return response;
};

export const getActiveUsersList = async () => {
  const response = await apiCall<any, GetActiveUsersListResponse>({
    method: 'GET',
    url: GET_ACTIVE_USERS_ROUTE,
  });
  return response;
};

export const getAppreciationList = async () => {
  const response = await apiCall<any, GetAppreciationListResponse>({
    method: 'GET',
    url: GET_APPRECIATION_LIST_ROUTE,
  });
  return response;
};
