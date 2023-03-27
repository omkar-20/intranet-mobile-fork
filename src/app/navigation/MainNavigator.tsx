import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import LeaveScreen from '../screens/LeaveScreen';
import TimesheetScreen from '../screens/TimesheetScreen';

import {MainTabParamList} from './types';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const MainNavigator = () => {
  return (
    <MainTab.Navigator screenOptions={screenOptions}>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Leave" component={LeaveScreen} />
      <MainTab.Screen name="Timesheet" component={TimesheetScreen} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
