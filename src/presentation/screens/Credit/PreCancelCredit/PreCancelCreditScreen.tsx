//Libs
import React, { FC } from 'react';
import { ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider } from 'react-native-paper';
//hooks
import { usePreCancelCredit } from './hooks/usePreCancelCredit.hook';
//components
import TemplatePage from '../../../common-components/template-page';
import CheckboxComp from '../../../common-components/checkboxs';
import CardDeferred from './components/CardDeferred';
import CardInformation from '../../../common-components/cardInformation/CardInformation';
import FooterPreCancel from './components/FooterPreCancel';
import { SkeletonPreCancelCredit } from './components/skeleton/SkeletonPreCancelCredit';
import NoDeferred from './components/NoDeferred';
//styles
import { styles } from './stylePreCancelCredit';
//utils
import { COLORS, FontStyles, NAV } from '../../../../application/common';
import { CreditNavigationProps } from '../../../navigation/credit';
import { useRoute } from '@react-navigation/native';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';

const TITLE = 'Selecciona los diferidos que\nquieres precancelar';

const TEXT_CARD_ACTIVE = 'Tienes una solicitud activa.';
export const PreCancelCreditScreen: FC<PreCancelCreditProps> = props => {
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    deferredList,
    isExistData,
    handleIsSelected,
    showCardActive,
    setShowCardActive,
    isAllItems,
    handleIsAllItems,
    handleGlobal,
    handleToAccept,
    valuesFooter,
    onDisableButton,
    //loading
    loading,
    isError,
    showError,
    handleClose,
    isErrorRegisterTicket,
    errorRegisterTicket
  } = usePreCancelCredit();
  if (loading.isLoadingDeferredList) return <SkeletonPreCancelCredit />;
  if (isExistData && deferredList.length === 0)
    return <NoDeferred onPress={handleClose} />;
  return (
    <TemplatePage loading={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[FontStyles.Body_1, styles.subTitle]}>{TITLE}</Text>
        {showCardActive && (
          <CardInformation
            style={{ marginHorizontal: 10, marginTop: 10 }}
            styleContent={{ paddingVertical: 24 }}
            styleText={FontStyles.Body_2}
            text={TEXT_CARD_ACTIVE}
            onClose={() => setShowCardActive(false)}
          />
        )}
        <Divider style={styles.divider} />
        <CheckboxComp
          disabled={false}
          status={isAllItems ? 'checked' : 'unchecked'}
          onPress={handleIsAllItems}
          color={COLORS.BRAND}
          uncheckedColor={COLORS.GRAYCHECK}
          styleContainer={styles.checkBox}
          // textStyle={}
          label={'Seleccionar todos los diferidos'}
        />
        {deferredList.map((x, index) => (
          <CardDeferred
            key={`Deferred-${index}`}
            item={x}
            infoSelected={x.option}
            handleGlobal={handleGlobal}
          />
        ))}
      </ScrollView>
      <FooterPreCancel
        disabled={onDisableButton}
        valuesFooter={valuesFooter}
        onPress={handleToAccept}
        loading={loading.isLoadingRegisterTicket}
      />
      <PopupWhatsapp
        visible={isErrorRegisterTicket}
        title={errorRegisterTicket?.data.message}
        onClose={handleClose}
      />
    </TemplatePage>
  );
};

export interface PreCancelCreditProps
  extends NativeStackScreenProps<CreditNavigationProps, NAV.CreditPreCancel> {}
