import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

import Typography from '../typography';
import DatePicker from './datePicker';
import Button from '../button';

import strings from '../../constant/strings';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  initialStartDateValue?: Date;
  initialEndDateValue?: Date;
  onSubmit: (startDate?: Date, endDate?: Date) => void;
};

const DateRange = ({
  isVisible,
  toggleModal,
  initialStartDateValue,
  initialEndDateValue,
  onSubmit,
}: Props) => {
  const [startDate, setStartDate] = useState(initialStartDateValue);
  const [endDate, setEndDate] = useState(initialEndDateValue);

  const onChangeStart = (date?: Date) => setStartDate(date);

  const onChangeEnd = (date?: Date) => setEndDate(date);

  const handleSubmit = () => {
    onSubmit(startDate, endDate);
    toggleModal();
  };

  const newDate = new Date();

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInUp"
      animationInTiming={500}
      animationOut="zoomOutDown"
      animationOutTiming={500}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
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
            hideIcon={false}
          />
        </View>

        <View style={styles.container}>
          <Typography style={styles.secondaryText}>{strings.TO}</Typography>

          <DatePicker
            value={endDate ? endDate : newDate}
            selectedDate={endDate}
            placeholder={strings.SELECT}
            onDateChange={onChangeEnd}
            hideIcon={false}
            minimumDate={startDate}
            maximumDate={newDate}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.btn}>
            <Button type="secondary" title="Cancel" onPress={toggleModal} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '90%',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fonts.ARIAL,
    fontWeight: '600',
    letterSpacing: 2,
    color: colors.SECONDARY_TEXT,
  },
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  bottomContainer: {
    paddingVertical: 20,
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
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default memo(DateRange);
