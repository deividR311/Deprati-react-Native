import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Text, View } from 'react-native';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useDeleteNotificationRequest,
  useNotificationDetailRequest,
  useNotificationsListRequest
} from '../../../../infrastucture/apis/notifications/notifications.api';
import { NotificationListRes } from '../../../../infrastucture/apis/notifications/notifications.interfaces';

export default function useNotifications(notification?: number) {
  const { localStorageData, save } = useLocalStorage();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setlist] = useState<NotificationListRes[]>([]);
  const [indexToDeleted, setindexToDeleted] = useState(0);
  // obtener detalle de notificacion
  const [
    notificationDetail,
    { data: dataDetail, isError: EroorDetail, isLoading: isLoadingDetail }
  ] = useNotificationDetailRequest();
  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity
    }
  };

  // deleted notification hook
  const [
    deleteNotification,
    { isLoading: isDeleting, isError: deletedIsError, data: deletedData }
  ] = useDeleteNotificationRequest();

  // obtener lista de notificaciones
  const [getNotifications, { data, isLoading, isError, isSuccess }] =
    useNotificationsListRequest({});

  useEffect(() => {
    if (localStorageData[LocalStorageKey.IsLogin]) {
      getNotifications({});
    }
  }, [localStorageData[LocalStorageKey.IsLogin]]);

  // borrar notificacion
  const handleDeleteNotification = (id: number) => {
    setindexToDeleted(id);
    deleteNotification({
      id
    });
  };

  const handleToRefresh = async () => {
    setRefreshing(true);
    await getNotifications({});
    setRefreshing(false);
  };
  useEffect(() => {
    if (data) {
      setlist(data?.data?.notifications);
      save({
        [LocalStorageKey.Notifications]: {
          unread: data?.data?.unread,
          notifications: data?.data?.notifications
        }
      });

      setRefreshing(false);
    }
  }, [data?.data?.notifications]);

  useEffect(() => {
    if (deletedIsError) return;
    const filterResult = list.filter(item => item.id !== indexToDeleted);
    setlist(filterResult);
    LayoutAnimation.configureNext(layoutAnimConfig);
    save({
      [LocalStorageKey.Notifications]: {
        unread: data?.data?.unread ?? 0,
        notifications: filterResult
      }
    });
  }, [deletedIsError, isDeleting]);

  useEffect(() => {
    if (notification) {
      notificationDetail({
        id: notification
      });
    }
  }, []);
  return {
    handleGetNotifications: getNotifications,
    handleDeleteNotification,
    handleToRefresh,
    refreshing,
    data: data?.data?.notifications ?? [],
    unreadCont: data?.data?.unread ?? 0,
    isSuccessListNoti: isSuccess,
    isError,
    deletedIsError,
    isDeleting,
    isLoading,
    isLoadingDetail,
    EroorDetail,
    dataDetail
  };
}
