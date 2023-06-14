import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {
  AnalyticEvent,
  LogArgs,
  RawAnalyticsLoggerArgs
} from './analitics.interfaces';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import Analytics from 'appcenter-analytics';

export const useAnalytics = () => {
  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: username,
      [LocalStorageKey.User]: UserInfo,
      [LocalStorageKey.UID]: DeviceId
    }
  } = useLocalStorage();

  /**
   * @description - This function is used to send an event to the crash-analytic service.
   * @param args ErrorArgs
   */
  const log = async (args: LogArgs) => {
    const { tag, attributes = 'None', error } = args;
    crashlytics().log(tag);

    await Promise.all([
      crashlytics().setUserId(UserInfo.uid ?? 'None'),
      crashlytics().setAttributes({
        deviceId: DeviceId,
        customerId: UserInfo.customerId ?? 'guest',
        username: username ?? 'guest',
        attributes: JSON.stringify(attributes)
      })
    ]);
    error && crashlytics().recordError(error, tag);
    __DEV__ && console.log(`[${tag}]`, { attributes, error });
  };

  /**
   * @description - This function is used to send an event to the analytics service.
   * @param event AnalyticEvent
   * @param attributes Record<string, unknown> | string,
   */
  const trackEvent = async (
    event: AnalyticEvent,
    attributes: Record<string, unknown>
  ) => {
    await analytics().logEvent(event, {
      username: username ?? 'guest',
      customerId: UserInfo.customerId ?? 'None',
      deviceId: DeviceId,
      ...attributes
    });
  };

  const trackScreen = async (screenName?: string) => {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName
    });
  };

  return {
    log,
    trackEvent,
    trackScreen
  };
};

export const rawAnalyticsLogger = async <T>(
  args: RawAnalyticsLoggerArgs<T>
): Promise<void> => {
  const {
    event,
    deviceId,
    customerId = 'None',
    username = 'None',
    attributes = undefined
  } = args;
  Analytics.trackEvent(event, {
    deviceId,
    customerId,
    username,
    ...attributes
  });
  await analytics().logEvent(event, {
    deviceId,
    customerId,
    username,
    ...attributes
  });
};
