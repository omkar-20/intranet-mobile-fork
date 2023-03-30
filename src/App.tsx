import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to Intranet</Text>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
