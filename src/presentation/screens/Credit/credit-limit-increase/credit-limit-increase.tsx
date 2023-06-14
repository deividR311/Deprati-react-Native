import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  FontStyles,
  HEIGHT_TAB_BAR,
  NAV
} from '../../../../application/common';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  DataCustomerService,
  useContentServiceMutation
} from '../../../../infrastucture/apis/contentService';
import { useAccountBalanceByAccountNumberRequest } from '../../../../infrastucture/apis/credit-balance';
import {
  useCurrentCreditLimitRequest,
  useIncreaseCreditLimitRequest
} from '../../../../infrastucture/apis/credit/credit.api';
import {
  keyEventsViewModal,
  useEmmaSdk
} from '../../../../infrastucture/native-modules/emma';
import { trackEventView } from '../../../../infrastucture/native-modules/emma/useEmma.hook';
import Button from '../../../common-components/buttons/Button';
import CheckboxComp from '../../../common-components/checkboxs';
import { Popup } from '../../../common-components/poppup';
import TemplatePage from '../../../common-components/template-page';
import { CreditNavigationProps } from '../../../navigation/credit';
import { ClientInfoCard } from './components/client-info-card';
import { CreditLimitIncreaseCard } from './components/credit-limit-increase-card';
import { IncreaseCreditLimitSkeleton } from './components/increase-credit-limit.skeleton';
import {
  TextErrorIncreaseCreditLimit,
  TextSuccessIncreaseCreditLimit
} from './components/text-increase-result';

export const CreditLimitIncrease: FC<CreditLimitIncreaseProps> = props => {
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    localStorageData: {
      [LocalStorageKey.UID]: DeviceId,
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.AccountDisplayNumber]: ACCOUNT_DISPLAY_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: additional,
      [LocalStorageKey.User]: { documentTypeNumber: USER_ID }
    }
  } = useLocalStorage();

  const [getAccountInfo, { data: accountInfo, isError: errorAccountInfo }] =
    useAccountBalanceByAccountNumberRequest();

  const [
    getCurrentCreditLimit,
    { data: creditLimitInfo, isError: errorCurrentCreditLimit }
  ] = useCurrentCreditLimitRequest();

  const [
    getCustomerServicesInfo,
    { data: infoCustomerServices, isError: errorCustomerServiceInfo }
  ] = useContentServiceMutation();

  const [
    doIncrementCreditLimit,
    {
      isLoading: isLoadingByIncreaseCreditLimit,
      data: creditLimitIncreaseInfo,
      isError: errorByIncreaseCreditLimit,
      error: errorIncreaseCreditLimit
    }
  ] = useIncreaseCreditLimitRequest();

  const [newCreditLimit, setNewCreditLimit] = useState(
    creditLimitInfo?.data.clientQuota ?? 0
  );
  const [isLoadingByInitialData, setIsLoadingByInitialData] = useState(false);
  const [isSafeToIncreaseCreditLimit, setIsSafeToIncreaseCreditLimit] =
    useState<boolean>(false);

  const [showPopup, setShowPopup] = useState<
    { title: string; text: string } | undefined
  >(undefined);
  const [canIncrement, setCanIncrement] = useState(true);

  const loadInitialData = async () => {
    await Promise.all([
      getAccountInfo({
        numeroCuenta: ACCOUNT_NUMBER,
        adicional: additional,
        identificacion: USER_ID,
        deviceId: DeviceId
      }),
      getCurrentCreditLimit({
        deviceId: DeviceId,
        identification: USER_ID
      }),
      getCustomerServicesInfo({ content: 'customerService' })
    ]);
    setIsSafeToIncreaseCreditLimit(false);
  };

  const onChangeCreditLimit = (value: number) => {
    setNewCreditLimit(value);
  };

  const onIncreaseCreditLimit = async () => {
    doIncrementCreditLimit({
      deviceId: DeviceId,
      identification: USER_ID,
      newQuota: `${newCreditLimit}`
    });
  };

  const onClosePopup = () => {
    setShowPopup(undefined);
    setTimeout(() => {
      props.navigation.goBack();
    }, 500);
  };

  useEffect(() => {
    setIsLoadingByInitialData(true);
    loadInitialData().finally(() => {
      setIsLoadingByInitialData(false);
    });
  }, []);

  useEffect(() => {
    if (creditLimitIncreaseInfo?.success === undefined) return;
    if (creditLimitIncreaseInfo?.success) {
      const [title = '', ...content] =
        creditLimitIncreaseInfo?.message?.split('\\n') ?? '';
      const text = content?.join('<br>') ?? '';
      setShowPopup({ title, text });
      trackEventView(keyEventsViewModal.credito_aumentocupo_ok);
    }
    if (!creditLimitIncreaseInfo?.success) {
      setCanIncrement(false);
    }
  }, [creditLimitIncreaseInfo]);

  useEffect(() => {
    if (!errorByIncreaseCreditLimit) return;
    setCanIncrement(false);
  }, [errorByIncreaseCreditLimit]);

  const errorPage = useMemo(() => {
    return (
      errorAccountInfo || errorCurrentCreditLimit || errorCustomerServiceInfo
    );
  }, [errorAccountInfo, errorCurrentCreditLimit, errorCustomerServiceInfo]);

  return (
    <TemplatePage
      loading={isLoadingByInitialData}
      error={errorPage}
      skeleton={<IncreaseCreditLimitSkeleton />}>
      <ScrollView>
        <View style={Styles.container}>
          <Text style={[FontStyles.Subtitle, Styles.subtitle]}>
            Aumentar cupo
          </Text>
          <ClientInfoCard
            clientName={accountInfo?.data.nombreCliente ?? ''}
            accountNumber={ACCOUNT_DISPLAY_NUMBER}
            clientSince={accountInfo?.data.fechaClienteDesde ?? ''}
          />

          {canIncrement && (
            <>
              <View style={Styles.space} />
              <CreditLimitIncreaseCard
                holdInCurrentCreditLimit
                currentCreditLimit={creditLimitInfo?.data.clientQuota ?? 0}
                maxCreditLimit={creditLimitInfo?.data.maxQuota ?? 0}
                onChangeCreditLimit={onChangeCreditLimit}
              />
              <View style={Styles.space} />
              <CheckboxComp
                label="Estoy seguro que deseo aumentar mi cupo"
                status={isSafeToIncreaseCreditLimit ? 'checked' : 'unchecked'}
                onPress={() =>
                  setIsSafeToIncreaseCreditLimit(!isSafeToIncreaseCreditLimit)
                }
                color={COLORS.BRAND}
              />
              <Button
                onPress={onIncreaseCreditLimit}
                backgroundColor={COLORS.BRAND}
                textColor={COLORS.WHITE}
                linkName="ENVIAR"
                showActivityIndicator={isLoadingByIncreaseCreditLimit}
                activityIndicator={{
                  color: COLORS.WHITE,
                  size: 'small'
                }}
                marginTop={10}
                disabled={
                  !isSafeToIncreaseCreditLimit ||
                  isLoadingByIncreaseCreditLimit ||
                  newCreditLimit <= 0 ||
                  newCreditLimit <= creditLimitInfo?.data?.clientQuota
                }
              />
            </>
          )}

          {!canIncrement && (
            <TextErrorIncreaseCreditLimit
              phoneNumber={
                (infoCustomerServices?.data as DataCustomerService | undefined)
                  ?.customerService.whatsappPhoneNumber
              }
              text={
                creditLimitIncreaseInfo?.message ??
                errorIncreaseCreditLimit?.data?.Message
              }
              messageToSend={
                (infoCustomerServices?.data as DataCustomerService | undefined)
                  ?.customerService.whatsappMessage
              }
            />
          )}

          <Popup
            icon="check-circle"
            visible={!!showPopup}
            showCloseButton={true}
            hideButton={true}
            iconColor={COLORS.GREENOK}
            title={showPopup?.title}
            closeAction={onClosePopup}
            textComponent={() => (
              <TextSuccessIncreaseCreditLimit text={showPopup?.text} />
            )}
          />
        </View>
      </ScrollView>
    </TemplatePage>
  );
};

const Styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 64
  },
  contentContainer: {
    paddingBottom: HEIGHT_TAB_BAR
  },
  subtitle: {
    textAlign: 'left',
    marginBottom: 16
  },
  space: {
    height: 16
  }
});

export interface CreditLimitIncreaseProps
  extends NativeStackScreenProps<
    CreditNavigationProps,
    NAV.CreditLimitIncrease
  > {}
