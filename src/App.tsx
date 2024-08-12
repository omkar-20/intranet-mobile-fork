import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import {CheckVersionResponse} from 'react-native-check-version';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Request permission to receive notifications
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
        getToken();
      } else {
        console.log('Notification permission denied.');
      }
    }

    const getToken = async () => {
      try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('FCM Token:', fcmToken);
          setToken(fcmToken);
        } else {
          console.log('No FCM token received.');
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    requestUserPermission();

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    // Handle notifications when the app is opened from the background or quit state
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background or quit state:', remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened by a notification:', remoteMessage);
      }
    });

    return unsubscribe;
  }, []);

  async function onDisplayNotification(remoteMessage: any) {
    console.log('Displaying notification:', remoteMessage);

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'No Title',
      body: remoteMessage.notification?.body || 'No Body',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default', // Ensure the sound setting is correct
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
