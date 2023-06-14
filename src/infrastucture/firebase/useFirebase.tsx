import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { LocalStorageKey } from '../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../application/state-manager/services/localstorage/useLocalStorage';
import { firebaseHeadlessHandler } from './firebaseHeadlessHandler';

export const useFirebase = (props: UseFirebaseProps) => {
  const [areNotificationsAllowed, setNotificationsAllowed] =
    useState<boolean>();
  const [, setFcmToke] = useState<string>();
  const { save: saveInLocalStorage } = useLocalStorage();

  const initialization = async () => {
    try {
      const allowedNoti = await requestUserPermission();
      const _fcmToken = await messaging().getToken();
      setNotificationsAllowed(allowedNoti);
      saveInLocalStorage({
        [LocalStorageKey.TokenFCM]: _fcmToken
      });
      setFcmToke(_fcmToken);
    } catch (error) {
      console.log('>>> FCM Token Error: ', error);
    }
  };

  const requestUserPermission = async (): Promise<boolean> => {
    try {
      await messaging().requestPermission({
        providesAppNotificationSettings: true
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkNotificationPermission = (
    status: FirebaseMessagingTypes.AuthorizationStatus
  ): boolean => {
    switch (status) {
      case FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED:
      case FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL:
        return true;
      default:
        return false;
    }
  };

  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage
  ) => {
    props.onMessage?.(message.data);
  };

  useEffect(() => {
    initialization();
  }, []);

  useEffect(() => {
    if (areNotificationsAllowed === undefined) return;
    const usSubscriberListenerForegroundNotification =
      messaging().onMessage(onMessageReceived);

    messaging().onNotificationOpenedApp(firebaseHeadlessHandler);
    messaging()
      .getInitialNotification()
      .then(
        remoteMessage => remoteMessage && firebaseHeadlessHandler(remoteMessage)
      );

    return () => {
      usSubscriberListenerForegroundNotification();
    };
  }, [areNotificationsAllowed]);

  return {
    checkNotificationPermission,
    requestUserPermission
  };
};

export interface UseFirebaseProps {
  onMessage?: <T = unknown>(message: T) => void;
}

export default useFirebase;
