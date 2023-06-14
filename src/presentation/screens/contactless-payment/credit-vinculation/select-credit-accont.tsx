import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SelectCreditAccountStyles as Styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CreditVinculationNavigationParams,
  CreditVinculationNavigationRoutes
} from './credit-vinculation.navigator';
import CardHeader from './components/cardHeader';
import ModalSelectContent, {
  UserCreditInformation
} from '../../Credit/components/modals/SelectModal/ModalSelectContent';
import Button from '../../../common-components/buttons/Button';
import useModalCreditToOpen from '../../Credit/hooks/useModalCreditToOpen';
import { AccountBondingResentCodeResponse } from '../../../../infrastucture/apis/creditAccountBonding';
import useGetCreditsUser from '../../../../application/common/hooksCommons/useGetCreditsUser';
import { useFocusEffect } from '@react-navigation/native';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { RequestRawResult } from '../../../../infrastucture/apis/common/config';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';
import { useValidContactlesspaymentHook } from '../../../../infrastucture/apis/creditAccountBonding/validContactlesspayment.hook';
import { useSelector } from 'react-redux';
import {
  getMessageCreditUser,
  getStatusMessageCreditUser
} from '../../../../application/state-manager/services/credit';
import { COLORS, globalStyles } from '../../../../application/common';
import TemplatePage from '../../../common-components/template-page';
import { Popup } from '../../../common-components/poppup';
import { creditWeb } from '../../../../application/utils';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { IErrorCredit } from '../../Credit/ErrorCredit.interface';
import { useTranslation } from 'react-i18next';

const TEXT_CONTENT_ERROR =
  'Registramos problemas con tu\ncrédito, por favor comunícate con\nServicio al Cliente\n';

export const SelectCreditAccountScreen: FC<
  SelectCreditAccountProps
> = props => {
  const { t } = useTranslation();
  const { navigation } = props;
  const { localStorageData } = useLocalStorage();
  const openUrl = useOpenLinkInApp();
  const {
    validVinculation,
    isLoading: isLoadingByValidationContactlessPayment
  } = useValidContactlesspaymentHook();
  const {
    [LocalStorageKey.UID]: deviceId,
    [LocalStorageKey.IsLogin]: IS_LOGIN
  } = localStorageData;
  const [creditAccountInfo, setCreditAccountInfo] =
    useState<UserCreditInformation>();
  const messageCredit = useSelector(getMessageCreditUser);
  const statusCredit = useSelector(getStatusMessageCreditUser);
  const [modalCreditBlock, setModalCreditBlock] = useState({
    show: false,
    textContent: ''
  });

  const [modalCreditNoFound, setModalCreditNoFound] = useState({
    show: false,
    textContent: ''
  });

  const { loadCreditsUser, isLoading: loadingGetcredits } = useGetCreditsUser();

  const { requestCreditLink, isLoading: loadingRequestCreditLink } =
    useModalCreditToOpen({
      onSuccessRequestCreditLink(_data) {
        // if (_data?.success && _data.status === 200)
        // Mostrar el mesaje en un popup y luego hacer el navigate
        // leer la doc en la llave status, pasar el mouse por encima.
        //  _data.message
        // Solo hacer el navigate
        onNavigateToVerificationCode(_data);
      }
    });

  const onSelectAccount = (accountInfo: UserCreditInformation) => {
    setCreditAccountInfo(accountInfo);
  };

  const onPressSendCode = async () => {
    if (!creditAccountInfo) return;
    try {
      const requestResult = (await requestCreditLink(
        creditAccountInfo
      )) as RequestRawResult<AccountBondingResentCodeResponse>;
      if (requestResult.error || !requestResult.data?.success) {
        const error = requestResult.error as IErrorCredit;
        if (error?.status === 452)
          setModalCreditBlock({
            show: true,
            textContent: error?.data.message
          });
      }
    } catch (_) {
      setModalCreditBlock({
        show: true,
        textContent: TEXT_CONTENT_ERROR
      });
    }
  };

  const onNavigateToVerificationCode = (
    _data?: AccountBondingResentCodeResponse
  ) => {
    navigation.navigate(CreditVinculationNavigationRoutes.ConfirmationCode, {
      creditAccountInfo,
      userPhoneNumber: creditAccountInfo?.celularCtaDisplay
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (!IS_LOGIN || isLoadingByValidationContactlessPayment) {
        return;
      }
      loadCreditsUser();
    }, [IS_LOGIN, isLoadingByValidationContactlessPayment])
  );

  useFocusEffect(
    useCallback(() => {
      if (IS_LOGIN && deviceId) {
        validVinculation();
      }
    }, [IS_LOGIN, deviceId])
  );

  useEffect(() => {
    if (!loadingGetcredits) {
      if (statusCredit === 404) {
        setModalCreditNoFound({
          show: true,
          textContent: messageCredit
        });
        return;
      }
      if (statusCredit === 400 || statusCredit === 452) {
        setModalCreditBlock({
          show: true,
          textContent: messageCredit
        });
        return;
      }
    }
  }, [loadingGetcredits, messageCredit, statusCredit]);

  function handleCloseAction() {
    setModalCreditBlock({
      ...modalCreditBlock,
      show: false
    });
    setModalCreditNoFound({
      ...modalCreditNoFound,
      show: false
    });
    navigation.goBack();
  }

  return (
    <TemplatePage
      loading={loadingGetcredits || isLoadingByValidationContactlessPayment}>
      <ScrollView style={[globalStyles.scrollViewStyle]}>
        <View style={Styles.contentContainer}>
          <CardHeader
            stepText={'Paso 1 de 2'}
            titleText={`Vincula tu crédito`}
            bodyText={' ¡Tranquilo! Este paso solo se hace una vez.'}
          />
          <Text style={Styles.title}>¿Cuál cuenta quieres vincular?</Text>
          <Text style={Styles.text}>
            Selecciona tu cuenta como titular o adicional
          </Text>
          <ModalSelectContent
            wrapperStyle={{ marginVertical: 0 }}
            onSelectAccount={onSelectAccount}
          />
          <View style={Styles.divider} />
          <Text style={Styles.textFooter}>
            {t('confirmSecureMessage')}
            <Text>
              {'\n\n'}
              {t('codeToSend')} {creditAccountInfo?.celularCtaDisplay}
            </Text>
          </Text>
          <Button
            onPress={onPressSendCode}
            backgroundColor={Styles.buttonSendCode.backgroundColor}
            textColor={Styles.buttonSendCode.color}
            linkName="ENVIAR CÓDIGO"
            marginTop={Styles.buttonSendCode.marginTop}
            activityIndicator={{
              color: Styles.activityIndicator.color,
              size: 'small'
            }}
            disabled={
              !creditAccountInfo ||
              loadingRequestCreditLink ||
              loadingGetcredits ||
              isLoadingByValidationContactlessPayment
            }
            showActivityIndicator={
              loadingRequestCreditLink ||
              loadingGetcredits ||
              isLoadingByValidationContactlessPayment
            }
          />
          <PopupWhatsapp
            visible={modalCreditBlock.show}
            title={modalCreditBlock.textContent}
            onClose={handleCloseAction}
          />
          <Popup
            visible={modalCreditNoFound.show}
            title={modalCreditNoFound.textContent}
            icon="error"
            iconColor={COLORS.BRAND}
            closeAction={handleCloseAction}
            showCloseButton={true}
            buttonText={'Solicita tu crédito aquí'.toLocaleUpperCase()}
            buttonType={'full'}
            buttonAction={() => {
              openUrl(creditWeb);
              handleCloseAction();
            }}
          />
        </View>
      </ScrollView>
    </TemplatePage>
  );
};

export interface SelectCreditAccountProps
  extends NativeStackScreenProps<
    CreditVinculationNavigationParams,
    CreditVinculationNavigationRoutes.SelectAccount
  > {}
