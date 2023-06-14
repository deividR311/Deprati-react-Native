import React, { FC, useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SupportTicketsNavigationParams,
  SupportTicketsNavigationRoute
} from '../../../navigation/account/support-tickets/support-tickets.navigator';
import {
  useFindOrderThatCanBeSupportTicketRequest,
  useOrdersCanBeSupportTicketsRequest
} from '../../../../infrastucture/apis/support-tickets/support-tickets.api';
import { COLORS, NAV } from '../../../../application/common';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import TemplatePage from '../../../common-components/template-page';
import { SkeletonList } from './components/skeleton-list';
import { OrderCard } from './components/order-card';
import {
  MyOrder,
  PaymentStatusDisplay,
  PaymentStatusDisplayMap
} from '../../../../infrastucture/apis/customer-orders';
import { MyClaimsListFooter } from './components/my-claims-list-footer';
import { MyClaimsListHeader } from './components/my-claims-list-header';
import { EmptyList } from './components/list-empty';
import Button from '../../../common-components/buttons/Button';
import { Popup } from '../../../common-components/poppup';
import { CustomKeyboardAvoidingView } from './components/custom-keyboard-avoiding-view';
import { t } from 'i18next';

export const OrdersScreen: FC<OrdersProps> = props => {
  const MAX_ITEMS_PER_PAGE = 5;

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USERNAME }
  } = useLocalStorage();

  const { data, isLoading, isError } = useOrdersCanBeSupportTicketsRequest({
    username: USERNAME,
    currentPage: 0,
    pageSize: 30
  });

  const [
    doFindOrderById,
    {
      isLoading: isLoadingByFindOrder,
      data: orderFound,
      error: errorByFindOrder
    }
  ] = useFindOrderThatCanBeSupportTicketRequest();

  const [orders, setOrders] = React.useState<MyOrder[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const listRef = useRef<FlatList>(null);

  const onPressContinueButton = () => {
    props.navigation.navigate(NAV.HOME as never);
  };

  const onPressOrder = (order: MyOrder) => {
    props.navigation.navigate(SupportTicketsNavigationRoute.SupportTicketForm, {
      order
    });
  };

  const onSearchOrder = (text: string) => {
    doFindOrderById({ username: USERNAME, orderNumber: text });
  };

  const onSelectPage = (page: number) => {
    let index = (page - 1) * MAX_ITEMS_PER_PAGE;
    let _orders = data?.orders.slice(index, MAX_ITEMS_PER_PAGE + index);
    setOrders(_orders || []);
  };

  useEffect(() => {
    if (!data?.orders) return;
    setOrders(data.orders.slice(0, MAX_ITEMS_PER_PAGE));
    const _totalPages = Math.ceil(data.orders.length / MAX_ITEMS_PER_PAGE);
    setTotalPages(_totalPages);
  }, [data]);

  useEffect(() => {
    if (!errorByFindOrder) return;
    setShowPopup(true);
  }, [errorByFindOrder]);

  useEffect(() => {
    if (!orderFound) return;

    const paymentStatusDisplay = PaymentStatusDisplayMap[
      orderFound.paymentStatus as keyof typeof PaymentStatusDisplayMap
    ] as PaymentStatusDisplay;

    props.navigation.navigate(SupportTicketsNavigationRoute.SupportTicketForm, {
      order: {
        placed: new Date(orderFound.created ?? ''),
        code: orderFound.code,
        paymentStatusDisplay,
        totalUnitCount: orderFound.totalItems ?? 0,
        //@ts-ignore
        total: orderFound.totalPriceWithTax ?? {
          formattedValue: '0.00'
        }
      }
    });
  }, [orderFound]);

  return (
    <TemplatePage
      loading={isLoading}
      error={isError}
      skeleton={<SkeletonList />}>
      <FlatList
        data={orders}
        ref={listRef}
        ListEmptyComponent={
          <>
            <EmptyList text={t('noPurchaseAvailable')} />
            <Button
              onPress={onPressContinueButton}
              marginTop={6}
              linkName="SEGUIR COMPRANDO"
              backgroundColor={COLORS.BRAND}
              textColor={COLORS.WHITE}
              containerStyle={styles.button}
            />
          </>
        }
        initialNumToRender={MAX_ITEMS_PER_PAGE}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: order, index }) => (
          <OrderCard
            order={order}
            previousPlace={data?.orders[index - 1]?.placed}
            onPress={onPressOrder}
          />
        )}
        ListHeaderComponent={
          orders.length === 0 ? undefined : <MyClaimsListHeader />
        }
        ListFooterComponent={
          <CustomKeyboardAvoidingView
            onKeyboardChangeState={() => listRef.current?.scrollToEnd()}>
            <MyClaimsListFooter
              totalPages={totalPages}
              onSelectPage={onSelectPage}
              onSearchOrder={onSearchOrder}
              isLoading={isLoadingByFindOrder}
              showSearchSection={(data?.orders.length ?? 0) > 5}
            />
          </CustomKeyboardAvoidingView>
        }
      />
      <Popup
        showCloseButton
        visible={showPopup}
        closeAction={() => setShowPopup(false)}
        buttonAction={() => setShowPopup(false)}
        title={
          // @ts-ignore
          errorByFindOrder?.data?.errors
            ?.map(({ message = '' }) => message)
            .join(`\n`) ?? t('orderNumberNoExist')
        }
        buttonType="full"
        buttonText="ACEPTAR"
      />
    </TemplatePage>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 80
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.LIGHTGRAY,
    marginHorizontal: 8
  },
  button: {
    marginHorizontal: 16
  }
});
export interface OrdersProps
  extends NativeStackScreenProps<
    SupportTicketsNavigationParams,
    SupportTicketsNavigationRoute.Orders
  > {}
