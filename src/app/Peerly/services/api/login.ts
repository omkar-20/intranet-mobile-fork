import {PeerlyLoginResponse} from './types';
import {PEERLY_LOGIN_ROUTE} from '../../constants/apiRoutes';
import {apiCall} from './index';

export const loginPeerly = async () => {
  const response = await apiCall<any, PeerlyLoginResponse>({
    method: 'GET',
    url: PEERLY_LOGIN_ROUTE,
  });
  return response.data;
};
