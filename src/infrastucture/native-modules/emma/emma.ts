import EmmaSdk from 'emma-react-native-sdk';
import Config from '../../../application/common/dotEnv';

export const handleStartSessionEmma = async () => {
  try {
    const startSessionParams = {
      sessionKey: Config.EMMA_KEY,
      isDebug: __DEV__
    };
    await EmmaSdk.startSession(startSessionParams);
  } catch (err) {}
};

export const trackEventEmma = (
  eventToken: string,
  eventAttributes?: Record<string, string | number>
) => {
  try {
    if (eventToken) {
      EmmaSdk.trackEvent({
        eventToken,
        eventAttributes // optional
      });
    }
  } catch (err) {}
};
