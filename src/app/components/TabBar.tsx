import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {NavigationHelpers, TabNavigationState} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';

import HomeIcon from '../../assets/svg/home.svg';
import ClockIcon from '../../assets/svg/clock.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import MenuIcon from '../../assets/svg/menu.svg';

import {MainTabParamList} from '../navigation/types';

// Defining specific types because
// ButtonTabBarProps is not generic in the library
type StateType = TabNavigationState<MainTabParamList>;
type NavigationType = NavigationHelpers<
  MainTabParamList,
  BottomTabNavigationEventMap
>;

const screenIcons: Record<keyof MainTabParamList, JSX.Element> = {
  Home: <HomeIcon />,
  Leave: <CalendarIcon />,
  Timesheet: <ClockIcon />,
};

const TabBar = (props: BottomTabBarProps) => {
  const state = props.state as StateType;
  const navigation = props.navigation as NavigationType;

  const tabButtons = state.routes.map((route, index) => {
    const label = route.name;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.name}
        style={styles.buttonContainer}
        onPress={onPress}>
        {screenIcons[route.name]}
        <Text style={styles.buttonTitle}>{label}</Text>
      </TouchableOpacity>
    );
  });

  const handleMenuButtonPress = () => {
    // TODO
  };

  return (
    <View style={styles.container}>
      {tabButtons}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleMenuButtonPress}>
        <MenuIcon />
        <Text style={styles.buttonTitle}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',

    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#707070',

    paddingVertical: 9,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#000000',
  },
});

export default TabBar;
