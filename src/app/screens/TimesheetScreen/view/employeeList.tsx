import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';

import EmployeeCard from '../component/employeeCard';
import Input from '../../../components/input';
import DateRange from '../../../components/pickers/dateRange';
import Linear from '../../../components/seperator/linear';
import EmptyList from '../component/emptyList';

import {getEmployeeListRequest} from '../../../services/timesheet/getEmployeeList';
import {dateFormater} from '../../../utils/dateFormater';
import {Employee} from '../interface';
import {MainScreenNavigationProp} from '../../../navigation/types';

import {Calendar, Search} from '../../../constant/icons';
import sizes from '../../../constant/sizes';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import colors from '../../../constant/colors';

type Props = {
  item: Employee;
};

const seperator = () => <Linear />;
const footer = () => <Linear />;
const emptyComponent = () => <EmptyList />;
const searchIcon = () => <Search style={styles.icon} />;

const EmployeeList = () => {
  const newDate = useMemo(() => new Date(), []);
  const startOfMonth = useMemo(
    () => new Date(newDate.getFullYear(), newDate.getMonth(), 1),
    [newDate],
  );
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({start_date: dateFormater(startOfMonth), end_date: dateFormater(newDate)});

  const {data, isFetching, refetch, isRefetching} = useQuery(
    ['employee', dateRange],
    () =>
      getEmployeeListRequest({
        from_date: dateRange.start_date,
        to_date: dateRange.end_date,
      }),
  );

  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Employee[]>();
  const navigation = useNavigation<MainScreenNavigationProp>();

  const toggelDatePicker = useCallback(() => setIsVisible(v => !v), []);

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

  const filterEmployee = useCallback(
    (text: string) => {
      const newData = data?.data.body.filter(
        value =>
          value.email.toLowerCase().startsWith(text.toLowerCase()) ||
          value.name.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilterData(newData);
    },
    [data?.data],
  );

  const renderItem = useCallback(
    ({item}: Props) => {
      const handleNavigation = () => {
        navigation.navigate(USER_TIMESHEET, item);
      };
      return (
        <TouchableOpacity key={item.name} onPress={handleNavigation}>
          <EmployeeCard name={item.name} email={item.email} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View style={styles.main}>
      <DateRange
        onSubmit={onDateRangeSubmit}
        isVisible={isVisible}
        toggleModal={toggelDatePicker}
        initialStartDateValue={startOfMonth}
        initialEndDateValue={newDate}
      />
      <View style={styles.filter}>
        <Input
          onChangeText={filterEmployee}
          StartIcon={searchIcon}
          placeholder="Search"
          style={styles.input}
        />
        <TouchableOpacity onPress={toggelDatePicker}>
          <Calendar
            width={18}
            height={18}
            style={styles.icon}
            fill={isDateRangeApplied ? colors.PRIMARY : colors.SECONDARY}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData ? filterData : data?.data.body}
        renderItem={renderItem}
        keyExtractor={item => item.user_id}
        ItemSeparatorComponent={seperator}
        refreshing={isFetching || isRefetching}
        onRefresh={refetch}
        ListFooterComponent={footer}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
    height: '100%',
  },
  footer: {
    marginBottom: 100,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '85%',
    textAlignVertical: 'center',
  },
  icon: {
    margin: 6,
  },
});

export default EmployeeList;
