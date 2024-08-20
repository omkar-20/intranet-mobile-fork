import {PeerlyLoginResponse} from './types';
import {PEERLY_LOGIN_ROUTE} from '../../constants/apiRoutes';
import {apiCall} from './index';
import getNotificationToken from '../firebase/notification';

export const loginPeerly = async () => {
  const notificationToken = await getNotificationToken();
  const response = await apiCall<any, PeerlyLoginResponse>({
    method: 'GET',
    url: `${PEERLY_LOGIN_ROUTE}?notification_token=${notificationToken}`,
  });
  return response.data;
};
