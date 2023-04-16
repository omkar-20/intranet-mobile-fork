import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {MainScreenNavigationProp} from '../../../navigation/types';

import EmployeeCard from '../component/employeeCard';
import Input from '../../../components/input';
import DateRange from '../../../components/pickers/dateRange';
import Linear from '../../../components/seperator/linear';
import EmptyList from '../component/emptyList';

import {Employee} from '../interface';

import {Calendar, Search} from '../../../constant/icons';
import sizes from '../../../constant/sizes';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import {useQuery} from 'react-query';
import {getEmployeeListRequest} from '../../../services/timesheet/getEmployeeList';
import {dateFormater} from '../../../utils/dateFormater';
import colors from '../../../constant/colors';

type Props = {
  item: Employee;
};

const seperator = () => <Linear />;
const footer = () => <Linear style={styles.footer} />;
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

  const {data} = useQuery(['employee', dateRange], () =>
    getEmployeeListRequest({
      user_id: 'user_id',
      start_date: dateRange.end_date,
      end_date: dateRange.end_date,
    }),
  );

  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Employee[]>([]);
  const navigation = useNavigation<MainScreenNavigationProp>();

  const toggelDatePicker = () => setIsVisible(v => !v);

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
      const newData = data?.data.filter(
        value =>
          value.email.toLowerCase().startsWith(text.toLowerCase()) ||
          value.name.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilterData(newData ? newData : []);
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
        data={filterData.length ? filterData : data?.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.user_id + index}
        ItemSeparatorComponent={seperator}
        ListFooterComponent={filterData.length ? footer : <></>}
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
