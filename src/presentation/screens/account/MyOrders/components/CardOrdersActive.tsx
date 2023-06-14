import React, { useMemo } from 'react';
import moment from 'moment';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import {
  ImageFormat,
  ImageType
} from '../../../../../application/utils/type-format-Image';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import { IImageMyOrder } from '../../../../../infrastucture/apis/customer-orders';
import { styles } from './stylesOrdersActive';
import {
  useLocalStorage,
  LocalStorageKey
} from '../../../../../application/state-manager/services/localstorage';
import { OrdersNavigationRoute } from '../../../../navigation/account/my-orders/my-orders.navigator';
import { t } from 'i18next';

interface CardOrdersActiveProps {
  imagesOrder: IImageMyOrder[];
  date: string | Date;
  code: string;
  totalUnits: number;
  price: string;
  asmAgent?: string;
}

export default function CardOrdersActive({
  imagesOrder,
  date,
  code,
  totalUnits,
  price,
  asmAgent
}: CardOrdersActiveProps) {
  const navigation = useNavigation();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const imageUrl = useMemo(() => {
    if (imagesOrder?.length > 0) {
      const image = imagesOrder?.find(
        img =>
          img?.format === ImageFormat.PRODUCT &&
          img?.imageType === ImageType.PRIMARY
      );
      return image?.url ?? null;
    }

    return null;
  }, [imagesOrder]);

  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <Pressable
        onPress={() => {
          navigation.navigate(
            OrdersNavigationRoute.OrderDetails as never,
            {
              orderId: code,
              userEmail: USER_EMAIL
            } as never
          );
        }}>
        <View style={styles.viewCard__content}>
          <View style={styles.viewCard__content_image}>
            <Image
              source={{ uri: getUrlImageHybris(imageUrl ?? '') }}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <View style={styles.viewCard__content_info}>
            <Text style={styles.containerTitle}>
              {`${t('orderPlacedOn')}\n${moment(date).format('DD/MM/YYYY')}`}
            </Text>
            <Text style={styles.subtitle}>{`${t('order')} ${code}`}</Text>
            <Text style={styles.subtitle}>{`${t(
              'articles'
            )} ${totalUnits}`}</Text>
            {asmAgent && (
              <Text style={styles.subtitle} numberOfLines={2}>
                {`${t('serviceAgent')} ${asmAgent}`}
              </Text>
            )}
            <View style={{ flex: 1 }} />
            <Text style={styles.price}>{`${t('total')} ${price}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
