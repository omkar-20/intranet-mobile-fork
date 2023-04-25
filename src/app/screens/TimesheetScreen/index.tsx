import React, {useContext} from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';
import UserContext from '../../context/user.context';

const TimesheetScreen = () => {
  const [userContextData] = useContext(UserContext);

  return userContextData?.userData.role === 'Manager' ? (
    <EmployeeList />
  ) : (
    <TimesheetList />
  );
};

export default TimesheetScreen;
