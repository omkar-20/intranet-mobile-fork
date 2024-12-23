import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import {CheckVersionResponse} from 'react-native-check-version';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);

  useEffect(() => {
    // Request permission to receive notifications
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
    }

    requestUserPermission();

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage)
    });
 
    // called if the app has opened from a background state.
    messaging().onNotificationOpenedApp(() => {});

    //triggered when application  open from a quit state
    messaging().getInitialNotification();
 
 
    return unsubscribe;
  }, []);

  async function onDisplayNotification(remoteMessage: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <VersionContext.Provider value={versionContextValue}>
        <UserContext.Provider value={userContextValue}>
          <Interceptor>
            <QueryClientProvider client={queryClient}>
              <StatusBar
                backgroundColor={colors.PRIMARY}
                barStyle="light-content"
              />
              <RootNavigator />
            </QueryClientProvider>
          </Interceptor>
        </UserContext.Provider>
      </VersionContext.Provider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
