import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY
} from '../../../../../application/common';
import useContentServiceRequest from '../../../../../infrastucture/apis/contentService/useContentServiceRequest.hook';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import Button, {
  ButtonText
} from '../../../../common-components/buttons/Button';
import ImageCard from '../../../../common-components/credito/ImageCard';
import InputBase from '../../../../common-components/inputs/InputBase';
import ErrorText from '../../../../common-components/texts/ErrorText';
import { Props } from './bottomsheet.interface';
import { SkeletonCreditFinish } from './SkeletonCreditFinish';
import { useAppSelector } from '../../../../../application/state-manager';
import { CreditInfoSelector } from '../../../../../application/state-manager/services/checkout';

const WE_HAVE_SENT_TEXT =
  'Hemos enviado a tu celular\n[PHONE] [EMAIL] tu código de compra para que continúes con la transacción.';
const FOOTER_TEXT =
  'Si no has recibido el código de compra o no has actualizado tu correo electrónico, llama al (04) 3731800 o (02) 3950400. También puedes acercarte a las áreas de Servicio al Cliente en nuestras tiendas.';
const VALID_CODE_TEXT = 'Código válido por 5 minutos';
const VALIDATE = 'VALIDAR Y PAGAR';
const RESEND_CODE_TEXT = 'Reenviar código de compra';

export default function BottomSheetCreditFinish({
  onCloseRequest,
  show,
  hook
}: Props) {
  const route = useRoute();
  const { params } = route;
  //@ts-ignore
  const { maskedPhoneNumber, maskedEmail } = params;
  const [disabledResend] = useState(false);
  const creditInfo = useAppSelector(CreditInfoSelector);
  const { getContentCheckout, dataChekout, isLoadingContentService } =
    useContentServiceRequest();

  const formik = useFormik({
    ...FORMIK_SETTINGS,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => doSubmit(values.code)
  });

  const doSubmit = (codeInput: string) => {
    hook.setMsgErrorCodeDePratiCredit('');
    hook.setDirectCreditAuthorize(codeInput);
  };

  const handleResend = () => {
    hook.getDirectCreditToken();
  };

  const handleContentCard = (): string => {
    //console.log('handleContentCard', route)
    let text_show = WE_HAVE_SENT_TEXT;

    text_show = text_show.replace(
      '[PHONE]',
      `${maskedPhoneNumber || creditInfo?.maskedPhoneNumber || ''}`
    );

    text_show = text_show.replace(
      ' [EMAIL]',
      maskedEmail
        ? ` y a tu mail \n${maskedEmail || creditInfo?.maskedEmail || ''}`
        : ''
    );

    return text_show;
  };

  useEffect(() => {
    if (show) {
      getContentCheckout();
    }
  }, [show]);

  const handleClose = () => {
    formik.resetForm();
    hook.setMsgErrorCodeDePratiCredit('');
    hook.setShowBottomSheetDePratiCredit(false);
    onCloseRequest();
  };

  return (
    <BottomSheet
      percentage={100}
      show={show}
      canDrop={false}
      onCloseRequest={handleClose}
      header={
        <View style={styles.close}>
          <IconButton
            testID="close_modal"
            iconName="close"
            onPress={handleClose}
          />
        </View>
      }
      paddingHorizontal={24}>
      <ImageCard style={{ width: 230, height: 236, marginTop: -8 }} />

      <View style={styles.card_container}>
        <Text style={styles.card_title}>{handleContentCard()}</Text>
        <Text style={styles.card_subtitle}>{VALID_CODE_TEXT}</Text>

        <InputBase
          style={styles.input_code}
          value={formik.values.code}
          onChangeText={(text: string) => formik.setFieldValue('code', text)}
          placeholder="Ingresa el código aquí"
          keyboardType="number-pad"
          label=""
          maxLength={10}
          dense
        />
        {formik.errors.code && <ErrorText text={formik.errors.code} />}
        {hook?.msgErrorCodeDePratiCredit?.length > 1 && (
          <ErrorText text={hook.msgErrorCodeDePratiCredit} />
        )}
        <Button
          disabled={
            formik.values.code.length < 5 ||
            hook.isLoadingAuthorize ||
            hook.isLoadingGetToken
          }
          marginTop={16}
          linkName={VALIDATE}
          containerStyle={styles.button}
          showActivityIndicator={
            hook.isLoadingAuthorize || hook.isLoadingGetToken
          }
          activityIndicator={{
            color: FontStyles.LightColor.color
          }}
          onPress={formik.submitForm}
          backgroundColor={FontStyles.PrimaryColor.color}
          textColor={FontStyles.LightColor.color}
        />

        <ButtonText
          disabled={disabledResend}
          onPress={handleResend}
          styleText={{ color: FontStyles.PrimaryColor.color }}
          style={{ marginVertical: 28 }}
          title={RESEND_CODE_TEXT}
        />
      </View>
      {isLoadingContentService ? (
        <SkeletonCreditFinish />
      ) : (
        <Text style={styles.footer_text}>
          {dataChekout?.checkoutOrderConfirmation?.directCredit?.legend ??
            FOOTER_TEXT}
        </Text>
      )}
    </BottomSheet>
  );
}

const FORMIK_SETTINGS = {
  initialValues: {
    code: ''
  }
};

const styles = StyleSheet.create({
  close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  card_container: {
    backgroundColor: COLORS.GRAYDARK20,
    paddingHorizontal: 18,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  card_title: { ...FontStyles.Body_1, textAlign: 'center', marginTop: 16 },
  card_subtitle: {
    ...FontStyles.Body_2,
    marginVertical: 16,
    textAlign: 'center'
  },
  input_code: {
    backgroundColor: COLORS.GRAYDARK20,
    height: 47
  },
  button: { height: 47 },
  footer_text: {
    ...FontStyles.Subtitle_1,
    textAlign: 'center',
    marginTop: 24,
    fontFamily: FONTS_FAMILY.Roboto,
    paddingBottom: 20
  }
});
