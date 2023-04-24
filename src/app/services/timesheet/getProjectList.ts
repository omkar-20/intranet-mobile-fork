import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {GET_PROJECT_LIST_ROUTE} from '../../constant/apiRoutes';

export type GetProjectListRequestBody = {
  user_id: string;
};

export type GetProjectListResponseBody = {
  data: {
    label: string;
    value: string;
  }[];
};

export const getProjectListRequest = async (
  payload: GetProjectListRequestBody,
) => {
  const response = await apiCall<
    GetProjectListRequestBody,
    GetProjectListResponseBody
  >({
    method: 'GET',
    url: GET_PROJECT_LIST_ROUTE,
    params: payload,
  });

  return response as AxiosResponse<GetProjectListResponseBody>;
};
