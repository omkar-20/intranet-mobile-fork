import React from 'react';

import Typography from '../../../components/typography';
import Header from '../../../components/header';
import {TIMESHEET_SCREEN} from '../../../constant/screenNames';

type Props = {
  route?: {
    params?: {
      email: string;
      name: string;
    };
  };
};

const TimesheetList = ({route}: Props) => {
  // console.log();
  return (
    <>
      <Header title={TIMESHEET_SCREEN} type="ternary" />
      <Typography>Timesheet list {route?.params?.email}</Typography>
    </>
  );
};

export default TimesheetList;
