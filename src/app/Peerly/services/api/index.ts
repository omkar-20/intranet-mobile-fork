import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import {PEERLY_LOGIN_ROUTE} from '../../constants/apiRoutes';
import AsyncStore from '../../../services/asyncStorage';
import PeerlyAsyncStore from '../peerlyAsyncStorage';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.PEERLY_API_BASE_URL,
  headers: {
    'Accept-Version': 'application/vnd.peerly.v1',
    'Content-Type': 'application/json',
  },
});

export const apiCall = async <T, D>(config: AxiosRequestConfig<T>) => {
  let authToken: string | null;
  if (config.url?.includes(PEERLY_LOGIN_ROUTE)) {
    authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
    config.headers = {
      'Intranet-Auth': authToken,
    };
  } else {
    authToken = await PeerlyAsyncStore.getItem(
      PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
    );
    const authorizationHeader = authToken;

    if (config.headers) {
      config.headers.Authorization = authorizationHeader;
    } else {
      config.headers = {
        Authorization: authorizationHeader,
      };
    }
  }
  const response = await axiosInstance.request<D>(config);
  return response;
};
