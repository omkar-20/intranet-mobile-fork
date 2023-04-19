import React, {memo} from 'react';
import {View} from 'react-native';

import Typography from '../../../components/typography';

import {flexStyles} from '../../../../styles';
import strings from '../../../constant/strings';

const EmptyList = ({
  message = strings.NO_TIMESHEET_PRESENT,
}: {
  message?: string;
}) => (
  <View style={flexStyles.vertical}>
    <Typography>{message}</Typography>
  </View>
);

export default memo(EmptyList);
