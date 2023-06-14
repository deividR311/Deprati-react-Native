import {
  useNavigation,
  useFocusEffect,
  useIsFocused
} from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  COLORS,
  FONTS_FAMILY,
  FontStyles,
  NAV
} from '../../../application/common';
import useGetCreditsUser from '../../../application/common/hooksCommons/useGetCreditsUser';
import useOpenLinkInApp from '../../../application/common/hooksCommons/useOpenLinkInApp';
import {
  LocalStorageKey,
  useLocalStorage
} from '../../../application/state-manager/services/localstorage';
import { creditWeb } from '../../../application/utils/urls';
import { useLazyContactlesspaymentRequest } from '../../../infrastucture/apis/creditAccountBonding/contactlesspayment.api';
import { keyEventsViewModal } from '../../../infrastucture/native-modules/emma';
import { keyEvents } from '../../../infrastucture/native-modules/emma/clickEventMap';
import {
  trackEventclick,
  trackEventView
} from '../../../infrastucture/native-modules/emma/useEmma.hook';
import { MainButton } from '../../common-components/buttons/Button';
import CardReload from '../../common-components/cardReload/cardReload';
import ImageCard, {
  ImageCardRezise
} from '../../common-components/credito/ImageCard';
import TemplatePage from '../../common-components/template-page';
import { useCreditBalance } from '../contactless-payment/hooks/useCreditBalance.hook';
import Benefits from './components/Benefits';
import ButtonRelatedCredit from './components/ButtonRelatedCredit';
import SkeletonCredit from './SkeletonCredit';
import { stylesCredit } from './stylesCredit';
import NextPayment from './components/NextPayment';
import { fontWeightOS } from '../../../application/utils';
import { useTranslation } from 'react-i18next';

const WIDTH_SCREEN = Dimensions.get('screen').width;

export default function CreditScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  // const dispatch = useAppDispatch()
  const openUrl = useOpenLinkInApp();
  const focused = useIsFocused();

  const { localStorageData, save: saveInLocalStoarge } = useLocalStorage();
  const [contentCard, setContentCard] = useState<string[]>([]);
  // const [showModaCreditLock, setShowModaCreditLock] = useState<boolean>(false)

  const {
    [LocalStorageKey.UID]: deviceId,
    [LocalStorageKey.IsLogin]: IS_LOGIN,
    [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
    [LocalStorageKey.AccountDisplayNumber]: AccountDisplayNumber,
    [LocalStorageKey.User]: LocalUserData
  } = localStorageData;

  const { loadCreditsUser, isLoading: loadingGetcredits } = useGetCreditsUser();
  const [validContactlesspayment, { data, isLoading, isError, isSuccess }] =
    useLazyContactlesspaymentRequest();
  const {
    getAccountBalance,
    infoCreditBalance = {
      clientName: 'Crhistian Vergara',
      affiliateDate: 'Febrero 2023'
    },
    isLoading: isLoadingBalance,
    hasError
  } = useCreditBalance();

  const showVinculation = useMemo(() => {
    if (IS_LOGIN && IsAccountAuthenticated) return true;
    return false;
  }, [IsAccountAuthenticated, IS_LOGIN]);

  const showVinculationLogin = useMemo(() => {
    return !(IS_LOGIN && IsAccountAuthenticated);
  }, [IsAccountAuthenticated, IS_LOGIN]);

  useLayoutEffect(() => {
    if (IS_LOGIN && isSuccess) {
      loadCreditsUser();

      if (data !== undefined && Object.keys(data).length > 0) {
        /* if (
          LocalUserData?.directCreditCodeCustomer ===
            data.directCreditCodeCustomer &&
          LocalUserData?.directCreditCodeAdditional ===
            data.directCreditCodeAdditional
        ) { */
        saveInLocalStoarge({
          [LocalStorageKey.IsSucessFirstLogin]: true,
          [LocalStorageKey.AccountNumber]: data.directCreditCodeCustomer,
          [LocalStorageKey.IsAccountAuthenticated]: true,
          [LocalStorageKey.AccountAdditionalNumber]:
            data.directCreditCodeAdditional
        });
      } else {
        // siempre tenerla en false
        saveInLocalStoarge({ [LocalStorageKey.IsAccountAuthenticated]: false });
        // solo descomentar para probar vinculacion
        /* if (__DEV__) {
          saveInLocalStoarge({
            [LocalStorageKey.AccountAdditionalNumber]: '00',
            [LocalStorageKey.AccountNumber]: '63663806417324',
          })
        } */
      }
    }
  }, [IS_LOGIN, data, isLoading, isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      if (IS_LOGIN && deviceId) {
        validContactlesspayment({
          deviceId
        });
      }
    }, [IS_LOGIN, deviceId])
  );

  useEffect(() => {
    let contentCardClone = [];
    if (infoCreditBalance?.clientName) {
      contentCardClone[0] = infoCreditBalance?.clientName;
      contentCardClone[1] = AccountDisplayNumber;
      contentCardClone[2] = `${t('costumerFrom2')}${
        infoCreditBalance.affiliateDate
      }`;
    }
    setContentCard(contentCardClone);
  }, [AccountDisplayNumber, infoCreditBalance, focused]);

  useEffect(() => {
    try {
      if (focused) {
        let event = keyEventsViewModal.credito_screen_anonimo;
        if (!IS_LOGIN) event = keyEventsViewModal.credito_screen_anonimo;
        if (IS_LOGIN) event = keyEventsViewModal.credito_screen_logueado;
        if (IsAccountAuthenticated)
          event = keyEventsViewModal.credito_screen_identificado;

        trackEventView(event);
      }
    } catch (error) {}
  }, [IsAccountAuthenticated, IS_LOGIN, focused]);

  return (
    <TemplatePage
      loading={isLoading || loadingGetcredits}
      skeleton={<SkeletonCredit />}
      error={isError && IS_LOGIN}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showVinculation && (
          <CardReload
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16
            }}
            typeCard={'information'}
            text={
              <Text style={FontStyles.Body_2}>
                {`${t('error.chargingErrorOccurred')}`}&nbsp;
                <Text style={[FontStyles.Bold]}>
                  {`${t('error.reloadThisSection')}`}
                </Text>
              </Text>
            }
            isVisible={hasError}
            onClose={() => {
              if (data !== undefined && Object.keys(data).length > 0) {
                getAccountBalance({
                  numeroCuenta: data?.directCreditCodeCustomer,
                  adicional: data?.directCreditCodeAdditional,
                  identificacion: LocalUserData?.documentTypeNumber,
                  deviceId: deviceId
                });
              }
            }}
            onPress={args => {
              if (data !== undefined && Object.keys(data).length > 0) {
                getAccountBalance({
                  numeroCuenta: data?.directCreditCodeCustomer,
                  adicional: data?.directCreditCodeAdditional,
                  identificacion: LocalUserData?.documentTypeNumber,
                  deviceId: deviceId
                });
              }
            }}
          />
        )}
        <View style={stylesCredit.container}>
          {showVinculation && (
            <ImageCardRezise
              size={WIDTH_SCREEN - 84}
              infoUserCredit={contentCard}
            />
          )}

          {showVinculationLogin && (
            <View
              style={{
                backgroundColor: '#F5F6F9',
                width: '100%',
                justifyContent: 'center',
                paddingHorizontal: 12,
                alignSelf: 'center'
              }}>
              <ImageCard style={{ width: 133, height: 80 }} />

              <View style={{ marginTop: 12 }}>
                <Text
                  style={{
                    ...FontStyles.H6_Headline,
                    fontSize: 18,
                    lineHeight: 24,
                    color: COLORS.DARKBRAND,
                    fontWeight: fontWeightOS('700')
                  }}>
                  {IS_LOGIN
                    ? `${t('accessTheServices')}`
                    : `${t('accessTheBenefits')}`}
                </Text>
                <Text
                  style={{
                    ...FontStyles.H6_Headline,
                    fontSize: 16,
                    lineHeight: 22,
                    fontWeight: fontWeightOS('700')
                  }}>
                  {IS_LOGIN
                    ? `${t('youMustLinkCredit')}`
                    : `${t('signInAndLinkYourCredit')}`}
                </Text>
              </View>

              <View>
                <ButtonRelatedCredit
                  trackEmma={() => {
                    trackEventclick(keyEvents.credito_vincular);
                  }}
                />
              </View>
            </View>
          )}

          <Divider
            style={[
              stylesCredit.container_solicitar_divider,
              {
                width: showVinculation ? '100%' : '90%',
                alignSelf: 'center'
              },
              showVinculation
                ? {
                    marginVertical: 'auto',
                    marginTop: 18
                  }
                : undefined
            ]}
          />

          {showVinculation && (
            <>
              <NextPayment
                contentPayment={infoCreditBalance}
                stylesCustom={{
                  nextPayment: stylesCredit.container_nextPage,
                  nextPayment__title_text: stylesCredit.titleNextPay
                }}
                loading={isLoadingBalance}
              />
              <Divider style={stylesCredit.container_solicitar_divider} />
            </>
          )}

          {showVinculationLogin && (
            <View style={[stylesCredit.container_solicitar]}>
              <Text style={stylesCredit.container_solicitar_subtitle}>
                {`${t('stillDontHaveIt')}`}
              </Text>
              <MainButton
                testID="credit_solicitar_btn"
                onPress={() => {
                  trackEventclick(keyEvents.credito_solicitar);
                  openUrl(creditWeb);
                }}
                style={stylesCredit.container_solicitar_button}
                styleText={stylesCredit.container_solicitar_button_text}
                title={`${t('APP_BOTON_LABEL.requestItHere')}`}
              />

              <Text
                style={[
                  FontStyles.H3_Headline,
                  {
                    fontSize: 18,
                    marginTop: 32,
                    fontFamily: FONTS_FAMILY['Roboto-Bold']
                  }
                ]}>
                {`${t('beginAndEnjoyBenefits')}`}
              </Text>
            </View>
          )}

          {showVinculationLogin && <Benefits />}

          {showVinculation && (
            <TouchableOpacity
              testID="credit_services_btn"
              onPress={() => navigation.navigate(NAV.CREDIT_SERVICES as never)}
              activeOpacity={0.9}
              style={[stylesCredit.shadow, stylesCredit.container_services]}>
              <View>
                <Text style={[stylesCredit.container_services_text]}>
                  {`${t('dePratiCreditServices')}`}
                </Text>
              </View>
              <Icon
                name="arrow-forward-ios"
                size={15}
                color={COLORS.GRAYDARK60}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </TemplatePage>
  );
}
