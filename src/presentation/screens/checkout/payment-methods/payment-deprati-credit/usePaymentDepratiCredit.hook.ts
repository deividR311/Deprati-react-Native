import { useIsFocused, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
  SetStateAction,
  Dispatch
} from 'react';
import { useCheckoutState } from '../../../../../application/state-manager/services/checkout/useCheckout.hook';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import credicardMask from '../../../../../application/utils/creditCardMask';
import { creditDePratiValidation } from './payment-deprati-credit.validations';
import { useAppSelector } from '../../../../../application/state-manager';
import { ShoppingCartStateSelector } from '../../../../../application/state-manager/services/checkout';

export const usePaymentDepratiCredit = (): InfoHook => {
  const route = useRoute();
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const stateShowSheet = useState(false);
  const [showSheet, setshowSheet] = stateShowSheet;
  const stateShowError = useState(false);
  const [showError, setShowError] = stateShowError;
  const StateErrorMessage = useState('');
  const [errorMessage, setErrorMessage] = StateErrorMessage;
  const [showAlerAddressPayment, setShowAlerAddressPayment] = useState(false);
  const dataCart = useAppSelector(ShoppingCartStateSelector);
  const focused = useIsFocused();
  const { onContinueButtonTrigger } = useCheckoutState();
  const {
    name: currentScreen,
    params: { enableContinueButton }
  } = route;
  const formik = useFormik({
    initialValues: {
      numberAccount: '',
      aditional: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: creditDePratiValidation,
    onSubmit: values => {}
  });
  const { values, setFieldValue } = formik;

  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: isAccountAuthenticated,
      [LocalStorageKey.AccountAdditionalNumber]: accountAdditionalNumber,
      [LocalStorageKey.AccountNumber]: accountNumber,
      [LocalStorageKey.UserEmail]: username
    }
  } = useLocalStorage();

  useEffect(() => {
    if (dataCart?.paymentInfo) {
      const {
        accountNumber: accountNumberSelect,
        accountAdditionalNumber: additionalNumberSelect
      } = dataCart?.paymentInfo;
      setFieldValue('numberAccount', accountNumberSelect);
      setFieldValue('aditional', additionalNumberSelect);
    } else if (isAccountAuthenticated) {
      setFieldValue('numberAccount', accountNumber);
      setFieldValue('aditional', accountAdditionalNumber);
    }
  }, [isAccountAuthenticated, dataCart?.paymentInfo]);

  useLayoutEffect(() => {
    if (focused) {
      if (
        !!values?.numberAccount &&
        values?.aditional?.length === 2 &&
        formik.isValid
      ) {
        enableContinueButton(true);
      } else {
        enableContinueButton(false);
      }
    }
  }, [values, focused, formik]);

  useEffect(() => {
    if (!onContinueButtonTrigger || onContinueButtonTrigger !== currentScreen)
      return;

    if (isEnable) {
      setShowError(false);
      setshowSheet(true);
      setErrorMessage('');
    } else {
      setShowAlerAddressPayment(true);
    }

    return () => enableContinueButton(true);
  }, [onContinueButtonTrigger]);

  useEffect(() => {
    if (isBuying) {
      setTimeout(() => {
        setLoadingBuy(true);
      }, 900);
    } else {
      setLoadingBuy(false);
    }
  }, [isBuying]);

  const maskedAccountNumber = useMemo(() => {
    if (dataCart?.paymentInfo?.accountNumber) {
      const { accountNumber: accountNumberSelect, obfuscatedAccountNumber } =
        dataCart?.paymentInfo;
      return (
        obfuscatedAccountNumber ??
        credicardMask(accountNumberSelect, 4).toUpperCase()
      );
    }

    return credicardMask(accountNumber, 4).toUpperCase();
  }, [accountNumber, dataCart?.paymentInfo]);

  return {
    isAccountAuthenticated,
    values,
    maskedAccountNumber,
    setFieldValue,
    setIsEnable,
    stateShowSheet,
    stateShowError,
    StateErrorMessage,
    showAlerAddressPayment,
    setShowAlerAddressPayment,
    onBuy: {
      loadingBuy,
      setLoadingBuy,
      isBuying,
      setIsBuying
    },
    formikCredit: formik
  };
};

export interface InfoHook<T> {
  isAccountAuthenticated: boolean;
  values: any;
  maskedAccountNumber: string;
  setFieldValue: T;
  setIsEnable: Dispatch<SetStateAction<boolean>>;
  stateShowSheet: [boolean, Dispatch<SetStateAction<boolean>>];
  stateShowError: [boolean, Dispatch<SetStateAction<boolean>>];
  StateErrorMessage: [string, Dispatch<SetStateAction<string>>];
  showAlerAddressPayment: boolean;
  setShowAlerAddressPayment: Dispatch<SetStateAction<boolean>>;
  onBuy: IBuy;
  formikCredit: any;
}

interface IBuy {
  loadingBuy: boolean;
  onLoadingBuy?: (x: boolean) => void;

  isBuying: boolean;
  onIsBuying?: (x: boolean) => void;
}
