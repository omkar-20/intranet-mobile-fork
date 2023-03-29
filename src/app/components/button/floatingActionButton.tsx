import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';

import colors from '../../constant/colors';
import margin from '../../constant/margin';

type Props = {
  eventHandler: () => void;
};

const FloatingActionButton = ({eventHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.circle} onPress={eventHandler}>
      <View style={styles.horizontal} />
      <View style={styles.vertical} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    right: margin.FLOATING_MARGIN_RIGHT,
    bottom: margin.FLOATING_MARGIN_BOTTOM,
    elevation: 5,
    shadowOpacity: 10,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 2},
  },
  horizontal: {
    position: 'absolute',
    width: 18.82,
    height: 2,
    backgroundColor: colors.WHITE,
  },
  vertical: {
    position: 'absolute',
    width: 2,
    height: 18,
    backgroundColor: colors.WHITE,
  },
});

export default FloatingActionButton;
