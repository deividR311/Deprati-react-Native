import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { MainButton } from '../../../../common-components/buttons/Button';
import { OrdersNavigationRoute } from '../../../../navigation/account/my-orders/my-orders.navigator';
import { styles } from './stylesOrdersMade';
import { t } from 'i18next';

export default function CardOrdersMade({
  date,
  code,
  totalUnits,
  price,
  stateOrder,
  asmAgent
}: {
  date: string | Date;
  code: string;
  totalUnits: number;
  price: string;
  stateOrder: string;
  asmAgent?: string;
}) {
  const navigation = useNavigation();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <View style={styles.viewCard__content}>
        <View style={styles.viewCard__content_info}>
          <View style={{ marginVertical: 10, marginHorizontal: 16 }}>
            <Text style={styles.containerTitle}>
              {`${t('orderNumber2')}${code}`}
            </Text>
            <Text style={styles.subtitle}>
              {`${t('date2')} ${moment(date).format('DD/MM/YYYY')}`}
            </Text>
            <Text style={styles.subtitle}>
              {`${t('paymentStatus')} ${stateOrder}`}
            </Text>
            <Text style={styles.subtitle}>
              {`${t('articles')} ${totalUnits}`}
            </Text>
            {asmAgent && (
              <Text style={styles.subtitle}>
                {`${t('serviceAgent')} ${asmAgent}`}
              </Text>
            )}
            <Text style={styles.subtitle}>{`${t('total')} ${price}`}</Text>
          </View>
        </View>
      </View>
      <MainButton
        style={styles.buttonDetails}
        title={`${t('APP_BOTON_LABEL.seeDetails')}`}
        onPress={() => {
          navigation.navigate(
            OrdersNavigationRoute.OrderDetails as never,
            { orderId: code, userEmail: USER_EMAIL } as never
          );
        }}
      />
    </View>
  );
}
