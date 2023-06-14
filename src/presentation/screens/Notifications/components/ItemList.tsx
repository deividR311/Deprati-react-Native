import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import { stylesNoti } from '../notification.stylesheet';
import { FontStyles } from '../../../../application/common/fonts';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationRoute } from '../../../navigation/account';
import { COLORS } from '../../../../application/common/colors';
import moment from 'moment';
interface Iprops {
  data: any;
}
export default function ItemList({ data }: Iprops): JSX.Element {
  const navigation = useNavigation();
  const nowDate = moment();
  const itemTime = moment(data.item.timestamp);
  const diffHour = nowDate.diff(itemTime, 'hours');
  const diffMinutes = nowDate.diff(itemTime, 'minutes');
  const diffSeconds = nowDate.diff(itemTime, 'seconds');
  const diffDays = nowDate.diff(itemTime, 'days');

  const calculateTime = (): string => {
    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHour > 0) {
      return `${diffHour}h`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m`;
    } else if (diffSeconds > 0) {
      return `${diffSeconds}s`;
    } else {
      return 'ahora';
    }
  };

  return (
    <Animated.View
      style={{
        ...stylesNoti.container_row,
        backgroundColor: data.item.isnew ? COLORS.GRAYDARK20 : COLORS.WHITE
      }}>
      <View style={stylesNoti.container_title}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              AccountNavigationRoute.Detail_Notification as never,
              {
                detail: data.item
              } as never
            )
          }>
          <Text style={FontStyles.Body_1}>
            {data.item.title.length > 40
              ? `${data.item.title.substring(0, 40)}...`
              : data.item.title}
          </Text>
        </TouchableOpacity>

        <Text style={FontStyles.Caption}>{calculateTime()}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            AccountNavigationRoute.Detail_Notification as never,
            {
              detail: data.item
            } as never
          )
        }>
        <Text style={[FontStyles.Body_2, { color: COLORS.GRAYDARK60 }]}>
          {data.item.shortDescription.length > 40
            ? `${data.item.shortDescription.substring(0, 40)}...`
            : data.item.shortDescription}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
