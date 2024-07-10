import {
  GET_CORE_VALUES,
  GET_COWORKER_LIST,
  POST_APPRECIATION_ROUTE,
} from '../../../constant/apiRoutes';
import {apiCall} from '../index';
import {
  GetCoworkersListRequest,
  GetCoworkersListResponse,
  GetCoreValuesResponse,
  PostAppreciationRequestBody,
  PostAppreciationResponse,
} from './types';

export const getCoworkerList = async () => {
  const response = await apiCall<
    GetCoworkersListRequest,
    GetCoworkersListResponse
  >({
    method: 'GET',
    url: GET_COWORKER_LIST,
  });
  return response;
};

export const getCoreValuesList = async () => {
  const response = await apiCall<any, GetCoreValuesResponse>({
    method: 'GET',
    url: GET_CORE_VALUES,
  });
  console.log('INSIDE SERVICE', response);
  return response;
};

export const postAppreciationRequest = async (
  payload: PostAppreciationRequestBody,
) => {
  const response = await apiCall<
    PostAppreciationRequestBody,
    PostAppreciationResponse
  >({
    method: 'POST',
    url: POST_APPRECIATION_ROUTE,
    data: payload,
  });
  return response;
};
