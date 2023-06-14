import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NAV } from '../../../../application/common';
import useErrorDescription, {
  IErrorService
} from '../../../../application/common/hooksCommons/useErrorDescription';
import { useCheckoutState } from '../../../../application/state-manager/services/checkout/useCheckout.hook';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { TrackPurchase } from '../../../../infrastucture/native-modules/emarsys/emarsys';
import {
  Card,
  PaymentMethodModeType,
  PaymentMethodType,
  usePaymentezOrderByDinerRequest,
  usePaymentezOrderRequest,
  VerifyOTPCodeResponse
} from '../../../../infrastucture/apis/checkout/payment-methods';
import {
  useBankPaymentRequest,
  useCashInDeliveryRequest,
  useDirectCreditAuthorizeRequest,
  useDirectCreditTokenRequest,
  useGiftCardAuthorizeRequest,
  useGiftCardRequest
} from '../../../../infrastucture/apis/checkout/placeOrder';
import {
  CustomerOrderDetail,
  PaymentInfo
} from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import {
  CheckoutSteps,
  PurchaseConfirmationParams
} from '../../../navigation/checkout';
import {
  AllTypesPurchase,
  AuxMethodModeType
} from './purchaseProcessed/utils/utilsPurcharse';
import { useDirectCreditAddMutation } from '../../../../infrastucture/apis/directCredit/directCredit.api';
import {
  Cart,
  useLazyGetShoppingCartRequest
} from '../../../../infrastucture/apis/shopping-cart';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../application/state-manager';
import {
  CreditInfoSelector,
  firstTimeSummarySelector,
  setCartInfo,
  setShowLoadingScreen,
  setfirstTimeSummary
} from '../../../../application/state-manager/services/checkout/checkout.slice';
import sleep from '../../../../application/utils/sleep';

export const useConfirmation = (
  paymentInfo: PaymentInfo
): UseConfirmationHook => {
  const [isVisibleOTPConfirmation, setIsVisibleOTPConfirmation] =
    useState<boolean>();
  const [otpConfirmationData, setOtpConformationData] =
    useState<UseConfirmationHook['otpConfirmationData']>();
  const { handleModalErrorService, handleErrorsText } = useErrorDescription();
  const { onContinueButtonTrigger } = useCheckoutState();
  const [showBottomSheetDePratiCredit, setShowBottomSheetDePratiCredit] =
    useState<boolean>(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] =
    useState<boolean>(false);
  const [typePaymentMethod, setTypePaymentMethod] = useState<AllTypesPurchase>(
    'custom' as AllTypesPurchase
  );
  const [msgErrorCodeDePratiCredit, setMsgErrorCodeDePratiCredit] =
    useState<string>('');
  const [order, setOrder] = useState<CustomerOrderDetail>();
  const [loadingFinish, setLoadingFinish] = useState<boolean>(false);
  const [tempShoppingCart, setTempShoppingCart] = useState<Cart>();
  const [wasSuccessful, setWasSuccessful] = useState<boolean>(false);

  const navigation = useNavigation();
  const route = useRoute();
  const {
    name: currentScreen,
    params: {
      dataCart,
      showActivityIndicatorContinueButton,
      paymentMethod,
      setCurrentStep,
      ...otherParamsPassed
    }
  } = route;

  useEffect(() => {
    setCurrentStep({
      index: 2,
      screenId: CheckoutSteps.PurchaseConfirmation
    });
  }, []);

  useEffect(() => {
    return () => {
      if (wasSuccessful) handleCloseSuccess();
    };
  }, []);

  const {
    localStorageData: {
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.UID]: DeviceId
    }
  } = useLocalStorage();
  const creditInfo = useAppSelector(CreditInfoSelector);
  const firstTimeSummary = useAppSelector(firstTimeSummarySelector);

  const [doOrderByPaymentez, statusPaymentOrder] = usePaymentezOrderRequest();

  const [doOrderByPaymentezDiner, statusPaymentOrderByDiner] =
    usePaymentezOrderByDinerRequest();

  const [_netBankingPaymentMode, statusNetBankingPaymentMode] =
    useBankPaymentRequest();
  const [_cashInDeliveryPaymentMode, statusCashInDeliveryPaymentMode] =
    useCashInDeliveryRequest();
  const [_giftCardMode] = useGiftCardRequest();
  const [_giftCardModAuthorize, statusGiftCardModeAuthorize] =
    useGiftCardAuthorizeRequest();
  const [_directCreditMode, statusDirectCreditMode] =
    useDirectCreditTokenRequest();
  const [_directCreditAuthorizeMode, statusDirectCreditAuthorizeMode] =
    useDirectCreditAuthorizeRequest();

  const [_addCreditTokenizado] = useDirectCreditAddMutation();

  const handleSuccess = () => {
    setShowPurchaseSuccess(true);
    setWasSuccessful(true);
  };

  const handleCloseSuccess = () => {
    tempShoppingCart && dispatch(setCartInfo(tempShoppingCart));
  };

  const handleSetPaymentMethod = (paymentMode: string | undefined) => {
    const _typePurchase = paymentMode ?? AuxMethodModeType.Custom;
    setTypePaymentMethod(_typePurchase as AllTypesPurchase);
  };

  const setDataPlaceOrder = (paymentInfo: PaymentInfo) => {
    const { paymentMode } = paymentInfo;
    const request = {
      cartId: dataCart.code,
      username: USER_EMAIL
    };

    handleSetPaymentMethod(paymentMode);
    showActivityIndicatorContinueButton(true);

    switch (paymentMode) {
      case PaymentMethodModeType.CashDeposit:
        setLoadingFinish(true);
        _netBankingPaymentMode(request);
        break;
      case PaymentMethodModeType.AgaintsDelivery:
        setLoadingFinish(true);
        _cashInDeliveryPaymentMode(request);
        break;
      case PaymentMethodModeType.Paymentez:
        onFinishPaymentUsingPaymentez(
          paymentMethod as PurchaseConfirmationParams['paymentMethod']
        );
        break;
      case PaymentMethodModeType.DePratiGiftCard:
        handleDepratiGiftCard(request);
        break;
      case PaymentMethodModeType.DePratiCredit:
        getDirectCreditToken();
        setShowBottomSheetDePratiCredit(true);
        break;
      default:
        showActivityIndicatorContinueButton(false);
        break;
    }
  };

  const getDirectCreditToken = () => {
    const _request = {
      cartId: dataCart.code,
      username: USER_EMAIL
    };
    _directCreditMode(_request);
  };

  useEffect(() => {
    const { paymentMode } = paymentInfo;
    if (PaymentMethodModeType.DePratiCredit === paymentMode) {
      showActivityIndicatorContinueButton(
        statusDirectCreditMode?.isLoading ?? false
      );
    }
  }, [statusDirectCreditMode, paymentInfo]);

  const goToHome = () => navigation.navigate(NAV.HOME);

  const dispatch = useAppDispatch();
  const [getShoppingCart] = useLazyGetShoppingCartRequest();

  const syncCart = async () => {
    const { data: shoppingCart, error } = await getShoppingCart({
      username: USER_EMAIL
    });
    shoppingCart && setTempShoppingCart(shoppingCart);
    // shoppingCart && dispatch(setCartInfo(shoppingCart))
  };

  useEffect(() => {
    try {
      const handleStatus = (status, callback?: () => void) => {
        if (status.isLoading) return;
        showActivityIndicatorContinueButton(false);
        setLoadingFinish(false);
        if (status.isSuccess) {
          setOrder(status.data);
          handleTrackEmarsys(status.data);
          syncCart().finally(() => {
            handleSuccess();
          });
        }
        if (status.isError) {
          handleVerifyMode(status.error);
          if (showBottomSheetDePratiCredit === false) {
            handleModalErrorService(status.error, () => callback?.());
          }
        }
      };
      const statusForMode = {
        [PaymentMethodModeType.CashDeposit]: () =>
          handleStatus(statusNetBankingPaymentMode),
        [PaymentMethodModeType.AgaintsDelivery]: () =>
          handleStatus(statusCashInDeliveryPaymentMode),
        [PaymentMethodModeType.Paymentez]: () => {
          statusPaymentOrder?.data && handleStatus(statusPaymentOrder);
          statusPaymentOrder?.isError &&
            handleStatus(statusPaymentOrder, goToHome);
          statusPaymentOrderByDiner?.isError &&
            handleStatus(statusPaymentOrderByDiner, goToHome);
          if (statusPaymentOrderByDiner?.isSuccess) {
            const isDiners =
              statusPaymentOrderByDiner?.data?.paymentInfo.cardType.code ===
              'diners';
            setOrder(statusPaymentOrderByDiner.data);
            setIsVisibleOTPConfirmation(isDiners);
            setOtpConformationData({
              paymentMethod,
              response: statusPaymentOrderByDiner?.data
            });
            !isDiners && handleStatus(statusPaymentOrderByDiner);
          }
        },
        [PaymentMethodModeType.DePratiGiftCard]: () => {
          handleStatus(statusGiftCardModeAuthorize);
        },
        [PaymentMethodModeType.DePratiCredit]: () => {
          statusDirectCreditAuthorizeMode?.isSuccess &&
            setShowBottomSheetDePratiCredit(false);
          setTimeout(() => {
            handleStatus(statusDirectCreditAuthorizeMode);
          }, 700);
        }
      };

      const { paymentMode } = paymentInfo;
      statusForMode[paymentMode]?.();
    } catch (error) {}

    return () => {
      //showActivityIndicatorContinueButton(false)
    };
  }, [
    statusNetBankingPaymentMode,
    statusCashInDeliveryPaymentMode,
    statusPaymentOrderByDiner,
    statusPaymentOrder,
    statusDirectCreditAuthorizeMode
  ]);

  const handleDepratiGiftCard = async (request: any) => {
    if (!otherParamsPassed?.giftCard?.passwordCard) return;
    dispatch(setShowLoadingScreen(true));
    showActivityIndicatorContinueButton(true);

    const { giftCard } = otherParamsPassed;
    const { data: tokenInput = '', error } = await _giftCardMode({
      ...request,
      giftCardForm: {
        giftCode: giftCard.codeCard,
        giftPass: giftCard.passwordCard
      },
      selectedPaymentGroup: PaymentMethodType.DePratiGiftCard
    });

    if (error) {
      showActivityIndicatorContinueButton(false);
      dispatch(setShowLoadingScreen(false));
      await sleep(400);
      handleModalErrorService(error);
      return;
    }

    //@ts-ignore
    const { data: dataAuthorizing, error: errorAuthorizing } =
      await _giftCardModAuthorize({
        cartId: dataCart.code,
        username: USER_EMAIL,
        tokenInput: tokenInput
      });

    if (errorAuthorizing) {
      showActivityIndicatorContinueButton(false);
      dispatch(setShowLoadingScreen(false));
      await sleep(400);
      handleVerifyMode(errorAuthorizing);
      handleModalErrorService(errorAuthorizing);
      return;
    }

    setOrder(dataAuthorizing);
    handleTrackEmarsys(dataAuthorizing);
    await syncCart();

    showActivityIndicatorContinueButton(false);
    dispatch(setShowLoadingScreen(false));
    await sleep(400);
    handleSuccess();
  };

  const handleTrackEmarsys = (data: CustomerOrderDetail) => {
    if (data.code) {
      TrackPurchase(data);
    }
  };

  const setDirectCreditAuthorize = (code: string) => {
    _directCreditAuthorizeMode({
      username: USER_EMAIL,
      cartId: dataCart.code,
      tokenInput: code,
      attachDirectCreditOnCustomer: creditInfo?.saveForFuturePay ?? false,
      deviceId: DeviceId
    });
  };

  const closeOTPConfirmation = useCallback(() => {
    setIsVisibleOTPConfirmation(false);
  }, []);

  const successOTPConfirmation = useCallback(() => {
    closeOTPConfirmation();
    setTimeout(() => {
      handleSuccess();
    }, 500);
  }, []);

  //PaymentMethodModeType
  useEffect(() => {
    if (!onContinueButtonTrigger || currentScreen !== onContinueButtonTrigger)
      return;
    setDataPlaceOrder(paymentInfo);
  }, [onContinueButtonTrigger]);

  const onFinishPaymentUsingPaymentez = (
    _paymentMethod: PurchaseConfirmationParams['paymentMethod']
  ) => {
    const hasPaymentOptions = !!_paymentMethod?.paymentType;
    if (hasPaymentOptions) {
      doOrderByPaymentezDiner({
        cartId: dataCart.code,
        paymentOptionPk: _paymentMethod?.paymentType?.PK ?? '',
        cvc: _paymentMethod?.cvv ?? '',
        installmentsNumber: _paymentMethod?.paymentType?.installments ?? 1,
        installmentsType: _paymentMethod?.paymentType?.installmentsType ?? 0,
        token: TOKEN,
        username: USER_EMAIL
      });
    } else {
      doOrderByPaymentez({
        cartId: dataCart.code,
        cvc: _paymentMethod?.cvv ?? '',
        token: TOKEN,
        username: USER_EMAIL
      });
    }
  };

  const handleVerifyMode = (error: IErrorService) => {
    if (typePaymentMethod === PaymentMethodModeType.DePratiCredit)
      setMsgErrorCodeDePratiCredit(handleErrorsText(error.data.errors));
  };

  const changefirstTimeSummary = (isFirstTime: boolean) => {
    dispatch(setfirstTimeSummary(isFirstTime));
  };

  return {
    closeOTPConfirmation,
    successOTPConfirmation,
    isVisibleOTPConfirmation,
    otpConfirmationData,
    showBottomSheetDePratiCredit,
    showPurchaseSuccess,
    setShowBottomSheetDePratiCredit,
    setShowPurchaseSuccess,
    order,
    //functions DirectCreditAuthorize
    isLoadingAuthorize: statusDirectCreditAuthorizeMode.isLoading,
    isLoadingGetToken: statusDirectCreditMode.isLoading,
    setDirectCreditAuthorize,
    getDirectCreditToken,
    msgErrorCodeDePratiCredit,
    setMsgErrorCodeDePratiCredit,

    //paymentMode
    typePaymentMethod,
    loadingPetition: loadingFinish,
    firstTimeSummary,
    changefirstTimeSummary
  };
};

export interface UseConfirmationHook {
  closeOTPConfirmation: () => void;
  successOTPConfirmation: () => void;
  isVisibleOTPConfirmation?: boolean;
  otpConfirmationData?: {
    paymentMethod: PurchaseConfirmationParams['paymentMethod'];
    response: VerifyOTPCodeResponse;
  };
  showBottomSheetDePratiCredit: boolean;
  showPurchaseSuccess: boolean;
  setShowBottomSheetDePratiCredit(x: boolean): void;
  setShowPurchaseSuccess(x: boolean): void;
  order?: CustomerOrderDetail;

  //functions DirectCreditAuthorize
  setDirectCreditAuthorize(code: string): void;
  isLoadingAuthorize: boolean;
  isLoadingGetToken: boolean;
  getDirectCreditToken(): void;
  msgErrorCodeDePratiCredit: string;
  setMsgErrorCodeDePratiCredit(msg: string): void;

  typePaymentMethod: AllTypesPurchase;
  loadingPetition: boolean;
  firstTimeSummary?: boolean;
  changefirstTimeSummary: (isFirstTime: boolean) => void;
}
