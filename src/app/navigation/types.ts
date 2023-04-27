import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  UserTimesheet: Employee;
  Drawer: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: undefined;
};

export type DrawerParamList = {
  Main: undefined;
  UserProfile: undefined;
};

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Drawer'
>;

export type Navigation = {
  navigate: Function;
};
