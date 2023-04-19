import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {PUT_TIMESHEET_ROUTE} from '../../constant/apiRoutes';

export type UpdateTimesheetRequestBody = {
  user: {
    time_sheets_attributes: {
      1: {
        project_id: number;
        date: string;
        duration: string;
        description: string;
        id: string;
      };
    };
  };

  user_id: string;
  current_user: string;
  time_sheet_date: string;
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
