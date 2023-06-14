import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../application/common/colors';
import useBondingAccount from '../../screens/Credit/hooks/useBondingAccount';
import { stylesSignIn } from '../../screens/SignIn/stylesSignIn';
import { ButtonText, MainButton } from '../buttons/Button';
import InputBase from '../inputs/InputBase';
import ErrorText from '../texts/ErrorText';
import { stylesModal } from './stylesModal';

interface IPROPS {
  title: string;
  message: string;
  onPressResend: () => void;
  stateResend: boolean;
  error: string;
}
export default function ModalSMS({
  title,
  message,
  onPressResend,
  stateResend,
  error
}: IPROPS) {
  const [smsCode, setsmsCode] = useState('');
  const navigation = useNavigation();
  const { verifySMSSend, states } = useBondingAccount();
  return (
    <Modal animationType="slide" transparent style={{ margin: 0 }}>
      <View style={stylesModal.modal}>
        <View style={{ ...stylesModal.containerModal, paddingTop: 0 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={stylesModal.closeButton}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
          <Text style={stylesModal.title}>{title}</Text>
          <Text style={stylesModal.message}>{message}</Text>

          <View>
            <InputBase
              mode="outlined"
              onChangeText={text => setsmsCode(text)}
              value={smsCode}
              theme={undefined}
              keyboardType="numeric"
              maxLength={7}
            />

            {states.errorVerifySms !== '' ? (
              <ErrorText text={states.errorVerifySms} />
            ) : null}
          </View>
          <MainButton
            testID="createAccount"
            title="Continuar"
            disabled={smsCode === '' || states.isLoadingSMS}
            style={stylesSignIn.mainButton}
            onPress={async () => await verifySMSSend(smsCode)}
          />
          <ButtonText
            disabled={stateResend}
            onPress={() => onPressResend()}
            styleText={{ color: COLORS.BRAND }}
            title="Volver a enviar el código"
          />
        </View>
      </View>
    </Modal>
  );
}
