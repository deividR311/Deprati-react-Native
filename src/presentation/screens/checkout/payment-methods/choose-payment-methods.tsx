import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useAppDispatch } from '../../../../application/state-manager';
import { setShowLoadingScreen } from '../../../../application/state-manager/services/checkout';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  PaymentMethod,
  PaymentMethodType,
  useLazyPaymentMethodsRequest,
  usePaymentRemoveRequest
} from '../../../../infrastucture/apis/checkout/payment-methods';
import { useShoppingCart } from '../../../../infrastucture/apis/shopping-cart';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import TemplatePage from '../../../common-components/template-page';
import {
  CheckoutNavigationParams,
  CheckoutSteps
} from '../../../navigation/checkout';
import { ChoosePaymentMethodSkeleton } from './choose-payment.skeleton';
import { PaymentMethodLongCardButton } from './components/payment-method-long-card-button';
import { ListHeaderComponent } from './components/listHeader/ListHeaderComponent';

export const ChoosePaymentMethod: React.FC<
  ChoosePaymentMethodProps
> = props => {
  const { route } = props;
  const {
    params: { enableContinueButton }
  } = route;
  useEmmaSdk({ route });

  const hasFocused = useIsFocused();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [recomendedPaymentMethod, setRecomendedPaymentMethod] = useState<
    PaymentMethod | undefined | null
  >(null);
  const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();

  const {
    localStorageData: {
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.UserEmail]: username
    }
  } = useLocalStorage();

  const {
    data: { CartInfoFromRedux: dataCart }
  } = useShoppingCart();

  const [removePaymentMethod] = usePaymentRemoveRequest();
  const [getPaymentMethods] = useLazyPaymentMethodsRequest();

  const sortMethodsPayments = (item: PaymentMethod) => {
    switch (item?.code) {
      case PaymentMethodType.CreditCard:
        return 1;
      case PaymentMethodType.DePratiGiftCard:
        return 2;
      default:
        return 3;
    }
  };

  const onPressPaymentMethod = useCallback((paymentMethod: PaymentMethod) => {
    let route: CheckoutSteps | undefined;
    if (PaymentMethodType.AgaintsDelivery === paymentMethod.code)
      route = CheckoutSteps.PaymentAgaintsDelivery;
    if (PaymentMethodType.CashDeposit === paymentMethod.code)
      route = CheckoutSteps.PaymentCashDeposit;
    if (PaymentMethodType.CreditCard === paymentMethod.code)
      route = CheckoutSteps.PaymentCreditOrDebitCard;
    if (PaymentMethodType.DePratiCredit === paymentMethod.code)
      route = CheckoutSteps.PaymentDePratiCredit;
    if (PaymentMethodType.DePratiGiftCard === paymentMethod.code)
      route = CheckoutSteps.PaymentDePratiGiftCard;

    route &&
      props.navigation.navigate(
        route as never,
        {
          ...props.route.params,
          paymentMethod
        } as never
      );
  }, []);

  const onScreenGetFocuse = async () => {
    try {
      dispatch(setShowLoadingScreen(true));
      const { paymentInfo, code: cartId = '' } = dataCart ?? {};
      setPaymentMethods([]);
      setRecomendedPaymentMethod(null);
      paymentInfo &&
        (await removePaymentMethod({
          cartId,
          user: username
        }));

      const { data: { paymentMethods: _paymentMethods = [] } = {} } =
        await getPaymentMethods({
          cartId,
          user: username,
          token: TOKEN
        });

      setRecomendedPaymentMethod(
        _paymentMethods.find(
          pmb => pmb?.enabled && pmb?.code === PaymentMethodType.DePratiCredit
        )
      );
      setPaymentMethods(
        _paymentMethods
          .filter(
            pmb => pmb?.enabled && pmb?.code !== PaymentMethodType.DePratiCredit
          )
          .sort((a, b) => {
            const alvl = sortMethodsPayments(a);
            const blvl = sortMethodsPayments(b);
            return alvl - blvl;
          })
      );
    } catch (error) {
      setError(true);
      console.log('>>> Payment Methods Error', error);
    } finally {
      dispatch(setShowLoadingScreen(false));
    }
  };

  useEffect(() => {
    if (!hasFocused) return;
    enableContinueButton(false);
    onScreenGetFocuse();
  }, [hasFocused]);

  return (
    <TemplatePage
      isTab={false}
      error={hasError}
      loading={!paymentMethods?.length}
      disableSkeleton={false}
      loadingWithModal={false}
      skeleton={<ChoosePaymentMethodSkeleton />}>
      <FlatList
        numColumns={2}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        columnWrapperStyle={{ flexWrap: 'wrap' }}
        data={paymentMethods}
        ListHeaderComponent={
          <ListHeaderComponent>
            {recomendedPaymentMethod && (
              <PaymentMethodLongCardButton
                type={recomendedPaymentMethod.code}
                name={recomendedPaymentMethod.name}
                disabled={!recomendedPaymentMethod.enabled}
                onPress={() => onPressPaymentMethod(recomendedPaymentMethod)}
              />
            )}
          </ListHeaderComponent>
        }
        renderItem={({ item }) => {
          return (
            <PaymentMethodLongCardButton
              type={item.code}
              name={item.name}
              disabled={!item.enabled}
              onPress={() => onPressPaymentMethod(item)}
            />
          );
        }}
      />
      <View
        style={{
          height: Platform.OS === 'ios' ? 135 : 160
        }}
      />
    </TemplatePage>
  );
};

export interface ChoosePaymentMethodProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.ChoosePaymentMethod
  > {}
