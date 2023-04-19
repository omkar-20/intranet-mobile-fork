import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {useQuery} from 'react-query';
import {yupResolver} from '@hookform/resolvers/yup';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import DatePicker from '../../../components/pickers/datePicker';
import Input from '../../../components/input';
import Button from '../../../components/button';

import {dateFormater} from '../../../utils/dateFormater';
import {getProjectListRequest} from '../../../services/timesheet/getProjectList';
import {Timesheet} from '../interface';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {workHoursData} from '../../../constant/timesheet';

import {flexStyles} from '../../../../styles';

const timesheetFormSchema = yup.object().shape({
  project: yup.string().required(),
  date: yup.date().required(),
  work_in_hours: yup.string().required(),
  description: yup.string().required(),
});

type Props = {
  defaultData?: Timesheet;
  onSubmit: (data: Timesheet, resetField?: Function) => void;
  onCancel?: () => void;
  isFormVisible?: boolean;
  isAddButtonVisible?: boolean;
  isLoading?: boolean;
  userId: string;
};

const TimesheetForm = ({
  defaultData,
  onSubmit,
  onCancel,
  isFormVisible = true,
  isAddButtonVisible = true,
  isLoading,
  userId,
}: Props) => {
  const {
    handleSubmit,
    control,
    resetField,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    values: defaultData
      ? defaultData
      : {
          project: undefined,
          date: undefined,
          work_in_hours: undefined,
          description: undefined,
        },
    resolver: yupResolver(timesheetFormSchema),
  });

  const newDate = new Date();

  const {data: queryData} = useQuery(['timesheet/projectList', userId], () =>
    getProjectListRequest({
      user_id: userId,
    }),
  );

  return (
    <>
      {isFormVisible && (
        <>
          <View>
            <Typography type="header" style={styles.labelText}>
              Project
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <PickerSelect
                  placeholder={{
                    label: strings.SELECT,
                    value: undefined,
                  }}
                  onValueChange={onChange}
                  value={value ? value : strings.SELECT}
                  items={queryData ? queryData.data.emp_projects : []}
                  style={styles.item}
                />
              )}
              name="project"
            />
            {errors.project && (
              <Typography style={styles.error} type="description">
                {errors.project.message}
              </Typography>
            )}
          </View>

          <View style={[flexStyles.horizontal, styles.row]}>
            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Select Date
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <DatePicker
                    value={value ? new Date(value) : newDate}
                    onDateChange={onChange}
                    hideIcon={false}
                    selectedDate={value ? new Date(value) : undefined}
                    placeholder={strings.SELECT}
                    maximumDate={newDate}
                  />
                )}
                name="date"
              />
              {errors.date && (
                <Typography style={styles.error} type="description">
                  {errors.date.message}
                </Typography>
              )}
            </View>

            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Work in hours
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <PickerSelect
                    placeholder={{
                      label: strings.SELECT,
                      value: undefined,
                    }}
                    onValueChange={onChange}
                    value={value ? value : strings.SELECT}
                    items={workHoursData}
                    style={styles.item}
                  />
                )}
                name="work_in_hours"
              />
              {errors.work_in_hours && (
                <Typography style={styles.error} type="description">
                  {strings.WORK_HOURS_ERROR}
                </Typography>
              )}
            </View>
          </View>

          <View>
            <Typography type="header" style={styles.labelText}>
              Description
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  placeholder={strings.DESCRIPTION_PLACEHOLDER}
                  style={styles.description}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Typography style={styles.error} type="description">
                {errors.description.message}
              </Typography>
            )}
          </View>
        </>
      )}
      {isAddButtonVisible ? (
        <View style={styles.addButton}>
          <Button
            type="tertiary"
            title="Add Timesheet"
            onPress={handleSubmit((data: any) => {
              let label = queryData?.data.emp_projects.find(value => {
                return data.project === value.value;
              });
              onSubmit(
                {
                  ...data,
                  timesheet_id: data.project + dateFormater(data.date),
                  project: label?.label + '',
                  project_id: data.project,
                  date: dateFormater(data.date),
                },
                resetField,
              );
            })}
          />
        </View>
      ) : (
        <View style={[flexStyles.horizontal, styles.btns]}>
          <Button title="Cancel" type="secondary" onPress={onCancel} />
          <Button
            title="Update"
            type="primary"
            isLoading={isLoading}
            onPress={handleSubmit((data: any) =>
              onSubmit({
                ...data,
                date: dateFormater(data.date),
              }),
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    marginVertical: 5,
  },
  description: {
    alignItems: 'flex-start',
    maxHeight: 100,
    fontSize: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  rowItem: {
    marginVertical: 10,
    width: '48%',
  },
  item: {
    height: 40,
    width: '100%',
    justifyContent: 'space-around',
  },
  date: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateText: {
    marginHorizontal: 15,
  },
  error: {
    color: colors.ERROR_RED,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  addButton: {
    alignSelf: 'center',
    width: '50%',
    height: 50,
    marginTop: 20,
  },
  btns: {
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  btnText: {
    color: colors.PRIMARY,
  },
  cancel: {
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    width: '45%',
  },
  save: {
    width: '45%',
  },
});

export default memo(TimesheetForm);
