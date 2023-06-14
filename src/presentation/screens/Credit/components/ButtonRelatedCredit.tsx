import { Alert, StyleSheet } from 'react-native';
import React from 'react';
import { MainButton } from '../../../common-components/buttons/Button';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useNavigation } from '@react-navigation/native';
import useModalCreditToOpen from '../hooks/useModalCreditToOpen';
import { COLORS, FontStyles, NAV } from '../../../../application/common';
import { useSelector } from 'react-redux';
import { creditState } from '../../../../application/state-manager/services/credit';
import { Popup } from '../../../common-components/poppup';
import ModalSelectContent from './modals/SelectModal/ModalSelectContent';
import IconCommunity from '../../../common-components/poppup/IconCommunity';

interface Props {
  title?: string;
  disabled?: boolean;
  trackEmma?(): void;
}
export default function ButtonRelatedCredit({
  title,
  disabled,
  trackEmma
}: Props) {
  const navigation = useNavigation();
  const {
    validateModalToOpen,
    isLoading,
    showCreditSelect,
    handleLinkedCredit,
    setShowCreditSelect,
    setselectedDisabledCredit,
    modalCreditBlock,
    handleCloseAction,
    handleButtonAction,
    handleCloseRequest
  } = useModalCreditToOpen();
  const userInfo = useSelector(creditState);

  const {
    localStorageData: { [LocalStorageKey.IsLogin]: IS_LOGIN }
  } = useLocalStorage();

  return (
    <>
      <MainButton
        onPress={() => {
          try {
            if (IS_LOGIN) {
              trackEmma?.();
              validateModalToOpen({ data: userInfo });
            } else {
              navigation.navigate(NAV.AUTH_NAVIGATION as never);
            }
          } catch (error) {}
        }}
        showActivityIndicator={isLoading}
        disabled={isLoading || disabled}
        style={styles.mainButton}
        title={
          IS_LOGIN ? title ?? 'VINCULA TU CRÉDITO DE PRATI' : 'INICIAR SESIÓN'
        }
      />
      <Popup
        visible={showCreditSelect}
        hideButton={false}
        title={'¿Qué cuenta quieres vincular?'}
        textContent={'Selecciona tu cuenta como titular o adicional'}
        titleStyle={styles.creditSelect}
        textComponent={() => <ModalSelectContent />}
        buttonAction={() => {
          setShowCreditSelect(false);
          handleLinkedCredit();
        }}
        onCloseRequest={() => {
          setselectedDisabledCredit(true);
        }}
        onDismiss={() => {
          setselectedDisabledCredit(true);
        }}
        closeAction={() => {
          setShowCreditSelect(false);
        }}
        showCloseButton={true}
        buttonType="full"
        buttonText="VINCULAR"
      />
      <Popup
        visible={modalCreditBlock.show}
        textContent={modalCreditBlock.textContent}
        icon="error"
        iconColor={COLORS.BRAND}
        textContentStyle={styles.creditNotFound}
        showCloseButton={true}
        buttonType="full"
        iconButton={
          <IconCommunity
            style={styles.iconCommunity}
            name="whatsapp"
            size={22}
          />
        }
        buttonText={'ESCRÍBENOS POR WHATSAPP'.toLocaleUpperCase()}
        closeAction={handleCloseAction}
        buttonAction={handleButtonAction}
        onCloseRequest={handleCloseRequest}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainButton: { width: '100%', marginVertical: 16 },
  creditSelect: { textAlign: 'left', alignSelf: 'flex-start' },
  creditNotFound: {
    marginBottom: 16,
    paddingHorizontal: 14,
    textAlign: 'center'
  },
  iconCommunity: {
    marginTop: -1,
    color: FontStyles.LightColor.color,
    marginRight: 7
  }
});
