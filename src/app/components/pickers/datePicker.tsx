import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import Typography from '../typography';

import DateFormatter from '../../utils/dateFormatter';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import {Calendar} from '../../constant/icons';
import strings from '../../constant/strings';

import {BorderStyles, FlexStyles} from '../../../styles';

type Props = {
  style?: ViewStyle | undefined;
  initialDate?: Date;
  placeHolder?: string;
  selectedDate: Date | undefined;
  maximumDate?: Date;
  minimumDate?: Date;
  onChange: (date: Date | undefined, isStart: boolean) => void;
  hideIcon?: boolean;
};
const DatePicker = ({
  style,
  initialDate = new Date(),
  selectedDate,
  placeHolder = strings.SELECT,
  onChange,
  maximumDate = new Date(),
  minimumDate,
  hideIcon = true,
}: Props) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const isStart = placeHolder === strings.FROM;
  const handleDateChange = (
    event: DateTimePickerEvent,
    date: Date | undefined,
  ) => {
    event.type === 'neutralButtonPressed'
      ? onChange(undefined, isStart)
      : onChange(date, isStart);
    handleVisibility();
  };

  const handleVisibility = () => setIsVisible(!isVisible);

  const selectedStyle = selectedDate
    ? {
        color: colors.SECONDARY,
        fontFamily: fonts.ARIAL,
      }
    : {
        color: colors.PLACEHOLDER_TEXT,
        fontFamily: fonts.OVERPASS,
      };
  return (
    <TouchableOpacity
      onPress={handleVisibility}
      style={[BorderStyles.thinBorder, FlexStyles.horizontal, style]}>
      <Typography type={'header'} style={selectedStyle}>
        {selectedDate ? DateFormatter(selectedDate) : placeHolder}
      </Typography>
      {!hideIcon && <Calendar style={styles.icon} />}
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

export default memo(DatePicker);
