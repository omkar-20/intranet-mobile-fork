import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import colors from '../../constant/colors';

type Props = {
  style?: ViewStyle;
};

const Linear = ({style}: Props) => <View style={[styles.divider, style]} />;

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    borderColor: colors.SECONDARY_DIVIDER,
  },
});

export default memo(Linear);
