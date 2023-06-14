import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES,
  HEIGHT_TAB_BAR
} from '../../../../../application/common';
import { useWhatsapp } from '../../../../../application/common/hooksCommons/useOpenLinkInApp';

import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import sleep from '../../../../../application/utils/sleep';
import { useCreditAccountBondingUnlinkAccountRequest } from '../../../../../infrastucture/apis/creditAccountBonding';
import {
  useBlockCardMutationRequest,
  useBlockReasonMutationRequest
} from '../../../../../infrastucture/apis/creditBlock/creditBlock.api';
import { BottomSheet } from '../../../../common-components/bottomSheet';
import Button, {
  ButtonText,
  MainButton
} from '../../../../common-components/buttons/Button';
import CheckboxComp from '../../../../common-components/checkboxs';
import ImageCard from '../../../../common-components/credito/ImageCard';
import { FullLoadingComponent } from '../../../../common-components/fullLoadingComponent/FullLoadingComponent';
import SelectInput from '../../../../common-components/inputs/SelectInput';
import { IconButtonCloseTop } from '../../../../common-components/moda-password/components/IconButtonCloseTop';
import { Popup } from '../../../../common-components/poppup';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
interface Props {
  onCloseRequest: (locked?: boolean) => void;
  showModaCreditLock: boolean;
  setShowModaCreditLock: (set: boolean) => void;
}

const BottomSheetCreditLock = ({
  showModaCreditLock,
  setShowModaCreditLock: setShowModalCreditLock,
  onCloseRequest
}: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [openWhatsapp] = useWhatsapp();

  const [blockMotive, setBlockMotive] = useState('');
  const [blockReasons, setLockReasons] = useState([]);
  const [checkDefault, setcheckDefault] = useState(false);
  const [creditLockStatus, setCreditLockStatus] = useState<boolean>();
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [showModaCreditUnlinkAccount, setShowModaCreditUnlinkAccount] =
    useState(false);
  const [showSuccesPopUp, setShowSuccesPopUp] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [showModaCreditLockError, setShowModalCreditLockError] =
    useState(false);

  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.UID]: deviceId,
      [LocalStorageKey.User]: userData,
      [LocalStorageKey.AccountAdditionalNumber]:
        GLOBAL_ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.AccountNumber]: GLOBAL_ACCOUNT_NUMBER,
      [LocalStorageKey.Whatsapp]: {
        message: WhatsappMessage,
        phone: WhatsappPhone
      }
    }
  } = useLocalStorage();

  const [
    getLockReason,
    {
      data: lockReasonData,
      isError: lockReasonHasError,
      error: lockReasonError
    }
  ] = useBlockReasonMutationRequest();

  const [
    doCreditLock,
    { isError: creditLockHasError, error: errorCreditLock }
  ] = useBlockCardMutationRequest();

  const [doUnlinkAccount, { isError: unlinkAccountHasError }] =
    useCreditAccountBondingUnlinkAccountRequest();

  const onPressCreditBlock = async () => {
    try {
      setShowConfirmationPopUp(false);
      await sleep(1500);
      setShowLoaderModal(true);
      await sleep(2000);
      const { error: creditLockError } = await doCreditLock({
        identification: userData?.documentTypeNumber ?? '',
        blockMotive: blockMotive,
        deviceId: deviceId,
        account: GLOBAL_ACCOUNT_NUMBER
      });
      const { error: unLinkError } = await doUnlinkAccount({
        adicional: GLOBAL_ADDITIONAL_ACCOUNT_NUMBER,
        cuenta: GLOBAL_ACCOUNT_NUMBER,
        email: USER_EMAIL,
        idDispositivo: deviceId
      });

      setShowLoaderModal(false);
      await sleep(1000);
      if (!unLinkError && !creditLockError) {
        setCreditLockStatus(true);
        setShowSuccesPopUp(true);
        return;
      }
      if (creditLockError) {
        setShowModalCreditLockError(true);
        return;
      }
      if (unLinkError) {
        setShowModaCreditUnlinkAccount(true);
        return;
      }
    } catch (error) {
      console.log('👉 Ups! error: ', error);
      setShowLoaderModal(false);
      await sleep(2000);
    }
  };

  const onCloseSuccessModal = async () => {
    setShowSuccesPopUp(false);
    setShowModalCreditLock(false);
  };

  const onLinkWhatsapp = () => {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  };

  useEffect(() => {
    setCreditLockStatus(undefined);
  }, []);

  useLayoutEffect(() => {
    if (!IS_LOGIN || !IsAccountAuthenticated) return;
    getLockReason({
      deviceId: deviceId
    })
      .unwrap()
      .then(data => {
        const reasons = data.data.map((reason: string) => {
          return {
            label: reason?.description,
            value: reason?.description
          };
        });
        setLockReasons(reasons);
      });
  }, [IS_LOGIN, IsAccountAuthenticated]);

  useEffect(() => {
    if (!lockReasonHasError) return;
    setShowModalCreditLockError(true);
  }, [lockReasonHasError]);

  const onCloseBottomSheet = () => {
    setcheckDefault(false);
    setBlockMotive('');
    onCloseRequest?.(creditLockStatus);
    if (creditLockStatus) {
      navigation?.goBack();
    }
  };

  return (
    <BottomSheet
      percentage={72}
      canDrop={false}
      show={showModaCreditLock}
      paddingHorizontal={16}
      isCancelable
      onCloseRequest={onCloseBottomSheet}
      header={
        <View style={styles.bottomsheet__iconButtonClose}>
          <IconButtonCloseTop
            iconName="close"
            onPress={() => setShowModalCreditLock(false)}
          />
        </View>
      }>
      <>
        <View style={styles.container__title}>
          <Text style={styles.containerTitle}>{`${t('blockYourcredit')}`}</Text>
        </View>
        <View style={styles?.contentContainer}>
          <ImageCard style={{ width: 215, height: 130 }} />
          <SelectInput
            styles={{ marginTop: 14, width: 290 }}
            label={`${t('selectReason')}`}
            items={blockReasons}
            onChange={motive => setBlockMotive(motive)}
          />
          <View style={{ marginTop: 10, marginLeft: -30 }}>
            <CheckboxComp
              label={`${t('sureToBlockMyDePratiCredit')}`}
              color={COLORS.BRAND}
              onPress={() => setcheckDefault(!checkDefault)}
              status={checkDefault ? 'checked' : 'unchecked'}
            />
          </View>

          <View style={styles.conditionsContainer}>
            <Text style={styles.conditionsText}>
              {`${t('actionCantCanceled')}`}
              <Text
                onPress={() => onLinkWhatsapp()}
                style={{ color: FontStyles.PrimaryColor.color }}>
                {` ${t('customerService')} `}
              </Text>
            </Text>
          </View>
          <Button
            linkName={`${t('APP_BOTON_LABEL.blockYourDePratiCredit')}`}
            marginTop={14}
            containerStyle={{
              width: '82%',
              borderColor: COLORS.BORDERCOLOR,
              borderWidth: 1,
              backgroundColor:
                checkDefault && blockMotive ? COLORS.BRAND : COLORS.GRAYDARK20
            }}
            textColor={
              checkDefault && blockMotive
                ? FontStyles.LightColor.color
                : COLORS.BORDERCOLOR
            }
            onPress={() => {
              setShowConfirmationPopUp(true);
            }}
            disabled={!checkDefault || !blockMotive}
          />
          <Button
            linkName={`${t('APP_BOTON_LABEL.cancel')}`}
            marginTop={14}
            containerStyle={{ width: '45%' }}
            backgroundColor={COLORS.WHITE}
            textColor={COLORS.BRAND}
            textStyle={{ textDecorationLine: 'underline' }}
            onPress={() => setShowModalCreditLock(false)}
          />
        </View>
        <>
          <Popup
            visible={showModaCreditUnlinkAccount}
            title={`${t('error.unlinkCredit')}`}
            icon="error"
            hideButton={true}
            iconColor={COLORS.REDICON}
            closeAction={() => setShowModaCreditUnlinkAccount(false)}
            showCloseButton={true}
          />
          <Popup
            key={'error'}
            visible={showModaCreditLockError}
            title={`${t('error.hasOccurred')}${
              lockReasonError?.data.Message || errorCreditLock?.data.Message
            }`}
            icon="error"
            hideButton={true}
            iconColor={COLORS.REDICON}
            closeAction={() => setShowModalCreditLockError(false)}
            showCloseButton={true}
          />
          <Popup
            key={'question'}
            visible={showConfirmationPopUp}
            title={`${t('sureToBlockYourDePratiCredit')}`}
            showCloseButton={true}
            closeAction={() => setShowConfirmationPopUp(false)}
            bodyComponent={() => (
              <View>
                <View>
                  <MainButton
                    onPress={() => onPressCreditBlock()}
                    title={`${t('APP_BOTON_LABEL.accept2')}`}
                    style={{ width: '100%', marginVertical: 10 }}
                  />
                </View>
                <ButtonText
                  disabled={false}
                  onPress={() => setShowConfirmationPopUp(false)}
                  styleText={{ color: COLORS.BRAND }}
                  title={`${t('APP_BOTON_LABEL.cancel')}`}
                />
              </View>
            )}
            hideButton={true}
          />
          <Popup
            key={'success'}
            visible={showSuccesPopUp}
            title={`${t('dePratiCreditBlocked')}`}
            icon="check-circle"
            hideButton={true}
            iconColor={COLORS.GREENOK}
            showCloseButton={true}
            closeAction={onCloseSuccessModal}
          />
          <FullLoadingComponent visible={showLoaderModal} />
        </>
      </>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR + 50,
      ios: 0
    }),
    paddingHorizontal: 24
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container__title: {
    // paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerTitle: {
    fontSize: FONTS_SIZES.extra,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  bottomsheet__iconButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // paddingBottom: 11,
    // marginTop: 18,
    marginBottom: 25,
    width: '100%'
  },
  conditionsContainer: {
    width: '70%',
    marginTop: 20
  },
  conditionsText: {
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Roboto
  }
});

export default BottomSheetCreditLock;
