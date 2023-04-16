import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import DateRange from '../../../components/pickers/dateRange';
import SectionListTimesheet from '../component/sectionListTimesheet';
import EditTimesheetModal from '../component/editTimesheetModal';
import EmployeeCard from '../component/employeeCard';
import Typography from '../../../components/typography';
import Header from '../../../components/header';

import {dateFormater} from '../../../utils/dateFormater';
import {Employee, Timesheet, TimesheetFormData} from '../interface';

import strings from '../../../constant/strings';
import sizes from '../../../constant/sizes';
import {TIMESHEET_SCREEN} from '../../../constant/screenNames';
import {Calendar} from '../../../constant/icons';
import colors from '../../../constant/colors';

import {borderStyles, flexStyles} from '../../../../styles';
import {useQuery} from 'react-query';
import {getTimesheetRequest} from '../../../services/timesheet/getTimesheet';

type Props = {
  route?: {
    params: Employee;
  };
};

const TimesheetList = ({route}: Props) => {
  const newDate = useMemo(() => new Date(), []);
  const startOfMonth = useMemo(
    () => new Date(newDate.getFullYear(), newDate.getMonth(), 1),
    [newDate],
  );
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTimesheetData, setEditTimesheetData] =
    useState<TimesheetFormData>();

  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);

  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({start_date: dateFormater(startOfMonth), end_date: dateFormater(newDate)});

  // const [page, setPage] = useState(0);

  const {data} = useQuery(
    ['timesheet/list', route?.params.user_id, dateRange],
    () =>
      getTimesheetRequest({
        user_id: route ? route.params.user_id : '',
        // page_number: 1,
        from_date: dateRange.start_date,
        to_date: dateRange.end_date,
      }),
  );

  const toggleModal = () => setIsEditModalVisible(v => !v);

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  const onEditSave = (editData?: TimesheetFormData) => {
    console.log(editData);
    // TO DO API CALL
    toggleModal();
  };

  // const increasePage = () => {
  //   setPage(p => p + 1);
  // };
  // const decreasePage = () => {
  //   setPage(p => p - 1);
  // };
  const onDateRangeSubmit = useCallback(
    (startDate?: Date, endDate?: Date) => {
      if (startDate && endDate) {
        setIsDateRangeApplied(true);
        setDateRange({
          start_date: dateFormater(startDate),
          end_date: dateFormater(endDate),
        });
      } else {
        setIsDateRangeApplied(false);
        setDateRange({
          start_date: dateFormater(startOfMonth),
          end_date: dateFormater(newDate),
        });
      }
    },
    [newDate, startOfMonth],
  );

  const workHoursTrim = (workHours?: string) =>
    workHours?.slice(0, workHours.indexOf('('));

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
            type={isDateRangeApplied ? 'description' : 'subheader'}
            style={styles.filterText}>
            {isDateRangeApplied
              ? `${dateRange.start_date} to ${dateRange.end_date}`
              : strings.SELECT_DATE_RANGE}
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
            {data?.data.timesheets[0].projects}
          </Typography>
          <Typography type="description" style={styles.text}>
            {strings.WORK_HOURS}
          </Typography>
          <Typography type="subheader" style={styles.text}>
            {workHoursTrim(data?.data.timesheets[0].total_work)}
          </Typography>
        </View>

        <SectionListTimesheet
          timesheetListData={data ? data?.data.timesheets[0].data : []}
          onDelete={timesheetDeleteCall}
          onEdit={timesheetEditCall}
          // onEndReached={increasePage}
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
