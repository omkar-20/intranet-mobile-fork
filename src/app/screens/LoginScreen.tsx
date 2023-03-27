import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login Screen</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
