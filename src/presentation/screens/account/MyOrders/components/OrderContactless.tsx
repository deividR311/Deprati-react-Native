//libs
import React from 'react';
import { Text, View } from 'react-native';
//styles
import { styles } from '../stylesMyOrders';
import { useOrderContactless } from '../hooks/useOrderContactless.hook';
import CardContactless from './CardContactless';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonOutlined } from '../../../../common-components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { SkeletonOrderContactless } from '../SkeletonOrders/SkeletonOrderContactless';
import { Divider } from 'react-native-paper';
import { t } from 'i18next';

export default function OrderContactless() {
  const navigate = useNavigation();
  const {
    tickets,
    isLoadingComplete,
    isSuccess,
    isError,
    totalOrders,
    handleNextPage,
    showNextPage
  } = useOrderContactless();

  if (isLoadingComplete) {
    return <SkeletonOrderContactless />;
  }

  return (
    <View>
      <Text
        style={[
          styles.orderOnline_title,
          {
            marginBottom: 0
          }
        ]}>
        {t('depratiContactlessPayment')}
      </Text>
      <Text style={styles.orderOnline_section_subtitle}>
        {`${totalOrders} ${t('ticketsFound')}`}
      </Text>
      {tickets?.map((ticket, index) => (
        <CardContactless key={index} ticket={ticket} />
      ))}
      {(isSuccess || isError) && tickets?.length === 0 && (
        <>
          <View style={styles.orderContactless_emptyStatus}>
            <View style={styles.orderContactless_emptyStatus_cicle}>
              <Icon
                name={'alert-circle-outline'}
                size={60}
                style={styles.orderContactless_emptyStatus_checkMarkIcon}
              />
            </View>
            <Text style={styles.orderContactless_emptyStatus_title}>
              {t('noPurchaseRegister')}
            </Text>
            <Text style={styles.orderContactless_emptyStatus_subtitle}>
              {t('firstContactlessPurchase')}
            </Text>
          </View>
          <ButtonOutlined
            title={'regresar'}
            style={styles.orderContactless_emptyStatus_btn}
            onPress={() => {
              navigate.goBack();
            }}
          />
        </>
      )}
      {showNextPage && (
        <View style={styles.orderOnline_nextMore_contain}>
          <Divider style={styles.row__separator} />
          <Text
            style={styles.orderOnline_nextMore_contain_text}
            onPress={() => handleNextPage()}>
            {t('APP_BOTON_LABEL.seeMore')}
          </Text>
        </View>
      )}
    </View>
  );
}
