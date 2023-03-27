import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Text>Welcome to Intranet</Text>
      </SafeAreaView>
    </NavigationContainer>
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
