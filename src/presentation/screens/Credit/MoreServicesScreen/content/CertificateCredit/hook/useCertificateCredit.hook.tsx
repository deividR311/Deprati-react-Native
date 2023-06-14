//libs
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import * as Yup from 'yup';
//hooks
import { useNavigation } from '@react-navigation/native';
import { useDcCertificateMutationRequest } from '../../../../../../../infrastucture/apis/creditCertificate/creditCertificate';
import { useCheckMailMutationRequest } from '../../../../../../../infrastucture/apis/checkMail/checkMail';
import { useLocalStorage } from '../../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { useFormik } from 'formik';
import { trackEventclick } from '../../../../../../../infrastucture/native-modules/emma/useEmma.hook';
import useOpenLinkInApp, {
  useWhatsapp
} from '../../../../../../../application/common/hooksCommons/useOpenLinkInApp';
//utils
import { LocalStorageKey } from '../../../../../../../application/state-manager/services/localstorage';
import { COLORS, FontStyles } from '../../../../../../../application/common';
import { keyEvents } from '../../../../../../../infrastucture/native-modules/emma/clickEventMap';
import {
  ICertificateCreditHook,
  IColorsButton,
  ITextCertificate,
  TypeCheckboxs
} from '../interface';
import sleep from '../../../../../../../application/utils/sleep';
import { useGenericModal } from '../../../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../../../common-components/modal/modal.interfaces';
import { CODE_ERROR_BLOCKED_ACCOUNT } from '../../../../../../../application/common/constants';

/**
 * @name useCertificateCredit
 * @description useCertificateCredit Hook
 */

const COMMERCIAL_REFERENCE = 'Referencia comercial';
const CREDIT_PER_DAY = 'Crédito al día';

const TEXT_CONFIRM_CERTIFICATE =
  'El certificado [OPTION] tiene un costo de \\n[COST]\\n y será cobrado de tu crédito De Prati';

const initialCheckboxs: TypeCheckboxs = {
  commercialReference: false,
  creditPerDay: false
};

export const useCertificateCredit = (): ICertificateCreditHook => {
  const navigation = useNavigation();
  const openUrl = useOpenLinkInApp();
  const [openWhatsapp] = useWhatsapp();
  const { showModal } = useGenericModal();

  const [padding, setpadding] = useState<number>(0);
  const [checkDefault, setcheckDefault] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<boolean>(false);
  const [showModaError, setShowModaError] = useState<boolean>(false);
  const [showSuccesPopUp, setShowSuccesPopUp] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [checkboxs, setCheckboxs] = useState<TypeCheckboxs>(initialCheckboxs);
  const [showModaErrorCrediCertificate, setShowModaErrorCrediCertificate] =
    useState<boolean>(false);

  const [showModalWhatsApp, setShowModalWhatsApp] = useState(false);

  const [
    sendCrediCertificate,
    {
      isLoading: isLoadingSend,
      isSuccess: isSuccessSend,
      isError: isErrorSend,
      error: errorSend,
      data: dataSend
    }
  ] = useDcCertificateMutationRequest();

  const [
    getCheckMail,
    {
      isLoading: isLoadingMail,
      // isSuccess: isSuccessMail,
      isError: isErrorMail,
      error: errorMail,
      data: dataCheckMail
    }
  ] = useCheckMailMutationRequest();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.IpAddress]: IP_ADDRESS,
      [LocalStorageKey.UID]: deviceId,
      [LocalStorageKey.User]: userData,
      [LocalStorageKey.Whatsapp]: {
        message: WhatsappMessage,
        phone: WhatsappPhone
      },
      [LocalStorageKey.MessagesApp]: {
        Certificate_Commercial_Reference: DATA_COMMERCIAL_REFERENCE,
        Certificate_Credit_at_day: DATA_CREDIT_AT_DAY
      }
    }
  } = useLocalStorage();
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitleStyle: FontStyles.H3_Headline
    });

    getCheckMail({
      identification: userData?.documentTypeNumber ?? '',
      channel: 'App',
      email: USER_EMAIL,
      ip: IP_ADDRESS,
      deviceId: deviceId
    });
  }, []);

  useEffect(() => {
    if (showModaErrorCrediCertificate && errorSend) {
      if (errorSend?.status === CODE_ERROR_BLOCKED_ACCOUNT) {
        setShowModalWhatsApp(true);
      } else {
        showModal(ModalsType.ErrorSignUp, {
          textContent: errorSend?.data?.message
        });
      }
    }
  }, [showModaErrorCrediCertificate, errorSend]);

  useEffect(() => {
    if (!isErrorMail) return;
    if (isErrorMail) {
      setShowModaError(true);
    }
  }, [isErrorMail]);

  useEffect(() => {
    if (!isErrorSend) return;
    if (isErrorSend) {
      handleSecondModal(setShowModaErrorCrediCertificate);
    }
  }, [isErrorSend]);

  useEffect(() => {
    if (isLoadingSend) setShowModalConfirm(false);
    if (!isLoadingSend && isSuccessSend) {
      // setShowSuccesPopUp(true)
      handleSecondModal(setShowSuccesPopUp);
    }
  }, [isLoadingSend, isSuccessSend]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setpadding(Platform.OS === 'ios' ? 190 : 0);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setpadding(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const mailValidation = Yup.object().shape({
    reference: Yup.string().required().max(34)
  });

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    isValid
  } = useFormik({
    initialValues: {
      email: '',
      reference: ''
    },
    initialErrors: {},
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: mailValidation,
    onSubmit: values => {}
  });

  async function handleSecondModal(onShow: (x: boolean) => void) {
    onCloseModalConfirm();
    await sleep(1000);
    onShow(true);
  }

  const closeModaError = () => {
    setShowModaError(false);
    navigation.goBack();
  };

  const closeModaErrorCrediCertificate = () => {
    setShowModaErrorCrediCertificate(false);
    setShowModalWhatsApp(false);
  };

  const closeSuccessPopUp = () => {
    setShowSuccesPopUp(false);
    // navigation.goBack()
    setcheckDefault(false);
    resetForm();
  };

  const changeOption = (key: string) => {
    setCheckboxs({
      commercialReference: key === 'commercialReference',
      creditPerDay: key === 'creditPerDay'
    });
    setGlobalError(false);
    setcheckDefault(false);
  };

  const onPressGenerate = async () => {
    try {
      trackEventclick(keyEvents.credito_generarcertificado);
      await sendCrediCertificate({
        identification: userData?.documentTypeNumber ?? '',
        certificateType: checkboxs.creditPerDay ? 2 : 1,
        recipient: checkboxs.commercialReference ? values.reference : '',
        email: dataCheckMail?.data?.email,
        deviceId: deviceId
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenWhatsapp = () => {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  };

  function handleAceptTerms(valueCheck: boolean) {
    if (valueCheck && !isValid && checkboxs.commercialReference)
      setGlobalError(true);
    else setGlobalError(false);

    setcheckDefault(valueCheck);
  }

  const activeAction = useMemo(() => {
    if (!checkboxs.commercialReference && !checkboxs.creditPerDay) return false;
    if (checkboxs.commercialReference) {
      return checkDefault && values.reference;
    }
    return checkDefault;
  }, [checkDefault, checkboxs.commercialReference, values.reference]);
  // "Certificate_Commercial_Reference": {
  //   "title": "Este servicio será cobrado de tu crédito De Prati.",
  //   "description": "Costo: $1,00 + IVA",
  // },
  // "Certificate_Credit_at_day": {
  //   "title": "Este servicio será cobrado de tu crédito De Prati.",
  //   "description": "Costo: $0,63 + IVA",
  // }

  const textCertificate: ITextCertificate = useMemo(() => {
    let _cost = '';

    if (checkboxs.commercialReference) {
      _cost = DATA_COMMERCIAL_REFERENCE.description.replace('Costo: ', '');
      return {
        confirm: TEXT_CONFIRM_CERTIFICATE.replace(
          '[OPTION]',
          COMMERCIAL_REFERENCE
        )
          .replace('[COST]', _cost)
          .split('\\n'),

        textAlert: DATA_COMMERCIAL_REFERENCE.title,
        textCost: DATA_COMMERCIAL_REFERENCE.description,
        cost: _cost
      };
    }

    _cost = DATA_CREDIT_AT_DAY.description.replace('Costo: ', '');
    return {
      confirm: TEXT_CONFIRM_CERTIFICATE.replace('[OPTION]', CREDIT_PER_DAY)
        .replace('[COST]', _cost)
        .split('\\n'),
      textAlert: DATA_CREDIT_AT_DAY.title,
      textCost: DATA_CREDIT_AT_DAY.description,
      cost: _cost
    };
  }, [checkboxs]);

  const colorsButton: IColorsButton = useMemo(() => {
    if (activeAction) {
      return {
        backgroundColor: COLORS.BRAND,
        textColor: FontStyles.LightColor.color,
        color: COLORS.WHITE
      };
    }
    return {
      backgroundColor: COLORS.GRAYDARK20,
      textColor: COLORS.BORDERCOLOR,
      color: COLORS.BRAND
    };
  }, [activeAction]);

  function onCloseModalConfirm() {
    setShowModalConfirm(false);
    setCheckboxs(initialCheckboxs);
    closeSuccessPopUp();
  }

  function onOpenModalConfirm() {
    setShowModalConfirm(true);
  }

  return {
    //
    textCertificate,
    COMMERCIAL_REFERENCE,
    CREDIT_PER_DAY,
    onCloseModalConfirm,
    showModalConfirm,
    onOpenModalConfirm,
    colorsButton,
    //
    isLoadingMail,
    padding,
    changeOption,
    checkboxs,
    errors,
    touched,
    globalError,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    dataCheckMail,
    handleOpenWhatsapp,
    openUrl,
    handleAceptTerms,
    checkDefault,
    activeAction,
    onPressGenerate,
    isLoadingSend,
    errorMail,
    closeModaError,
    showSuccesPopUp,
    dataSend,
    closeSuccessPopUp,
    showModaErrorCrediCertificate,
    errorSend,
    closeModaErrorCrediCertificate,
    showModaError,
    showModalWhatsApp
  };
};

export default useCertificateCredit;
