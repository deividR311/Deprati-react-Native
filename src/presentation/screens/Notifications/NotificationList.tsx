import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS } from '../../../application/common/colors';
import { FONTS_SIZES } from '../../../application/common/fonts';
import { TrashIcon } from '../../../../assets/icons';
import { stylesNoti } from './notification.stylesheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItemList from './components/ItemList';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import useNotifications from './hooks/useNotifications';
import NotNotifications from './NotNotifications';
import SkeletonNotifications from './SkeletonNotifications';
import TemplatePage from '../../common-components/template-page';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';

export default function NotificationList() {
  const navigation = useNavigation();
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    data,
    isDeleting,
    isLoading,
    isError,
    isSuccessListNoti,
    handleDeleteNotification,
    handleGetNotifications,
    handleToRefresh,
    refreshing
  } = useNotifications();

  useLayoutEffect(() => {
    // handleGetNotifications()
    navigation?.setOptions({
      headerTitle: 'Mis notificaciones'
    });
  }, []);

  return (
    <TemplatePage
      loading={isLoading || !isSuccessListNoti}
      loadingWithModal={false}
      skeleton={<SkeletonNotifications />}
      error={isError && !data?.length}>
      <View style={{ flex: 1 }}>
        {data?.length ? (
          <SwipeListView
            recalculateHiddenLayout={true}
            useAnimatedList={true}
            useNativeDriver={true}
            data={data || []}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleToRefresh}
              />
            }
            style={stylesNoti.container}
            contentContainerStyle={{
              paddingBottom: HEIGHT_TAB_BAR + 20
            }}
            renderItem={item => <ItemList data={item} />}
            renderHiddenItem={info => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleDeleteNotification(info.item.id);
                }}
                style={stylesNoti.btnDelete}>
                {isDeleting ? (
                  <ActivityIndicator size="small" color={COLORS.WHITE} />
                ) : (
                  <TrashIcon />
                )}
                <Text
                  style={{ color: COLORS.WHITE, fontSize: FONTS_SIZES.legal }}>
                  Borrar
                </Text>
              </TouchableOpacity>
            )}
            stopLeftSwipe={92}
            stopRightSwipe={0}
            leftOpenValue={92}
            rightOpenValue={0}
          />
        ) : (
          <NotNotifications />
        )}
      </View>
    </TemplatePage>
  );
}
