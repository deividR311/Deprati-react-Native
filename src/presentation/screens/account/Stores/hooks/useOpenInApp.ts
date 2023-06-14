import React from 'react';
import { Linking, Platform } from 'react-native';

export default function useOpenInApp() {
  const openUrl = React.useCallback((url: string) => {
    Linking.canOpenURL(url!).then(supported => {
      if (supported) {
        return Linking.openURL(url!);
      } else {
        const browser_url = `https://www.google.de/maps/@${url}`;
        return Linking.openURL(browser_url);
      }
    });
  }, []);

  const toCall = React.useCallback((tel: string) => {
    const action = `tel:${tel}`;
    Linking.canOpenURL(action).then(supported => {
      if (supported) {
        return Linking.openURL(action);
      } else {
        const browser_url = `https://www.google.de/maps/@${tel}`;
        return Linking.openURL(browser_url);
      }
    });
  }, []);

  const toNavigate = React.useCallback(
    (value: { latitude: string; longitude: string; search?: string }) => {
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      const action = value.search
        ? `${scheme}${value.latitude},${value.longitude}?q=${value.search}`
        : `${scheme}${value.latitude},${value.longitude} `;
      Linking.canOpenURL(action).then(supported => {
        if (supported) {
          return Linking.openURL(action);
        }
      });
    },
    []
  );

  return { openUrl, toCall, toNavigate };
}
