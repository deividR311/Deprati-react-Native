import React from 'react';
import { View, Text } from 'react-native';
import { formatToCurrecy } from '../../../../application/utils/currency';
import { styles } from '../../CreditMovement/CreditMovement.stylesheet';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { t } from 'i18next';

interface Props {
  contentPayment: any;
  loading: boolean;
  stylesCustom?: any;
}

const NextPayment = (props: Props) => {
  const { stylesCustom = {}, loading = false } = props;
  const { nextPayDay, nextAmountToPay } = props?.contentPayment ?? {};

  return (
    <View style={[styles.nextPayment, stylesCustom?.nextPayment]}>
      <Text style={[styles.nextPayment__title_text]}>{t('nextPay')}</Text>
      <View style={[styles.nextPayment__data]}>
        {loading ? (
          <SkeletonContent
            isLoading={true}
            layout={[{ key: 'title', width: '100%', height: 25 }]}
          />
        ) : (
          <>
            <Text style={[styles.nextPayment__data_date]}>
              {nextPayDay ?? ''}
            </Text>
            <Text style={[styles.nextPayment__data_price]}>
              {formatToCurrecy(nextAmountToPay ?? 0)}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default NextPayment;
