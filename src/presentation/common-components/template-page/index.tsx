import React from 'react';
import { SafeAreaView, View, Modal } from 'react-native';
import ErrorPage from '../../screens/ErrorPage';
import NoFoundPage from '../../screens/NoFoundPage/NoFoundPage';
import { useNetInfo } from '@react-native-community/netinfo';
import ModalLoading from '../modal/ModalLoading';
import { COLORS } from '../../../application/common';
import { ActivityIndicator } from 'react-native-paper';
interface Props {
  loading: boolean;
  error?: boolean;
  noFoundPage?: boolean;
  isTab?: boolean;
  loadingWithModal?: boolean;
  disableSkeleton?: boolean;
  skeleton?: React.ComponentType<any> | React.ReactElement | null | undefined;
  errorSkeleton?: React.ComponentType<any> | React.ReactElement | null;
  children?: React.ReactNode;
}

const TemplatePage = (props: Props) => {
  const {
    children,
    loading,
    loadingWithModal,
    disableSkeleton = false,
    error,
    skeleton,
    errorSkeleton,
    isTab,
    noFoundPage
  } = props;

  // const { isConnected = true, isInternetReachable = true } = useNetInfo()
  // const hasInternetConnection = isConnected && isInternetReachable
  // if (!hasInternetConnection) return <ErrorPage isTab={isTab} />

  if (noFoundPage) return <NoFoundPage />;
  if (error)
    return errorSkeleton ? (
      <SafeAreaView style={{ flex: 1 }}>{errorSkeleton}</SafeAreaView>
    ) : (
      <ErrorPage isTab={isTab} />
    );
  if (loading && !disableSkeleton)
    return skeleton ? (
      <SafeAreaView style={{ flex: 1 }}>
        {skeleton}
        <Modal transparent visible={loadingWithModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffffb3',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <ActivityIndicator size="large" color={COLORS.BRAND} />
          </View>
        </Modal>
      </SafeAreaView>
    ) : null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}
      <Modal transparent visible={disableSkeleton && !!loadingWithModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffffb3',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <ActivityIndicator size="large" color={COLORS.BRAND} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TemplatePage;
