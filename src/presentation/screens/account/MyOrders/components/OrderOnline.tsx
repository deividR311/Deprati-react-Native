//libs
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
//components
import { COLORS } from '../../../../../application/common/colors';
import { ButtonText } from '../../../../common-components/buttons/Button';
import CardOrderActive from './CardOrdersActive';
import CardOrdersMade from './CardOrdersMade';
import Pagination from './Pagination';
import NoOrders from './NoOrders';
//styles
import { styles } from '../stylesMyOrders';
//utils
import { useFocusEffect } from '@react-navigation/native';
import { useCustomerOrders } from '../hooks/useCustomerOrders.hook';
import { SkeletonMyOrders } from '../SkeletonOrders/SkeletonMyOrders';
import { formatDateOrders } from '../../../../../application/utils';
import { t } from 'i18next';

interface IOrderOnlineProps {
  onScroll(): void;
}

export default function OrderOnline(props: IOrderOnlineProps) {
  const [NoOrder, setNoOrder] = useState(false);
  const {
    VALUE_INITIAL,
    MAXORDER_ACTIVE,
    MAXORDER_MADE,
    handleGetCustomerOrders,
    isLoading,
    isSuccess,
    enableValidation,
    isErrorResult,
    ordersActive,
    ordersMade,
    filteredOrdersMade,
    handleMaxPage,
    prevPage,
    nextPage,
    changePage,
    sizeDataActive,
    setSizeDataActive,
    handleShow
  } = useCustomerOrders();

  useFocusEffect(
    useCallback(() => {
      handleGetCustomerOrders();
    }, [])
  );

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess && enableValidation) {
      if (
        ordersActive.length === 0 &&
        ordersMade.length === 0 &&
        !isErrorResult
      ) {
        setNoOrder(true);
      } else {
        setNoOrder(false);
      }
    }
  }, [ordersMade, ordersActive, isSuccess]);

  const handlePressMoreLess = () => {
    if (sizeDataActive === ordersActive.length) {
      props?.onScroll();
    }
    handleShow.handleShowMoreLess();
  };

  if (isLoading) {
    return <SkeletonMyOrders />;
  }

  if (NoOrder) return <NoOrders />;

  return (
    <View style={styles.orderOnline}>
      <Text style={styles.orderOnline_title}>{t('purchasesOnlineStore')}</Text>
      <Text style={styles.orderOnline_section_title}>{t('myOrders')}</Text>
      <Text style={styles.orderOnline_section_subtitle}>
        {t('pendingByDispatch')}
      </Text>

      {ordersActive.slice(VALUE_INITIAL, sizeDataActive).map((x, index) => (
        <CardOrderActive
          key={`CardOrderActive-${index}`}
          imagesOrder={x?.firstEntry?.product?.images}
          date={x.placed}
          code={x.code}
          totalUnits={x.totalUnitCount}
          price={x?.total?.formattedValue}
          asmAgent={x?.asmAgent}
        />
      ))}

      {ordersActive.length !== MAXORDER_ACTIVE && ordersActive.length !== 0 && (
        <ButtonText
          title={handleShow.titleMoreLess}
          styleText={{ color: COLORS.BRAND }}
          onPress={handlePressMoreLess}
        />
      )}

      <Divider style={styles.row__separator} />
      <Text style={styles.orderOnline_section_title}>
        {t('myOrdersRecievedAndCanceled')}
      </Text>
      {filteredOrdersMade().map((x, index) => (
        <View key={`CardOrdersMade-${index}`}>
          {x.month && (
            <View style={styles.dateOrdersMade}>
              <Text style={[styles.dateOrdersMade_text]}>
                {formatDateOrders(x.placed)}
              </Text>
            </View>
          )}
          {/* {!x.month && <Divider style={styles.divider} />} */}
          <CardOrdersMade
            date={x.placed}
            code={x.code}
            totalUnits={x.totalUnitCount}
            price={x.total.formattedValue}
            stateOrder={x.paymentStatusDisplay}
            asmAgent={x?.asmAgent}
          />
        </View>
      ))}
      {ordersMade.length > MAXORDER_MADE && (
        <Pagination
          maxPag={handleMaxPage()}
          onPrev={() => prevPage()}
          onNext={() => nextPage()}
          onPress={x => changePage(x)}
        />
      )}
    </View>
  );
}
