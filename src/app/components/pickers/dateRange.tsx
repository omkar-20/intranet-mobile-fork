import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import DatePicker from './datePicker';

import strings from '../../constant/strings';

type Props = {
  style?: ViewStyle;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const DateRange = ({
  style,
  selectedStartDate,
  selectedEndDate,
  setStartDate,
  setEndDate,
}: Props) => {
  return (
    <View style={style}>
      <DatePicker
        initialDate={selectedStartDate ? selectedStartDate : new Date()}
        selectedDate={selectedStartDate}
        placeHolder={strings.FROM}
        setDate={setStartDate}
        maximumDate={selectedEndDate}
        style={styles.leftDatePicker}
      />

      <DatePicker
        initialDate={selectedEndDate ? selectedEndDate : new Date()}
        selectedDate={selectedEndDate}
        placeHolder={strings.TO}
        setDate={setEndDate}
        hideIcon={false}
        minimumDate={selectedStartDate}
        style={styles.rightDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftDatePicker: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderEndWidth: 0,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  rightDatePicker: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderStartWidth: 1,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
});

export default DateRange;
