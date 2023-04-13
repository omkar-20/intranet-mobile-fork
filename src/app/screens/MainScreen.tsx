import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import MainNavigator from '../navigation/MainNavigator';
import {Navigation} from '../navigation/types';
import StackNavigation from '../context/stack.context';

const MainScreen = ({navigation}: {navigation: Navigation}) => {
  return (
    <StackNavigation.Provider value={navigation}>
      <SafeAreaView style={styles.container}>
        <MainNavigator />
      </SafeAreaView>
    </StackNavigation.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#707070',
  },
});

export default MainScreen;
