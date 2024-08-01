import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppreciationDetails} from '../../../services/PeerlyServices/home/types';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  PeerlyHome: undefined;
  AppreciationSearch: undefined;
  Appreciation: undefined;
  Profile: {userId: number | undefined};
  AppreciationDetail: {
    cardId: number;
    appriciationList: AppreciationDetails[];
    self?: boolean;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeerlyHome'
>;

export type AppreciationSearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppreciationSearch'
>;

export type AppreciationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Appreciation'
>;

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type AppreciationDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppreciationDetail'
>;

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type AppreciationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AppreciationDetail'
>;
