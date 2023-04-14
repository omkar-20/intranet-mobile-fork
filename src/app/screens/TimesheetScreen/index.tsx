import React, {useCallback, useState} from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';
import FloatingActionButton from '../../components/button/floatingActionButton';
import CreateTimesheet from './view/createTimesheet';

const TimesheetScreen = () => {
  const isManager = true;

  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setShouldShowModal(v => !v);
  }, []);

  return (
    <>
      {isManager ? <EmployeeList /> : <TimesheetList />}

      <FloatingActionButton onPress={toggleModal} />

      <CreateTimesheet toggleModal={toggleModal} isVisible={shouldShowModal} />
    </>
  );
};

export default TimesheetScreen;
