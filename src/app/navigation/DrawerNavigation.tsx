import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import UserProfile from '../screens/userProfile';
import AsyncStore from '../services/asyncStorage';
import MainNavigator from './MainNavigator';
import UserContext from '../context/user.context';

import colors from '../constant/colors';
import {MAIN_SCREEN, USER_PROFILE_SCREEN} from '../constant/screenNames';
import {Cross} from '../constant/icons';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: any, setUserContextData: any) => {
  const logout = () => {
    AsyncStore.removeItem('authToken');
    AsyncStore.removeItem('user_data');
    setUserContextData(null);
  };

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn}>
        <Cross width={26} height={26} fill={colors.PRIMARY} />
      </TouchableOpacity>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={styles.label}
        onPress={logout}
        style={styles.border}
      />
    </DrawerContentScrollView>
  );
};

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerPosition: 'right',
  drawerStyle: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
  },
  drawerItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
  },
  drawerLabelStyle: {
    textAlign: 'right',
  },
};

const DrawerNavigator = () => {
  const [, setUserContextData] = React.useContext(UserContext);
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName={MAIN_SCREEN}
        screenOptions={screenOptions}
        drawerContent={props => DrawerContent(props, setUserContextData)}>
        <Drawer.Screen name={MAIN_SCREEN} component={MainNavigator} />
        <Drawer.Screen name={USER_PROFILE_SCREEN} component={UserProfile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  border: {
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  label: {
    textAlign: 'right',
  },
});
export default DrawerNavigator;
