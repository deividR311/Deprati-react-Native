import * as React from 'react';
import {
  CheckoutSteps,
  CheckoutNavigationParams,
  CheckoutNavigationProps
} from './interfaces';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import BackButton from '../../common-components/backButton';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import { Platform } from 'react-native';
import { COLORS } from '../../../application/common';
import {
  ChoosePaymentMethod,
  PaymentAgainstDelivery,
  PaymentDePratiCredit
} from '../../screens/checkout';
import { BottomStepBar } from '../../screens/checkout/components/BottomStepBar';
import { PaymentDePratiGiftCard } from '../../screens/checkout/payment-methods/payment-deprati-gift-card';
import { useCheckoutState } from '../../../application/state-manager/services/checkout/useCheckout.hook';
import { DeliveryNavigation } from '../delivery';
import { PaymentCreditOrDebitCard } from '../../screens/checkout/payment-methods/payment-credit-or-debit-card';
import { Confirmation } from '../../screens/checkout/confirmation';
import PaymentCashDeposit from '../../screens/checkout/payment-methods/payment-cash-deposit/PaymentCashDeposit';
import FooterChekout from '../../screens/checkout/components/FooterChekout';
import {
  isGiftCardCartShoppingCart,
  setfirstTimeSummary
} from '../../../application/state-manager/services/checkout';
import {
  useAppDispatch,
  useAppSelector
} from '../../../application/state-manager';

const Stack = createNativeStackNavigator<CheckoutNavigationParams>();

export const CheckoutNavigator: React.FC<CheckoutNavigationProps> = ({
  route
}) => {
  const dispatch = useAppDispatch();
  const {
    params: { dataCart, showThirdParty }
  } = route;
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);

  React.useEffect(() => {
    dispatch(setfirstTimeSummary(true));
  }, []);

  const commonScreenOptions = {
    headerShown: true,
    title: '2. Método de pago',
    headerTitle: '2. Método de pago'
  };

  const { onPressContinueButton } = useCheckoutState();

  const [showTotalindicatorBand, setShowTotalindicatorBand] =
    React.useState(true);

  const [titleContinueButton, setTitleContinueButton] =
    React.useState<string>('CONTINUAR COMPRA');

  const [enableContinuePaymentButton, setEnableContinuePaymentButton] =
    React.useState(true);

  const [currentStep, setCurrentStep] = React.useState({
    index: 0,
    screenId: CheckoutSteps.DELIVERY
  });

  const [
    showActivityIndicatorContinuePaymentButton,
    setShowActivityIndicatorContinuePaymentButton
  ] = React.useState(false);

  const _onPressContinuePayment = () => {
    const { screenId, index: step } = currentStep;
    onPressContinueButton(screenId);
  };

  const _onScreenChange = (screenId: any) => {
    switch (screenId) {
      case CheckoutSteps.DELIVERY:
        setCurrentStep({ index: 0, screenId });
        break;
      case CheckoutSteps.ChoosePaymentMethod:
      case CheckoutSteps.PaymentAgaintsDelivery:
      case CheckoutSteps.PaymentCashDeposit:
      case CheckoutSteps.PaymentCreditOrDebitCard:
      case CheckoutSteps.PaymentDePratiCredit:
      case CheckoutSteps.PaymentDePratiGiftCard:
        setCurrentStep({ index: 1, screenId });
        break;
      case CheckoutSteps.PurchaseConfirmation:
        setCurrentStep({ index: 2, screenId });
        break;
    }
  };

  const initialRouteName = () => {
    if (isGiftCardCart) return CheckoutSteps.ChoosePaymentMethod;
    return CheckoutSteps.DELIVERY;
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false
        }}
        screenListeners={{
          state: ({ data: { state } }) => {
            const { index = 0, routes = [] } = state;
            const { name = '' } = routes[index] || {};
            _onScreenChange(name);
          }
        }}
        initialRouteName={initialRouteName()}>
        <Stack.Screen
          name={CheckoutSteps.DELIVERY}
          component={DeliveryNavigation}
          initialParams={{
            dataCart,
            showThirdParty,
            enableContinueButton: setEnableContinuePaymentButton,
            showActivityIndicatorContinueButton:
              setShowActivityIndicatorContinuePaymentButton,
            showTotalsBand: setShowTotalindicatorBand,
            setCurrentStep
          }}
        />
        <Stack.Group
          screenOptions={{
            headerLargeTitle: false,
            headerTitleAlign: 'left',
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: COLORS.GRAYBRAND },
            contentStyle: { backgroundColor: COLORS.WHITE },
            header: (props: NativeStackHeaderProps) => (
              <HeaderNavigation {...props} />
            ),
            headerLeft: props =>
              Platform.select({
                android: null,
                ios: <BackButton {...props} />
              })
          }}>
          <Stack.Screen
            options={{
              headerShown: true,
              title: '2. Método de pago',
              headerTitle: '2. Método de pago'
            }}
            name={CheckoutSteps.ChoosePaymentMethod}
            component={ChoosePaymentMethod}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep,
              showTotalsBand: setShowTotalindicatorBand
            }}
          />
          <Stack.Screen
            options={commonScreenOptions}
            name={CheckoutSteps.PaymentAgaintsDelivery}
            component={PaymentAgainstDelivery}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep
            }}
          />
          <Stack.Screen
            options={commonScreenOptions}
            name={CheckoutSteps.PaymentCashDeposit}
            component={PaymentCashDeposit}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep
            }}
          />
          <Stack.Screen
            options={commonScreenOptions}
            name={CheckoutSteps.PaymentDePratiGiftCard}
            component={PaymentDePratiGiftCard}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep
            }}
          />
          <Stack.Screen
            options={commonScreenOptions}
            name={CheckoutSteps.PaymentCreditOrDebitCard}
            component={PaymentCreditOrDebitCard}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep,
              showTotalsBand: setShowTotalindicatorBand
            }}
          />

          <Stack.Screen
            options={commonScreenOptions}
            name={CheckoutSteps.PaymentDePratiCredit}
            component={PaymentDePratiCredit}
            initialParams={{
              dataCart,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep
            }}
          />

          <Stack.Screen
            options={{
              headerShown: true,
              title: '3. Confirmación',
              headerTitle: '3. Confirmación'
            }}
            name={CheckoutSteps.PurchaseConfirmation}
            component={Confirmation}
            initialParams={{
              dataCart,
              setTitleContinueButton,
              enableContinueButton: setEnableContinuePaymentButton,
              showActivityIndicatorContinueButton:
                setShowActivityIndicatorContinuePaymentButton,
              setCurrentStep
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <BottomStepBar
        title="Mi compra"
        step={currentStep.index}
        totalSteps={3}
      />

      {showTotalindicatorBand && (
        <FooterChekout
          screenId={currentStep.screenId}
          linkName={titleContinueButton}
          disabled={!enableContinuePaymentButton}
          showActivityIndicator={showActivityIndicatorContinuePaymentButton}
          onPress={_onPressContinuePayment}
        />
      )}
    </>
  );
};
