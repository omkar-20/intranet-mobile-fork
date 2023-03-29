import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import Typography from '../typography';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import {CALENDAR} from '../../constant/icons';

import strings from '../../constant/strings';
import {BorderStyles, FlexStyles} from '../../../styles';

type Props = {
  style?: ViewStyle | undefined;
  initialDate?: Date;
  placeHolder?: string;
  selectedDate: Date | undefined;
  maximumDate?: Date;
  minimumDate?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  hideIcon?: boolean;
};
const DatePicker = ({
  style,
  initialDate = new Date(),
  selectedDate,
  placeHolder = strings.SELECT,
  setDate,
  maximumDate = new Date(),
  minimumDate,
  hideIcon = true,
}: Props) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    date: Date | undefined,
  ) => {
    event.type === 'neutralButtonPressed' ? setDate(undefined) : setDate(date);
    handleVisibility();
  };

  const handleVisibility = () => setIsVisible(!isVisible);

  const dateFormater = (date: Date) =>
    `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return (
    <TouchableOpacity
      onPress={handleVisibility}
      style={[BorderStyles.thinBorder, FlexStyles.horizontal, style]}>
      <Typography
        type={'header'}
        style={
          selectedDate
            ? {
                color: colors.SECONDARY,
                fontFamily: fonts.ARIAL,
              }
            : {
                color: colors.PLACEHOLDER_TEXT,
                fontFamily: fonts.OVERPASS,
              }
        }>
        {selectedDate ? dateFormater(selectedDate) : placeHolder}
      </Typography>
      {!hideIcon && <CALENDAR style={styles.icon} />}
      {isVisible && (
        <DateTimePicker
          value={initialDate}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onTouchEnd={handleVisibility}
          neutralButton={{label: 'Clear', textColor: 'grey'}}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 9,
  },
});

export default DatePicker;
