import React, { useEffect } from 'react';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useVerifyOTPBankCardRequest,
  VerifyOTPCodeResponse
} from '../../../../../infrastucture/apis/checkout/payment-methods';
import { PurchaseConfirmationParams } from '../../../../navigation/checkout';
import { OPTCCodeConfirmation } from '../../payment-methods/payment-credit-or-debit-card/components/opt-code-confirmation.bottomsheet';

export const ConfirmationOrderByPaymentez: React.FC<
  ConfirmationOrderByPaymentezProps
> = props => {
  const {
    localStorageData: { [LocalStorageKey.Token]: TOKEN }
  } = useLocalStorage();
  const [doVerifyOTPBankCard, { error, isLoading, data }] =
    useVerifyOTPBankCardRequest();

  const onVerifyOTPCode = (otpCode: string) => {
    doVerifyOTPBankCard({
      orderCode: props?.orderNumber ?? '',
      otpCode: otpCode,
      token: TOKEN
    });
  };

  useEffect(() => {
    if (!error) return;
    console.log('>>> OTP Confirmation code error: ', error);
  }, [error]);

  useEffect(() => {
    if (data === undefined) return;
    console.log('>>> OTP Confirmation code data: ', data);
    props.onVerifyOTPCode?.();
  }, [data]);

  return (
    <OPTCCodeConfirmation
      show={!!props.showOTPDialogVerifier}
      cardId={props.otpConfirmationData?.paymentMethod?.cardSelected?.id ?? ''}
      cardType=""
      isLoading={isLoading}
      onCloseRequest={props.onCloseRequest}
      onVerifyOTPCode={(_, otpCode: string) => {
        onVerifyOTPCode?.(otpCode);
      }}
    />
  );
};

export interface ConfirmationOrderByPaymentezProps {
  showOTPDialogVerifier?: boolean;
  otpConfirmationData?: {
    paymentMethod: PurchaseConfirmationParams['paymentMethod'];
    response: VerifyOTPCodeResponse;
  };
  onVerifyOTPCode?: () => void;
  onCloseRequest: () => void;
  orderNumber?: string;
}
