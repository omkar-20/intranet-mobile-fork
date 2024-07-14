import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import HomeScreen from '../HomeScreen';
import {useLoginPeerly} from './peerlyLogin.hook';

function PeerlyHomeScreen() {
  const {isLoading, isFetching, isError} = useLoginPeerly();
  if (isLoading || isFetching) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (isError) {
    <View>
      <Text>Something went Wrong</Text>
    </View>;
  }

  return <HomeScreen />;
}

export default PeerlyHomeScreen;
