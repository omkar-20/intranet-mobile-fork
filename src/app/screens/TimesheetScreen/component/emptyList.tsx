import React, {memo} from 'react';
import {View} from 'react-native';

import Typography from '../../../components/typography';

import {flexStyles} from '../../../../styles';

const EmptyList = () => (
  <View style={flexStyles.vertical}>
    <Typography>No data preset with current filters</Typography>
  </View>
);

export default memo(EmptyList);
