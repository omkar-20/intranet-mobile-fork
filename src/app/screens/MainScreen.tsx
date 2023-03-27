import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Main Screen</Text>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
