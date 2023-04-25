import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {GET_TIMESHEET_ROUTE} from '../../constant/apiRoutes';
import {Timesheet} from '../../screens/TimesheetScreen/interface';

export type SectionListType = {
  title: string;
  data: Timesheet[];
};

type TimesheetType = {
  projects: number;
  total_work: string;
  leaves: number;
  data: SectionListType[];
};
export type GetTimesheetRequestBody = {
  user_id: string;
  from_date: string;
  // page_number: number;
  to_date: string;
};

export type GetTimesheetResponseBody = {
  message: string;
  code: number;
  data: TimesheetType[];
};

export const getTimesheetRequest = async (payload: GetTimesheetRequestBody) => {
  const response = await apiCall<
    GetTimesheetRequestBody,
    GetTimesheetResponseBody
  >({
    method: 'GET',
    url: GET_TIMESHEET_ROUTE,
    params: payload,
  });

  return response as AxiosResponse<GetTimesheetResponseBody>;
};
