import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import Splash from './components/Splash';
import _keyBy from 'lodash/keyBy';
import { useRefreshToken } from '../../../infrastucture/apis/sign-in/useRefreshToken.hook';
import ErrorPage from '../ErrorPage';
import { useSplash } from './hooks/useSplash.hook';

export default function SplashScreen() {
  const netInfo = useNetInfo();
  const { hasError } = useSplash();
  useRefreshToken();

  if (hasError) return <ErrorPage isTab={false} isMaintenance={true} />;

  return <Splash isConnected={netInfo.isConnected} />;
}
