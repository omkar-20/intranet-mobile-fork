import {PeerlyLoginResponse} from './types';
import {PEERLY_LOGIN_ROUTE} from '../../../screens/PeerlyScreens/constants/apiRoutes';
import {apiCall} from '../api/index';

export const loginPeerly = async () => {
  const response = await apiCall<any, PeerlyLoginResponse>({
    method: 'GET',
    url: PEERLY_LOGIN_ROUTE,
  });
  return response.data;
};
