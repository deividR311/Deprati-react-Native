import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { MainButton } from '../../../common-components/buttons/Button';

import { COLORS } from '../../../../application/common/colors';
import { Divider } from 'react-native-paper';

const ButtonSession: FC<{
  isLogin: boolean;
  onPress(): void;
}> = ({ isLogin: IS_LOGIN, onPress }) => {
  return (
    <>
      <MainButton
        testID="btn_sesion"
        style={IS_LOGIN ? styles.buttonSession : styles.buttonNoSession}
        styleText={IS_LOGIN ? { color: COLORS.DARK } : null}
        title={IS_LOGIN === true ? 'CERRAR SESIÓN' : 'INICIAR SESIÓN'}
        onPress={() => onPress()}
      />
      {!IS_LOGIN && <Divider style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  buttonSession: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    marginTop: 24,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonNoSession: {
    marginTop: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 15
    // backgroundColor: 'red',
  }
});

export default ButtonSession;
