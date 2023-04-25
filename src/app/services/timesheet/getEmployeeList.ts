import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {GET_EMPLOYEE_LIST_ROUTE} from '../../constant/apiRoutes';
import {Employee} from '../../screens/TimesheetScreen/interface';

export type GetEmployeeListRequestBody = {
  from_date: string;
  to_date: string;
  // user_name_initials: string;
};

export type GetEmployeeListResponseBody = {
  status: string;
  code: number;
  message: string;
  data: Employee[];
};

export const getEmployeeListRequest = async (
  payload: GetEmployeeListRequestBody,
) => {
  const response = await apiCall<
    GetEmployeeListRequestBody,
    GetEmployeeListResponseBody
  >({
    method: 'GET',
    url: GET_EMPLOYEE_LIST_ROUTE,
    params: payload,
  });

  return response as AxiosResponse<GetEmployeeListResponseBody>;
};
