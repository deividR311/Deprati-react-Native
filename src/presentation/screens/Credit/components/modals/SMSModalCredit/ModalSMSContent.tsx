import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputBase from '../../../../../common-components/inputs/InputBase';
import ErrorText from '../../../../../common-components/texts/ErrorText';
import { Styles } from '../../../../../common-components/poppup/poppup.stylesheet';
import {
  ButtonText,
  MainButton
} from '../../../../../common-components/buttons/Button';
import useBondingAccount from '../../../hooks/useBondingAccount';
import { COLORS } from '../../../../../../application/common/colors';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import useUpdateStateVinculation from '../../../hooks/useUpdateStateVinculation';
import useResendSMSCredit from '../../../hooks/useResendSMSCredit';
import { useGenericModal } from '../../../../../common-components/modal/ModalProvider';
import usePreBondingAccount from '../../../hooks/useBondingAccount';

export default function ModalSMSContent(props) {
  const { hideModal, config } = useGenericModal();
  const { isLoadingSMS, isErrorSMS, dataSMS, onValidateSMS, errorSMS } =
    useUpdateStateVinculation();
  const { onResendSMS, isLoading, isError } = useResendSMSCredit();
  const [smsCode, setsmsCode] = useState('');
  const { onPressPreBonding } = usePreBondingAccount();

  useEffect(() => {
    onPressPreBonding();
  }, []);

  useEffect(() => {
    if (!isErrorSMS && dataSMS !== undefined) {
      props?.buttonAction?.();
    }
  }, [isErrorSMS, dataSMS]);

  return (
    <View style={{ width: '100%', marginVertical: 16 }}>
      <InputBase
        mode="outlined"
        onChangeText={text => setsmsCode(text)}
        value={smsCode}
        theme={undefined}
        keyboardType="numeric"
        maxLength={7}
      />

      {isErrorSMS ? (
        <ErrorText text={errorSMS?.data.message.toString()} />
      ) : null}

      <MainButton
        style={{
          ...Styles.button_full,
          marginTop: 20
        }}
        onPress={() => {
          onValidateSMS(smsCode);
        }}
        title={'Continuar'.toUpperCase()}
        disabled={isLoadingSMS}
      />

      <ButtonText
        disabled={isLoading}
        onPress={async () => onResendSMS()}
        styleText={{ color: COLORS.BRAND }}
        title="Volver a enviar el código"
      />
    </View>
  );
}
