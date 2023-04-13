import React from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';

const TimesheetScreen = () => {
  const isManager = true;

  return <>{isManager ? <EmployeeList /> : <TimesheetList />}</>;
};

export default TimesheetScreen;
