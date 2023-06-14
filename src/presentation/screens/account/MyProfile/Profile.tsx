import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../../common-components/buttons/Button';
import { CardProfile } from './components/profile-card';
import { Styles } from './profile.styles';
import { COLORS, FontStyles } from '../../../../application/common';
import {
  BottomSheet,
  IconButton
} from '../../../common-components/bottomSheet';
import ImageCard from '../../../common-components/credito/ImageCard';
import { Popup } from '../../../common-components/poppup';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useCreditBalance } from '../../contactless-payment/hooks/useCreditBalance.hook';
import { MyDataNavigationRoute } from '../../../navigation/account/my-data/my-data.navigator';
import { useCreditAccountBondingUnlinkAccountRequest } from '../../../../infrastucture/apis/creditAccountBonding';
import { useGetInfoUserRequest } from '../../../../infrastucture/apis/user/user.api';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import { handleChangeColorBold } from '../../../../application/utils';
import { useTranslation } from 'react-i18next';

export const Profile: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  useEmmaSdk({ route });

  const {
    save: saveInLocalStoarge,
    localStorageData: {
      [LocalStorageKey.User]: UserData,
      [LocalStorageKey.IsAccountAuthenticated]: hasAccountAuthenticated,
      [LocalStorageKey.UserEmail]: EMAIL,
      [LocalStorageKey.IpAddress]: IP_ADDRESS,
      [LocalStorageKey.UID]: UID,
      [LocalStorageKey.AccountAdditionalNumber]:
        GLOBAL_ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.AccountDisplayNumber]: ACCOUNT_DISPLAY_NUMBER,
      [LocalStorageKey.AccountNumber]: GLOBAL_ACCOUNT_NUMBER
    }
  } = useLocalStorage();

  const { data: userProfileData, isLoading: isLoadingByGetUserProfile } =
    useGetInfoUserRequest({
      email: EMAIL
    });

  useEffect(() => {
    if (!userProfileData) return;
    saveInLocalStoarge({
      [LocalStorageKey.User]: {
        ...UserData,
        ...userProfileData
      }
    });
  }, [userProfileData]);

  const { infoCreditBalance, isLoading: isLoadingByCreditBalance } =
    useCreditBalance();

  const [
    doUnlinkAccount,
    { isLoading: isLoadingByUnlinkAccount, data: dataByUnlinkAccount }
  ] = useCreditAccountBondingUnlinkAccountRequest();

  const [infoCredit, setInfoCredit] = useState<string[]>([]);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] =
    React.useState(false);
  const [showSuccesPopUp, setShowSuccesPopUp] = React.useState(false);

  const onCloseRequestBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const onPressDesvinculateCredit = () => {
    setShowBottomSheet(true);
  };

  const onShowConfirmationPopUp = () => {
    setShowBottomSheet(false);
    setTimeout(() => {
      setShowConfirmationPopUp(true);
    }, 400);
  };

  const closeByCancelConfirmationPopUp = () => {
    setShowConfirmationPopUp(false);
  };

  const closeSuccessPopUp = () => {
    setShowSuccesPopUp(false);
    navigation.goBack();
  };

  const onCreditDesvinculate = () => {
    setShowConfirmationPopUp(false);
    onActionDesvinculate();
  };

  const onActionDesvinculate = () => {
    doUnlinkAccount({
      channel: 'App',
      ip: IP_ADDRESS,
      adicional: GLOBAL_ADDITIONAL_ACCOUNT_NUMBER,
      cuenta: GLOBAL_ACCOUNT_NUMBER,
      email: EMAIL,
      idDispositivo: UID
    });
  };

  useEffect(() => {
    if (!dataByUnlinkAccount) return;
    if (!dataByUnlinkAccount.success) return;
    /** @todo Define what other thinks are missings to disable */
    saveInLocalStoarge({
      [LocalStorageKey.IsAccountAuthenticated]: false,
      [LocalStorageKey.AccountNumber]: '',
      [LocalStorageKey.AccountDisplayNumber]: '',
      [LocalStorageKey.AccountAdditionalNumber]: ''
    });
    setTimeout(() => {
      setShowSuccesPopUp(true);
    }, 700);
  }, [dataByUnlinkAccount]);

  useEffect(() => {
    const _infoCredit = [];
    const { affiliateDate, clientName = UserData.name } =
      infoCreditBalance || {};
    _infoCredit.push(clientName.toUpperCase());
    _infoCredit.push(ACCOUNT_DISPLAY_NUMBER);
    affiliateDate && _infoCredit.push(`${t('costumerFrom2')}${affiliateDate}`);
    setInfoCredit(_infoCredit);
  }, [infoCreditBalance]);

  return (
    <ScrollView
      style={Styles.profile}
      contentContainerStyle={{ paddingBottom: 100 }}>
      <CardProfile />
      <Button
        linkName={`${t('APP_BOTON_LABEL.updateMyData')}`}
        backgroundColor={COLORS.BRAND}
        textColor={FontStyles.LightColor.color}
        disabled={isLoadingByGetUserProfile}
        onPress={() =>
          navigation.navigate(MyDataNavigationRoute.FormEdit as never)
        }
      />
      {hasAccountAuthenticated && (
        <>
          <Divider style={Styles.line} />

          <View style={Styles.cardFooter}>
            <Text style={[FontStyles.Body_1, Styles.credit_paragraph]}>
              {`${t('want')}`}
              {handleChangeColorBold(`${t('removeAccess')}`, '#3C4858')}
              {`${t('toYourCreditFromThisDevice')}`}
            </Text>
            <Button
              linkName={`${t('APP_BOTON_LABEL.unlinkCredit')}`}
              backgroundColor={COLORS.WHITE}
              textColor={FontStyles.DarkColor.color}
              containerStyle={{
                borderColor: FontStyles.DarkColor.color,
                borderWidth: 1
              }}
              marginTop={16}
              showActivityIndicator={isLoadingByUnlinkAccount}
              disabled={isLoadingByUnlinkAccount || isLoadingByCreditBalance}
              onPress={onPressDesvinculateCredit}
            />
          </View>
        </>
      )}

      <BottomSheet
        percentage={70}
        canDrop={false}
        show={showBottomSheet}
        header={
          <View style={Styles.bottomsheet__iconButtonClose}>
            <IconButton
              iconName="close"
              onPress={onCloseRequestBottomSheet}
              testID={''}
            />
          </View>
        }>
        <View style={Styles.bottomsheet__paragraph}>
          <Text style={FontStyles.H1_Headline}>
            {`${t('unlinkDePratiCredit')}`}
          </Text>
          <ImageCard
            infoUserCredit={infoCredit}
            style={{
              width: 360,
              height: 230,
              marginBottom: 16
            }}
          />
          <Text style={FontStyles.Body_2}>
            {`${t('byUnlinkingTheAccount')}`}
          </Text>
          <Text style={[FontStyles.Bold]}>{`${t('continueDesire')}`}</Text>
          <Button
            linkName={`${t('APP_BOTON_LABEL.yesContinue')}`}
            backgroundColor={COLORS.BRAND}
            textColor={FontStyles.LightColor.color}
            marginTop={16}
            onPress={onShowConfirmationPopUp}
          />
        </View>
      </BottomSheet>
      <Popup
        visible={showConfirmationPopUp}
        title={`${t('areYouSureUnlink')}`}
        buttonType="short"
        showCloseButton={true}
        closeAction={closeByCancelConfirmationPopUp}
        buttonAction={onCreditDesvinculate}
        onCloseRequest={() => {}}
        buttonText={`${t('APP_BOTON_LABEL.iAgree')}`}
      />
      <Popup
        visible={showSuccesPopUp}
        title={`${t('success.creditUnlinked')}`}
        icon="check-circle"
        hideButton={true}
        iconColor={COLORS.GREENOK}
        closeAction={closeSuccessPopUp}
        showCloseButton={true}
      />
    </ScrollView>
  );
};

export default Profile;
