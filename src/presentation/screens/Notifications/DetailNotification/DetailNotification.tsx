import { View, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect } from 'react';
import WebView from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HEIGHT_TAB_BAR } from '../../../../application/common/layout';
import useNotifications from '../hooks/useNotifications';
import { COLORS } from '../../../../application/common';

export default function DetailNotification() {
  const route = useRoute();
  const { dataDetail, isLoadingDetail } = useNotifications(
    route.params?.detail?.id
  );

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: route.params.detail.title
    });
  }, []);

  if (isLoadingDetail) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.BRAND} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingBottom: HEIGHT_TAB_BAR }}>
      <WebView
        cacheEnabled={false}
        containerStyle={{ flex: 1 }}
        renderLoading={() => <ActivityIndicator />}
        source={{ html: dataDetail?.data.content ?? '' }}
        androidHardwareAccelerationDisabled
      />
    </View>
  );
}
