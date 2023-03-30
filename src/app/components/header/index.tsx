import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const Header = () => <View style={styles.main} />;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 56,
  },
});

export default memo(Header);
