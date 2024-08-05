import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen/index';
import {useLoginPeerly} from '../hooks/peerlyLogin.hook';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HOME_SCREEN,
  GIVE_APPRECIATION_SCREEN,
  APPRECIATION_DETAILS_SCREEN,
  PROFILE_DETAILS_SCREEN,
  APPRECIATION_SEARCH_SCREEN,
} from '../constants/screenNames';
import AppreciationScreen from '../screens/GiveAppreciationScreen';
import DetailsScreen from '../screens/AppreciationDetailsScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function PeerlyScreen() {
  const {isLoading, isFetching, isError} = useLoginPeerly();
  if (isLoading || isFetching) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Something went Wrong</Text>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator initialRouteName={HOME_SCREEN}>
        <RootStack.Screen
          name={HOME_SCREEN}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={GIVE_APPRECIATION_SCREEN}
          component={AppreciationScreen}
          options={{
            headerTitle: 'Appreciation',
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={APPRECIATION_DETAILS_SCREEN}
          component={DetailsScreen}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={PROFILE_DETAILS_SCREEN}
          component={ProfileDetailScreen}
          options={{
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={APPRECIATION_SEARCH_SCREEN}
          component={SearchScreen}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default PeerlyScreen;
