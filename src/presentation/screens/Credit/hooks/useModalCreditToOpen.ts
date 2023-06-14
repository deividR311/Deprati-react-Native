import { useEffect, useMemo, useState } from 'react';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import {
  setCreditOption,
  signUpState
} from '../../../../application/state-manager/services/signUp';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import {
  AccountBondingResentCodeResponse,
  useLinkedCreditAccountRequest
} from '../../../../infrastucture/apis/creditAccountBonding';
import {
  creditState,
  getMessageCreditUser,
  getStatusMessageCreditUser
} from '../../../../application/state-manager/services/credit';
import { useWhatsapp } from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { Alert } from 'react-native';
import sleep from '../../../../application/utils/sleep';
import { UserCreditInformation } from '../components/modals/SelectModal/ModalSelectContent';
import { IErrorCredit } from '../ErrorCredit.interface';
const textContent: string =
  'Registramos problemas con tu crédito, por favor comunícate con Servicio al Cliente.';

export interface Props {
  onSuccessRequestCreditLink?: (
    data?: AccountBondingResentCodeResponse
  ) => void;
}

export default function useModalCreditToOpen(props: Props = {}) {
  const { showModal } = useGenericModal();
  const dispatch = useDispatch();
  const { creditSelected } = useSelector(signUpState);
  const creditStateInfo = useSelector(creditState);
  const messageCredit = useSelector(getMessageCreditUser);
  const statusCredit = useSelector(getStatusMessageCreditUser);
  const [showCreditSelect, setShowCreditSelect] = useState(false);
  const [selectedDisabledCredit, setselectedDisabledCredit] = useState(false);
  const [modalCreditBlock, setModalCreditBlock] = useState({
    show: false,
    textContent
  });
  const [closeSimpleModal, setCloseSimpleModal] = useState(false);

  const [openWhatsapp] = useWhatsapp();

  const [
    getLinkedCredit,
    {
      isLoading: isLoadingLinkedCredit,
      data: dataLinkedCredit,
      isSuccess: isSuccessLinkedCredit,
      error: errorLinkedCredit
    }
  ] = useLinkedCreditAccountRequest();

  const {
    localStorageData: {
      [LocalStorageKey.UID]: idDispositivo,
      [LocalStorageKey.User]: userData,
      [LocalStorageKey.Whatsapp]: {
        message: WhatsappMessage,
        phone: WhatsappPhone
      }
    }
  } = useLocalStorage();

  const validateModalToOpen = async (data: any) => {
    if (data?.data === undefined || data?.data === null) {
      //console.log('00validateModalToOpen', statusCredit, messageCredit)
      if (statusCredit === 400 || statusCredit === 452) {
        setModalCreditBlock({
          show: true,
          textContent: messageCredit ?? textContent
        });
        return;
      }
      if (statusCredit === 404) {
        showModal(ModalsType.CreditNoFound, {
          textContent: messageCredit
        });
      }
    }
    if (data?.data?.length > 1) {
      setShowCreditSelect(true);
    } else {
      await dispatch(setCreditOption(0));
      setselectedDisabledCredit(true);
      setTimeout(() => {
        handleLinkedCredit(0);
      }, 200);
    }
  };

  const handleLinkedCredit = async (creditIndex?: number) => {
    const creditSelectedCurrent = creditIndex ?? creditSelected;
    if (creditSelectedCurrent >= 0) {
      await getLinkedCredit({
        cuenta: creditStateInfo[creditSelectedCurrent]?.numeroTarjeta,
        adicional: creditStateInfo[creditSelectedCurrent]?.adicional ?? '',
        idDispositivo: idDispositivo,
        identificacion: userData?.documentTypeNumber
      });
    }
  };

  const requestCreditLink = async (
    creditInfo: Pick<UserCreditInformation, 'adicional' | 'numeroTarjeta'>
  ) => {
    setselectedDisabledCredit(true);
    return await getLinkedCredit({
      cuenta: creditInfo.numeroTarjeta,
      adicional: creditInfo.adicional,
      idDispositivo: idDispositivo,
      identificacion: userData?.documentTypeNumber
    });
  };

  const isLoading = useMemo(() => {
    return isLoadingLinkedCredit;
  }, [isLoadingLinkedCredit]);

  useEffect(() => {
    if (!isLoadingLinkedCredit && selectedDisabledCredit) {
      if (isSuccessLinkedCredit) {
        if (dataLinkedCredit?.status === 200 && dataLinkedCredit?.success) {
          if (props?.onSuccessRequestCreditLink) {
            props?.onSuccessRequestCreditLink?.(dataLinkedCredit);
            return;
          }
          showModal(ModalsType.CreditNewDevice, {
            textContent: dataLinkedCredit.message
          });
          return;
        } else {
          //status ok: No existe cuenta vinculada - Dar paso a vinculacion
          sleep(400).then(() => {
            if (props?.onSuccessRequestCreditLink) {
              props?.onSuccessRequestCreditLink?.(dataLinkedCredit);
              return;
            }
            showModal(ModalsType.CreditSMS);
          });
        }
      }
    }
  }, [isLoadingLinkedCredit, isSuccessLinkedCredit, selectedDisabledCredit]);

  useEffect(() => {
    if (!isLoadingLinkedCredit && selectedDisabledCredit) {
      if (!isSuccessLinkedCredit && errorLinkedCredit) {
        const error = errorLinkedCredit as IErrorCredit;
        if (error?.status === 400) {
          showModal(ModalsType.modalInformations, {
            textContent: error?.data?.message ?? ''
          });
        }
        if (error?.status === 452) {
          setModalCreditBlock({
            show: true,
            textContent: error?.data?.message ?? ''
          });
          return;
        }
      }
    }
  }, [
    errorLinkedCredit,
    isLoadingLinkedCredit,
    isSuccessLinkedCredit,
    selectedDisabledCredit
  ]);

  function onLinkWhatsapp() {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  }

  function handleCloseAction() {
    setModalCreditBlock({
      ...modalCreditBlock,
      show: false
    });
  }

  function handleButtonAction() {
    setCloseSimpleModal(true);
    handleCloseAction();
  }

  function handleCloseRequest() {
    if (closeSimpleModal) onLinkWhatsapp();
    setCloseSimpleModal(false);
  }

  return {
    validateModalToOpen,
    isLoadingPreBonding: isLoading,
    isLoading,
    showCreditSelect,
    setShowCreditSelect,
    handleLinkedCredit,
    setselectedDisabledCredit,
    requestCreditLink,
    modalCreditBlock,
    handleCloseAction,
    handleButtonAction,
    handleCloseRequest
  };
}
