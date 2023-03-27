import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const LeaveScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Leave Screen</Text>
    </SafeAreaView>
  );
};

export default LeaveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
