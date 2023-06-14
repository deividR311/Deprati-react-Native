//libs
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
//hook
import usePrecancellationRequest from '../../../../../infrastucture/apis/precancellation/usePrecancellationRequest.hook';
//utils
import { TotalPaymentResponse } from '../../../../../infrastucture/apis/precancellation/precancellation.type';
import {
  IErrorsSolicitPreCancel,
  ILoadingsSolicitPreCancel
} from '../interfaces/ISolicitPreCancelCredit';
import { trackEventView } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEventsViewModal } from '../../../../../infrastucture/native-modules/emma';
import { IErrorCredit } from '../../ErrorCredit.interface';

/**
 * @name usePreCancelCredit
 * @description usePreCancelCredit Hook
 */

export const useSolicitPreCancelCredit = (): ISolicitPreCancelCreditHook => {
  const navigation = useNavigation();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const {
    onGetTotalsPayment,
    dataTotalsPayment,
    onSetConfirmTickets,
    dataConfirmTickets,
    isLoadingTotalsPayment,
    isLoadingConfirmTickets,
    isErrorTotalsPayment,
    isErrorConfirmTickets,
    errorConfirmTickets
  } = usePrecancellationRequest();

  useEffect(() => {
    onGetTotalsPayment();
  }, []);

  useEffect(() => {
    if (dataConfirmTickets) {
      if (dataConfirmTickets.success && dataConfirmTickets.result === 'OK') {
        trackEventView(
          keyEventsViewModal.credito_precancelardiferidos_confirmacion
        );
        setShowSuccess(true);

        return;
      }
      trackEventView(keyEventsViewModal.credito_precancelardiferidos_error);
      return setShowError(true);
    }
  }, [dataConfirmTickets]);

  const handleClose = () => {
    setShowSuccess(false);
    setShowError(false);
    navigation.pop(2);
  };
  const handleCancel = () => {
    navigation.goBack();
  };
  return {
    dataTotalsPayment,
    handleConfirm: onSetConfirmTickets,
    showSuccess,
    showError,
    handleClose,
    handleCancel,
    //loading
    loading: {
      isLoadingTotalsPayment,
      isLoadingConfirmTickets
    },

    //isError
    isError: {
      isErrorTotalsPayment
    },

    isErrorConfirmTickets,
    errorConfirmTickets
  };
};
interface ISolicitPreCancelCreditHook {
  dataTotalsPayment: TotalPaymentResponse | undefined;
  handleConfirm(): void;
  showSuccess: boolean;
  showError: boolean;
  handleClose(): void;
  handleCancel(): void;

  loading: ILoadingsSolicitPreCancel;
  isError: IErrorsSolicitPreCancel;

  isErrorConfirmTickets: boolean;
  errorConfirmTickets: IErrorCredit;
}

export default useSolicitPreCancelCredit;
