import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { clickEventMap } from './clickEventMap';
import { trackEventEmma } from './emma';
import { tokensEmma } from './tokensMap';

export const useEmmaSdk = (props: any) => {
  const { route } = props ?? {};
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const { routeNames, index } = navigationState;

  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      const nameScreen = route?.name ?? routeNames[index];
      trackEventView(nameScreen);
    }
  }, [focused]);

  const trackEventView = (nameScreen: string) => {
    try {
      const token = tokensEmma[nameScreen];
      //console.log('useEmmaSdk', nameScreen, token)
      token && trackEventEmma(token);
    } catch (error) {}
  };

  const trackEventModal = (nameScreen: string) => {
    try {
      if (nameScreen) {
        const token = tokensEmma[nameScreen];
        //console.log('useEmmaSdk', nameScreen, token)
        token && trackEventEmma(token);
      }
    } catch (error) {}
  };

  const trackEventclick = (keyEvent: string, eventAttributes?: any) => {
    try {
      if (keyEvent) {
        const tokenclick = clickEventMap[keyEvent]?.token;
        //console.log('trackEventclick', keyEvent, tokenclick, eventAttributes)
        if (tokenclick) {
          trackEventEmma(
            clickEventMap[keyEvent]?.token,
            eventAttributes ?? clickEventMap[keyEvent]?.eventAttributes
          );
        }
      }
    } catch (error) {}
  };

  return {
    trackEventclick,
    trackEventModal
  };
};

export const trackEventclick = (keyEvent: string, eventAttributes?: any) => {
  try {
    if (keyEvent) {
      const tokenclick = clickEventMap[keyEvent]?.token;
      /* console.log(
        'funtion -> trackEventclick',
        keyEvent,
        tokenclick,
        eventAttributes,
      ) */
      if (tokenclick) {
        trackEventEmma(
          clickEventMap[keyEvent]?.token,
          eventAttributes ?? clickEventMap[keyEvent]?.eventAttributes
        );
      }
    }
  } catch (error) {}
};

export const trackEventView = (nameScreen: string, eventAttributes?: any) => {
  try {
    const token = tokensEmma[nameScreen];
    //console.log('funtion -> trackEventView', nameScreen, token, eventAttributes)
    token && trackEventEmma(token, eventAttributes);
  } catch (error) {}
};
