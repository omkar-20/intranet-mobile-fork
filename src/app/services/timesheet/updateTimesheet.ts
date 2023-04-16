import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {PUT_TIMESHEET_ROUTE} from '../../constant/apiRoutes';

export type UpdateTimesheetRequestBody = {
  date: Date;
  project_name: string;
  Project_id: number;
  description: string;
  Work_in_hours: number;
};

export type UpdateTimesheetResponseBody = {
  message: string;
};

export const updateTimesheetRequest = async (
  payload: UpdateTimesheetRequestBody,
) => {
  const response = await apiCall<
    UpdateTimesheetRequestBody,
    UpdateTimesheetResponseBody
  >({
    method: 'PUT',
    url: PUT_TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<UpdateTimesheetResponseBody>;
};
