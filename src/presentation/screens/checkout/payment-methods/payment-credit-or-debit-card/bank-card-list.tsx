import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  COLORS,
  FONTS_FAMILY,
  FontStyles
} from '../../../../../application/common';
import { useAppSelector } from '../../../../../application/state-manager';
import { isGiftCardCartShoppingCart } from '../../../../../application/state-manager/services/checkout';
import { useCheckoutState } from '../../../../../application/state-manager/services/checkout/useCheckout.hook';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  Card,
  PaymentMethodModeType,
  PaymentMethodType,
  useBankCardsRequest,
  useSelectPaymentMethodRequest
} from '../../../../../infrastucture/apis/checkout/payment-methods';
import { BillingAddressComponent } from '../../../../common-components/billingAddress';
import { IAddressPayment } from '../../../../common-components/billingAddress/components';
import Button from '../../../../common-components/buttons/Button';
import TemplatePage from '../../../../common-components/template-page';
import {
  CheckoutSteps,
  PaymentCreditOrDebitCardParams,
  PaymentCreditOrDebitCardSteps
} from '../../../../navigation/checkout';
import { BankCard, FormValue } from './components/bank-card';
import { BankCartListEmpty } from './components/bank-card-list-empty';

export const BankCardList: React.FC<PaymentCreditOrDebitCardProps> = props => {
  const focused = useIsFocused();
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);
  const [cardSelected, setCardSelected] = React.useState<Card>();
  const [cardVerificationForm, setCardVerificationForm] =
    React.useState<FormValue>();
  const [addressSelected, setAddressSelected] =
    React.useState<IAddressPayment>();
  const [hasError, setHasError] = React.useState(true);
  const [isEnable, setIsEnable] = React.useState<boolean>(true);
  const {
    localStorageData: {
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.User]: USER
    }
  } = useLocalStorage();
  const { onContinueButtonTrigger } = useCheckoutState();
  const {
    data: dataByGetBankCards,
    isLoading: isLoadingByGetBankCards,
    isError: hasErrorByLoadingBankCards
  } = useBankCardsRequest({
    token: TOKEN
  });
  const [
    doSelectPaymentMethod,
    {
      data: dataByDoSelectPaymentMethod,
      error: errorByDoSelectPaymentMethod,
      isLoading: isLoadingBySetPaymentMethod
    }
  ] = useSelectPaymentMethodRequest();

  const onPressAddCard = () => {
    props.navigation.navigate(PaymentCreditOrDebitCardSteps.FormAddBankCard, {
      ...props.route.params,
      paymentModes: props.route.params.paymentMethod.paymentModes
    });
  };

  const onSelectCard = (card: Card) => {
    setCardSelected(card);
    onValuesChange(undefined);
  };

  const onValuesChange = (values?: FormValue) => {
    setCardVerificationForm(values);
    const hasPaymentOptions = !!(cardSelected?.paymentOptions?.length ?? 0);
    const _hasError = hasPaymentOptions
      ? !values?.cvv || !values?.paymentType?.option
      : !values?.cvv;
    setHasError(_hasError);
  };

  const onPressContinueButton = () => {
    doSelectPaymentMethod({
      cartId: props.route.params.dataCart.code,
      selectedPaymentGroup: PaymentMethodType.CreditCard,
      user: USER.uid,
      token: TOKEN,
      creditCardForm: {
        cardId: cardSelected?.id ?? '',
        selectedPaymentMode: PaymentMethodModeType.Paymentez
      }
    });
  };

  useEffect(() => {
    if (onContinueButtonTrigger !== CheckoutSteps.PaymentCreditOrDebitCard)
      return;

    onPressContinueButton();
  }, [onContinueButtonTrigger]);

  useEffect(() => {
    if (!focused) return;

    props.route.params.enableContinueButton(
      !hasError &&
        isEnable &&
        !!cardSelected &&
        (isGiftCardCart || !!addressSelected)
    );
  }, [
    hasError,
    isEnable,
    cardSelected,
    addressSelected,
    focused,
    dataByGetBankCards?.cards.length
  ]);

  useEffect(() => {
    if (!dataByGetBankCards) return;

    if (cardSelected) {
      const cardSelectedExistJet = dataByGetBankCards.cards.some(
        card => card.id === cardSelected.id
      );
      if (!cardSelectedExistJet) {
        setCardSelected(undefined);
      }
      return;
    }
    const cardSelectedExist = dataByGetBankCards.cards.find(
      card => card.defaultCard === true
    );
    setCardSelected(cardSelectedExist);
    if (!dataByGetBankCards?.cards.length) {
      props.route.params.enableContinueButton(false);
      setIsEnable(false);
      setCardSelected(undefined);
    } else if (isGiftCardCart && !isEnable) {
      setIsEnable(true);
    }
  }, [dataByGetBankCards]);

  useEffect(() => {
    if (dataByDoSelectPaymentMethod === undefined) return;
    props.navigation.navigate(
      CheckoutSteps.PurchaseConfirmation as never,
      {
        ...props.route.params,
        paymentMethod: {
          ...cardVerificationForm,
          cardSelected
        },
        cart: props.route.params.dataCart,
        addressSelected
      } as never
    );
  }, [dataByDoSelectPaymentMethod]);

  useEffect(() => {
    if (isLoadingBySetPaymentMethod === undefined) return;
    props.route.params.showActivityIndicatorContinueButton(
      isLoadingBySetPaymentMethod
    );
    isLoadingBySetPaymentMethod &&
      props.route.params.enableContinueButton(false);
  }, [isLoadingBySetPaymentMethod]);

  useEffect(() => {
    if (!errorByDoSelectPaymentMethod) return;
    console.log(
      '>>> Error selecting payment method',
      errorByDoSelectPaymentMethod
    );
  }, [errorByDoSelectPaymentMethod]);

  if (dataByGetBankCards?.cards.length === 0) {
    return <BankCartListEmpty onPress={onPressAddCard} />;
  }

  return (
    <TemplatePage
      error={hasErrorByLoadingBankCards}
      loading={isLoadingByGetBankCards}
      skeleton={
        <SkeletonContent
          layout={[
            { width: '80%', height: 32 },
            { width: '80%', height: 224, marginTop: 16 },
            { width: '80%', height: 86, marginTop: 16 },
            { width: '80%', height: 86, marginTop: 16 }
          ]}
          isLoading={true}
          containerStyle={Styles.container}
        />
      }>
      <ScrollView>
        <View style={Styles.container}>
          <Text style={[FontStyles.Center, Styles.title]}>
            Pago con tarjeta de crédito o débito
          </Text>
          {dataByGetBankCards?.cards.map(card => (
            <BankCard
              card={card}
              isSelected={
                card.id === cardSelected?.id ||
                (cardSelected?.id === undefined && card.defaultCard)
              }
              onSelect={onSelectCard}
              key={card.id}
              onValueChange={onValuesChange}
            />
          ))}
          <Button
            linkName="Agregar tarjeta"
            onPress={onPressAddCard}
            backgroundColor={COLORS.WHITE}
            textColor={COLORS.BRAND}
            textStyle={{ textDecorationLine: 'underline' }}
          />
          <View style={Styles.line} />
          {!isGiftCardCart && (
            <BillingAddressComponent
              enableHandleEnableButton={false}
              onIsEnable={x => setIsEnable(x)}
              onSelected={(_, address) => {
                setAddressSelected(address);
                if (hasError) props.route.params.enableContinueButton(false);
              }}
            />
          )}
        </View>
      </ScrollView>
    </TemplatePage>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 150,
    alignItems: 'center'
  },
  title: {
    marginVertical: 23,
    fontFamily: FONTS_FAMILY.Roboto
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.GRAYBRAND,
    marginVertical: 36
  }
});

interface PaymentCreditOrDebitCardProps
  extends NativeStackScreenProps<
    PaymentCreditOrDebitCardParams,
    PaymentCreditOrDebitCardSteps.BankCardList
  > {}
