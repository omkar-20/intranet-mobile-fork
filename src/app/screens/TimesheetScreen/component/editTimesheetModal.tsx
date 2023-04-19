import React, {memo} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useMutation} from 'react-query';

import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';

import {timeConversion} from '../../../constant/timesheet';
import {updateTimesheetRequest} from '../../../services/timesheet/updateTimesheet';

import {Timesheet} from '../interface';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string;
  current_user: string;
  formData?: Timesheet;
};

const EditTimesheetModal = ({
  toggleModal,
  formData,
  isVisible,
  userId,
  current_user,
}: Props) => {
  const mutationFunc = (data: Timesheet) =>
    updateTimesheetRequest({
      user: {
        time_sheets_attributes: {
          1: {
            project_id: parseInt(formData?.project + '', 10),
            date: data.date,
            duration:
              timeConversion[data.work_in_hours as keyof typeof timeConversion],
            description: data.description,
            id: data.timesheet_id,
          },
        },
      },

      user_id: userId,
      current_user: current_user,
      time_sheet_date: formData?.date + '',
    });

  const mutation = useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      toggleModal();
      Alert.alert('Updated Timesheet');
    },
    onError: () => {
      Alert.alert('Something went wrong', 'Problem in updating timesheet');
    },
  });

  const onEditSave = (data: Timesheet) => {
    mutation.mutate(data);
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      contentStyle={styles.main}>
      <View>
        <Typography type="title" style={styles.title}>
          Edit Timesheet
        </Typography>

        <TimesheetForm
          onSubmit={onEditSave}
          onCancel={toggleModal}
          isFormVisible={true}
          defaultData={formData}
          isAddButtonVisible={false}
          userId={userId}
          isLoading={mutation.isLoading}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
});

export default memo(EditTimesheetModal);
