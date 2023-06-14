import { useEffect, useState } from 'react';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';
import { useLocalStorage } from '../../state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../state-manager/services/localstorage';
import * as Keychain from 'react-native-keychain';

export default function useBiometrics(props: UseBiometricsProps = {}) {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true
  });
  const { onBiometricRead } = props;
  const [loadingAuth, setloadingAuth] = useState(false);
  const [isValidSensor, setisValidSensor] = useState(false);
  const [hasKeychain, setKeychain] = useState(false);
  const [biometricsSuccess, setBiometricsSuccess] = useState(false);
  const [biometricsType, setbiometricsType] = useState<
    BiometryType | undefined
  >();

  const {
    save: saveInLocalStorage,
    localStorageData: {
      [LocalStorageKey.BiometricPublicKey]: biometricPublicKey
    }
  } = useLocalStorage();

  const saveSignature = async (signature: string) => {
    /** @todo: save public key in keychain storage */
    saveInLocalStorage({
      [LocalStorageKey.BiometricPublicKey]: signature
    });
  };

  const recoverSignature = async (): Promise<string> => {
    /** @todo: recover public key from keychain storage */
    // decrypt signature SHA256withRSA

    return biometricPublicKey;
  };

  const _initBiometrics = async () => {
    const sensorInfo = await rnBiometrics.isSensorAvailable();
    setbiometricsType(sensorInfo.biometryType);
    setisValidSensor(!!sensorInfo?.available);
    if (!sensorInfo.available) return;
    await handleKeychain();
    try {
      let createKeyResult = await rnBiometrics.biometricKeysExist();
      if (!createKeyResult?.publicKey) {
        createKeyResult = await rnBiometrics.createKeys();
      }
      const { publicKey } = createKeyResult;
      await saveSignature(publicKey);
    } catch (error) {
      console.log('(useBiometrics)[error]', error.message);
    }
  };

  const saveKeysBiometrics = (values: { email: string; password: string }) => {
    Keychain.setGenericPassword(values?.email, values?.password, {
      service: 'Authorization',
      authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS
    });
  };

  const handleKeychain = async () => {
    const keychain = await Keychain.getGenericPassword({
      service: 'Authorization'
    });
    if (keychain?.username) setKeychain(true);
    return keychain;
  };

  const readBiometrics = async (): Promise<{
    email?: string;
    password?: string;
    error?: unknown;
  }> => {
    setloadingAuth(true);
    let response = {};

    try {
      const publicKey = await recoverSignature();
      const { success, signature, error } = await rnBiometrics.createSignature({
        promptMessage: 'Ingresa a tu cuenta',
        cancelButtonText: 'Cancelar',
        payload: 'some message'
      });

      if (error) throw new Error(error);
      if (!success || !signature || !publicKey) {
        throw new Error('No se pudo leer la huella');
      }
      const { username: email = '', password = '' } =
        (await handleKeychain()) || {};
      response = { email, password };
      setBiometricsSuccess(true);
    } catch (error) {
      setBiometricsSuccess(false);
      response = { error };
    }
    setloadingAuth(false);
    return response;
  };

  useEffect(() => {
    _initBiometrics();
  }, []);

  return {
    loadingAuth,
    isValidSensor,
    readBiometrics,
    biometricsType,
    hasKeychain,
    saveKeysBiometrics,
    biometricsSuccess
  };
}

export interface BiometricSignatureData {
  success: boolean;
  signature?: string;
  error?: string;
}

export interface UseBiometricsProps {
  onBiometricRead?: (signature: BiometricSignatureData) => void;
}
