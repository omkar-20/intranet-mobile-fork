import React from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from '../modal';
import Typography from '../typography';
import DatePicker from './datePicker';
import Button from '../button';

import strings from '../../constant/strings';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  onSubmit?: () => void;
  startDate?: Date;
  endDate?: Date;
  onChangeStart: (date?: Date) => void;
  onChangeEnd: (date?: Date) => void;
};

const DateRange = ({
  isVisible,
  startDate,
  toggleModal,
  onSubmit,
  endDate,
  onChangeEnd,
  onChangeStart,
}: Props) => {
  const handleCancel = () => toggleModal();

  const handleSubmit = () => {
    onSubmit?.();
    toggleModal();
  };

  const handleOverdropTouch = () => {
    toggleModal();
    return true;
  };

  const newDate = new Date();
  return (
    <Modal
      animationIn="zoomInUp"
      animationInTiming={500}
      isVisible={isVisible}
      animationOut="zoomOutDown"
      animationOutTiming={500}
      onStartShouldSetResponder={handleOverdropTouch}
      style={styles.modal}>
      <View style={styles.main}>
        <View style={styles.container}>
          <Typography style={styles.headerText}>Select Date Range</Typography>
        </View>

        <View style={styles.container}>
          <Typography style={styles.secondaryText}>{strings.FROM}</Typography>

          <DatePicker
            value={startDate ? startDate : newDate}
            selectedDate={startDate}
            placeholder={strings.SELECT}
            onDateChange={onChangeStart}
            maximumDate={endDate ? endDate : newDate}
            style={styles.datePicker}
            hideIcon={false}
          />
          <Typography style={styles.secondaryText}>{strings.TO}</Typography>

          <DatePicker
            value={endDate ? endDate : newDate}
            selectedDate={endDate}
            placeholder={strings.SELECT}
            onDateChange={onChangeEnd}
            hideIcon={false}
            minimumDate={startDate}
            maximumDate={newDate}
            style={styles.datePicker}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.btn}>
            <Button type="secondary" title="Cancel" onPress={handleCancel} />
          </View>
          <View style={styles.btn}>
            <Button type="primary" title="Ok" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 18,
    paddingVertical: 4,
    fontFamily: fonts.ARIAL,
    fontWeight: '500',
    letterSpacing: 2,
    color: colors.SECONDARY_TEXT,
  },
  main: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  container: {
    width: '80%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  bottomContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  btn: {
    flex: 1 / 2,
  },
  headerText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: fonts.ARIAL,
    letterSpacing: 0.7,
    color: colors.SECONDARY,
  },
  datePicker: {
    height: 50,
    width: '90%',
  },
});

export default DateRange;
