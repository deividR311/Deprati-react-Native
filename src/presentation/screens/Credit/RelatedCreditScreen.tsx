import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import useGetCreditsUser from '../../../application/common/hooksCommons/useGetCreditsUser';
import { NAV } from '../../../application/common/namesNav';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { ButtonText } from '../../common-components/buttons/Button';
import ImageCard from '../../common-components/credito/ImageCard';
import { stylesSignUp } from '../SignUp/stylesSignUp';
import ButtonRelatedCredit from './components/ButtonRelatedCredit';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function RelatedCreditScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { save, localStorageData } = useLocalStorage();
  const { isError, isLoading, loadCreditsUser } = useGetCreditsUser();

  const handleOmitir = () => {
    save({
      [LocalStorageKey.IsSucessFirstLogin]: true
    });
    navigation.dispatch(StackActions.replace(NAV.DASHBOARD_NAVIGATION));
  };

  useLayoutEffect(() => {
    loadCreditsUser();
  }, [localStorageData[LocalStorageKey.User]]);

  return (
    <View style={{ marginHorizontal: 16, flex: 1 }}>
      <ImageCard />
      <Text style={stylesSignUp.titleCredit}> {t('creditSaveTime')} </Text>
      <Text style={stylesSignUp.subtitle1}>{t('creditLink1')} &nbsp;</Text>
      <ButtonRelatedCredit
        disabled={isError}
        title={'Vincular crédito de Prati'.toLocaleUpperCase()}
      />
      <View style={{ flex: 1, height: '100%' }} />
      <ButtonText
        testID={'vincular_credito_omitir'}
        style={{
          marginBottom: 16
        }}
        styleText={{ color: COLORS.BRAND }}
        title="Omitir"
        onPress={() => {
          handleOmitir();
        }}
      />
    </View>
  );
}
