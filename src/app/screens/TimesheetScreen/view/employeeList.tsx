import React, {useCallback, useState} from 'react';
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
import {employeeData} from '../../../constant/timesheet';
import {USER_TIMESHEET} from '../../../constant/screenNames';

type Props = {
  item: Employee;
};

const seperator = () => <Linear />;
const footer = () => <Linear style={styles.footer} />;
const emptyComponent = () => <EmptyList />;
const searchIcon = () => <Search style={styles.icon} />;

const EmployeeList = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Employee[]>(employeeData);
  const navigation = useNavigation<MainScreenNavigationProp>();

  const toggelDatePicker = () => setIsVisible(v => !v);

  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    console.log(startDate, endDate);
  }, []);

  const filterEmployee = useCallback((text: string) => {
    const newData = employeeData.filter(
      value =>
        value.email.toLowerCase().startsWith(text.toLowerCase()) ||
        value.name.toLowerCase().startsWith(text.toLowerCase()),
    );
    setFilterData(newData);
  }, []);

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

  const newDate = new Date();

  const startOfMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);

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
          <Calendar width={18} height={18} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.employee_id + index}
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
