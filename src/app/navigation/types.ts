import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  UserProfile: undefined;
  UserTimesheet: Employee;
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: undefined;
};

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type Navigation = {
  navigate: Function;
};
