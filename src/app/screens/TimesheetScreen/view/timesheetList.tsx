import React, {Fragment, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import DateRange from '../../../components/pickers/dateRange';
import SectionListTimesheet from '../component/sectionListTimesheet';
import EditTimesheetModal from '../component/editTimesheetModal';
import EmployeeCard from '../component/employeeCard';
import Typography from '../../../components/typography';
import Header from '../../../components/header';

import {dateFormater} from '../../../utils/dateFormater';
import {Employee, Timesheet, TimesheetFormData} from '../interface';

import {timesheetListData} from '../../../constant/timesheet';
import strings from '../../../constant/strings';
import sizes from '../../../constant/sizes';
import {TIMESHEET_SCREEN} from '../../../constant/screenNames';
import {Calendar} from '../../../constant/icons';
import colors from '../../../constant/colors';

import {borderStyles, flexStyles} from '../../../../styles';

type Props = {
  route?: {
    params?: Employee;
  };
};

const TimesheetList = ({route}: Props) => {
  const [isDateRangeVisible, setIsDateRangeVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editTimesheetData, setEditTimesheetData] =
    useState<TimesheetFormData>();
  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
  const newDate = new Date();
  const startOfMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);

  const [dateRangeText, setDateRangeText] = useState<string>(
    strings.SELECT_DATE_RANGE,
  );

  const toggleModal = () => setIsEditModalVisible(v => !v);

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  const onEditSave = (data?: TimesheetFormData) => {
    console.log(data);
    // TO DO API CALL
    toggleModal();
  };

  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    const date = new Date();
    // sDate - start Date of the month
    const sDate = new Date(date.getFullYear(), date.getMonth(), 1);

    if (startDate && endDate) {
      setIsDateRangeApplied(true);
      setDateRangeText(
        `${dateFormater(startDate)} to ${dateFormater(endDate)}`,
      );
    } else {
      setIsDateRangeApplied(false);
      setDateRangeText(`${dateFormater(sDate)}  to  ${dateFormater(date)}`);
    }
  }, []);

  const workHoursTrim = (workHours: string) =>
    workHours.slice(0, workHours.indexOf('('));

  const timesheetDeleteCall = (timesheetData: Timesheet) => {
    // TO DO API CALL
    console.log(timesheetData);
  };

  const timesheetEditCall = (timesheetData: Timesheet) => {
    setEditTimesheetData({
      project: timesheetData.project ? timesheetData.project : strings.SELECT,
      project_id: timesheetData.project_id,
      date: new Date(timesheetData.date),
      workHours: timesheetData.work_in_hours,
      description: timesheetData.description,
    });
    toggleModal();
  };

  return (
    <Fragment>
      {route ? <Header title={TIMESHEET_SCREEN} type="ternary" /> : <></>}

      <View style={styles.background}>
        <TouchableOpacity
          onPress={toggelDatePicker}
          activeOpacity={0.5}
          style={[
            flexStyles.horizontal,
            borderStyles.thinBorder,
            styles.filter,
          ]}>
          <Typography
            type={
              dateRangeText === strings.SELECT_DATE_RANGE
                ? 'description'
                : 'subheader'
            }
            style={styles.filterText}>
            {dateRangeText}
          </Typography>
          <Calendar
            height={17}
            width={17}
            fill={isDateRangeApplied ? colors.PRIMARY : colors.SECONDARY}
          />
        </TouchableOpacity>
        {route ? (
          <>
            <EmployeeCard
              name={route?.params?.name + ''}
              email={route?.params?.email + ''}
              isArrowVisible={false}
            />
          </>
        ) : (
          <></>
        )}
      </View>
      <View style={[styles.view, styles.background]}>
        <DateRange
          onSubmit={onDateRangeSubmit}
          isVisible={isDateRangeVisible}
          toggleModal={toggelDatePicker}
          initialStartDateValue={startOfMonth}
          initialEndDateValue={newDate}
        />

        <View style={[flexStyles.horizontal, styles.headerData]}>
          <Typography type="description" style={styles.text}>
            {strings.PROJECTS}
          </Typography>
          <Typography type="subheader" style={styles.text}>
            {timesheetListData.projects}
          </Typography>
          <Typography type="description" style={styles.text}>
            {strings.WORK_HOURS}
          </Typography>
          <Typography type="subheader" style={styles.text}>
            {workHoursTrim(timesheetListData.total_work)}
          </Typography>
        </View>

        <SectionListTimesheet
          timesheetListData={timesheetListData.data}
          onDelete={timesheetDeleteCall}
          onEdit={timesheetEditCall}
        />

        {isEditModalVisible ? (
          <EditTimesheetModal
            isVisible={isEditModalVisible}
            toggleModal={toggleModal}
            formData={editTimesheetData}
            onSave={onEditSave}
          />
        ) : (
          <></>
        )}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
    flex: 1,
  },
  headerData: {
    justifyContent: 'flex-start',
  },
  text: {
    paddingEnd: 10,
    paddingBottom: 10,
    fontSize: 12,
  },
  filter: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
  },
  filterText: {
    fontSize: 14,
    padding: 5,
  },
  background: {
    backgroundColor: colors.WHITE,
  },
});

export default TimesheetList;
