import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';

import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Main" component={MainScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
