import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {DELETE_TIMESHEET_ROUTE} from '../../constant/apiRoutes';

export type DeleteTimesheetRequestBody = {
  time_sheet_date: string;
  user_id: string;
  project_id: string;
};

export type DeleteTimesheetResponseBody = {
  message: string;
};

export const deleteTimesheetRequest = async (
  payload: DeleteTimesheetRequestBody,
) => {
  const response = await apiCall<
    DeleteTimesheetRequestBody,
    DeleteTimesheetResponseBody
  >({
    method: 'DELETE',
    url: DELETE_TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<DeleteTimesheetResponseBody>;
};
