import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import HomeScreen from '../HomeScreen/index';
import {useLoginPeerly} from '../peerlyLogin.hook';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PEERLY_HOME_SCREEN,
  APPRECIATION,
  APPRECIATION_DETAILS,
  PROFILE_DETAILS,
  APPRECIATION_SEARCH,
} from '../constants/screenNames';
import AppreciationScreen from '../AppreciationScreen';
import DetailsScreen from '../DetailsScreen';
import ProfileDetailScreen from '../ProfileDetailScreen';
import SearchScreen from '../SearchScreen';
import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function PeerlyHomeScreen() {
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
      <RootStack.Navigator initialRouteName={PEERLY_HOME_SCREEN}>
        <RootStack.Screen
          name={PEERLY_HOME_SCREEN}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={APPRECIATION}
          component={AppreciationScreen}
          options={{
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={APPRECIATION_DETAILS}
          component={DetailsScreen}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={PROFILE_DETAILS}
          component={ProfileDetailScreen}
          options={{
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name={APPRECIATION_SEARCH}
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

export default PeerlyHomeScreen;
