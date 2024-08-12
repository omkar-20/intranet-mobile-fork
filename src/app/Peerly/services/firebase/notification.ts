import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

const DEFAULT_CHANNEL_ID = 'default-channel';

const usePushNotification = () => {
  const [token, setToken] = useState<string | null>(null);

  // Initialize default notification channel
  const initializeDefaultChannel = async () => {
    const channels = await notifee.getChannels();
    const defaultChannelExists = channels.some(channel => channel.id === DEFAULT_CHANNEL_ID);

    if (!defaultChannelExists) {
      await notifee.createChannel({
        id: DEFAULT_CHANNEL_ID,
        name: 'Default Channel',
      });
      console.log('Default notification channel created.');
    }
  };

  // Handle Background notification
  useEffect(() => {
    initializeDefaultChannel(); // Ensure the default channel is created
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log('Background notification opened:', remoteMessage);
      },
    );
    return unsubscribe;
  }, []);

  // Register for remote messages and get the device token
  const getDeviceToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        setToken(fcmToken);
      } else {
        console.log('No FCM token received.');
      }
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };

  // Handler to display notifications when the app is in the foreground
  const onDisplayNotification = async (message: any) => {
    try {
      console.log('Displaying notification');
      await notifee.displayNotification({
        title: message.notification?.title || 'No Title',
        body: message.notification?.body || 'No Body',
        android: { channelId: DEFAULT_CHANNEL_ID, smallIcon: "ic_notification" },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  const requestUserPermission = async (): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        await messaging().requestPermission({
          providesAppNotificationSettings: true,
        });
      } else if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const listenToForegroundNotifications = () => {
    return messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground notification received:', remoteMessage);
      await onDisplayNotification(remoteMessage);
    });
  };

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async () => {
        console.log("Background message received.");
      }
    );
    return unsubscribe;
  };

  const onForeGroundNotificationHandler = async () => {
    const unsubscribe = await notifee.onForegroundEvent(
      ({ type, detail: { notification } }) => {
        console.log('Foreground Notifee event:', type, notification);
      }
    );
    return unsubscribe;
  };

  const onBackGroundNotifeeHandler = async () => {
    notifee.onBackgroundEvent(async ({ type, detail: { notification } }) => {
      console.log('Background Notifee event:', type, notification);
    });
  };

  return {
    getDeviceToken,
    listenToForegroundNotifications,
    requestUserPermission,
    listenToBackgroundNotifications,
    onForeGroundNotificationHandler,
    onBackGroundNotifeeHandler,
  };
};

export default usePushNotification;
