import { useEffect, useState } from 'react';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { useValidContactlesspaymentHook } from '../../../../infrastucture/apis/creditAccountBonding/validContactlesspayment.hook';
import { useLazyVerifySiteEnabledQuery } from '../../../../infrastucture/apis/dhealthCheck/dhealthCheck.api';
import { useMessageAppRequest } from '../../../../infrastucture/apis/messages/messageApp.api';
import {
  changeApplicationCode,
  changeMerchantId,
  setContactEmarsys
} from '../../../../infrastucture/native-modules/emarsys/emarsys';
import _keyBy from 'lodash/keyBy';
import { handleStartSessionEmma } from '../../../../infrastucture/native-modules/emma';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NAV } from '../../../../application/common';
import { getUniqueId } from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';
import {
  DataCustomerService,
  useContentServiceMutation
} from '../../../../infrastucture/apis/contentService';

export const MAXDAY = 60;
export const TIME_NO_CONNECTED = 3000;
export const TIME_CONNECTED = 900;

export const useSplash = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [hasError, setHasError] = useState(false);
  const {
    localStorageData: {
      [LocalStorageKey.WasStoreRead]: wasStoreRead,
      [LocalStorageKey.UID]: DEVICE_ID,
      [LocalStorageKey.isAppOpenByFirstTime]: SHOW_WELCOME = true,
      [LocalStorageKey.UserLastEntry]:
        USER_LAST_ENTRY = new Date().toISOString(),
      [LocalStorageKey.User]: LocalUserData
    },
    save: saveInLocalStorage,
    readAndStorageInState
  } = useLocalStorage();

  const { data: dataMessageApp } = useMessageAppRequest({});
  const [getVerifySiteEnabledApi, { data: dataVerifySiteEnabledApi }] =
    useLazyVerifySiteEnabledQuery();
  const { validVinculation } = useValidContactlesspaymentHook();

  const [
    getCustomerServicesInfo,
    { data: infoCustomerServices, isError: errorCustomerServiceInfo }
  ] = useContentServiceMutation();

  const timeSleep = netInfo.isConnected ? TIME_CONNECTED : TIME_NO_CONNECTED;
  const validateSite = () => {
    if (dataVerifySiteEnabledApi?.status === 'ok') {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleTimeot = () => {
    getCustomerServicesInfo({
      content: 'customerService'
    });
    handleKeychain();

    setTimeout(() => {
      handleLastEntry();
    }, timeSleep);
  };

  const handleDaysDifference = (lastDay: string | Date) => {
    let diff = new Date().getTime() - new Date(lastDay).getTime();
    let daysDifference = Math.round(diff / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const handleKeychain = async () => {
    try {
      if (DEVICE_ID) return;
      const uniqueId = await getUniqueId();
      const uniqueIdKeychain = await Keychain.getInternetCredentials(
        LocalStorageKey.UID
      );
      if (!uniqueIdKeychain) {
        Keychain.setInternetCredentials(
          LocalStorageKey.UID,
          uniqueId,
          uniqueId
        );
      }

      saveInLocalStorage({
        [LocalStorageKey.UID]: uniqueIdKeychain?.username ?? uniqueId
      });
    } catch (error) {}
  };

  const handleLastEntry = () => {
    const difference = handleDaysDifference(USER_LAST_ENTRY);
    const showWelcome = SHOW_WELCOME || difference > MAXDAY;

    saveInLocalStorage({
      [LocalStorageKey.UserLastEntry]: new Date().toISOString(),
      [LocalStorageKey.isAppOpenByFirstTime]: false
    });
    showWelcome
      ? navigation.reset({
          index: 0,
          routes: [{ name: NAV.WELCOME as never }]
        })
      : navigation.reset({
          index: 0,
          routes: [{ name: NAV.DASHBOARD_NAVIGATION as never }]
        });
  };

  useEffect(() => {
    if (!infoCustomerServices) return;
    if (!infoCustomerServices.success) return;
    const data = infoCustomerServices.data as DataCustomerService;
    const { whatsappMessage, whatsappPhoneNumber } = data.customerService;
    saveInLocalStorage({
      [LocalStorageKey.Whatsapp]: {
        message: whatsappMessage,
        phone: whatsappPhoneNumber
      }
    });
  }, [infoCustomerServices]);
  useEffect(() => {
    readAndStorageInState();
    getVerifySiteEnabledApi();
  }, []);

  useEffect(() => {
    if (LocalUserData?.uid) validVinculation();
  }, [LocalUserData?.uid]);

  useEffect(() => {
    if (dataMessageApp?.success) {
      const messages_map = _keyBy(dataMessageApp?.data, function (item) {
        return item.service;
      });
      saveInLocalStorage({
        [LocalStorageKey.MessagesApp]: messages_map
      });
    }

    changeApplicationCode();
    changeMerchantId();
    handleStartSessionEmma();
    if (LocalUserData?.emarsysClientId) {
      setContactEmarsys(LocalUserData.emarsysClientId);
    }
  }, [LocalUserData?.emarsysClientId, dataMessageApp?.success]);

  useEffect(() => {
    if (dataVerifySiteEnabledApi?.status) {
      validateSite();
    }
  }, [dataVerifySiteEnabledApi]);

  useEffect(() => {
    if (dataVerifySiteEnabledApi === undefined) return;
    if (dataVerifySiteEnabledApi?.status !== 'ok') return;
    if (wasStoreRead) handleTimeot();
  }, [wasStoreRead, dataVerifySiteEnabledApi]);

  return {
    hasError
  };
};
