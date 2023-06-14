import { View, Text, Linking, Alert, Platform } from 'react-native';
import React from 'react';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { COLORS } from '../colors';

export default function useOpenLinkInApp() {
  async function openLink(
    urlLink: string = 'wwww.google.com'
  ): Promise<boolean> {
    try {
      const url = urlLink;
      const browserIsAvailable = await InAppBrowser.isAvailable();
      const supported = await Linking.canOpenURL(url);

      if (!browserIsAvailable && !supported) {
        Alert.alert(
          'Es necesario tener instalado un navegador para abrir este enlace'
        );
        return false;
      }

      if (!browserIsAvailable && supported) {
        Linking.openURL(url);
        return true;
      }

      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'close',
        preferredControlTintColor: 'black',
        readerMode: true,
        animated: true,
        toolbarColor: COLORS.BRAND,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: true,
        // Android Properties
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
      });
      return true;
    } catch (error) {
      console.log('>>> OpenURL Link has next error: ', error);
      return false;
    }
  }
  return openLink;
}

export const useWhatsapp = () => {
  const openLink = useOpenLinkInApp();
  const openChatWith = async (
    phoneNumber: string,
    message: string
  ): Promise<boolean> => {
    const mobileNumber = Platform.select({
      ios: phoneNumber.replace('+', ''),
      default: phoneNumber
    });
    try {
      await Linking.openURL(
        `whatsapp://send?text=${message}&phone=${mobileNumber}`
      );
      return true;
    } catch (error) {
      try {
        await openLink(
          `https://wa.me/${mobileNumber.replace('+', '')}?text=${message}`
        );
        return true;
      } catch (_error) {
        console.log('>>> OpenWhatsapp Error: ', {
          error,
          _error,
          mobileNumber,
          message
        });
        return false;
      }
    }
  };
  return [openChatWith];
};
