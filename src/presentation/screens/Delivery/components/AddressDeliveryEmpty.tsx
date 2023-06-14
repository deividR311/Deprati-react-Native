import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import layout from '../../../../application/common/layout';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common';
import { handleChangeColorBold } from '../../../../application/utils/functionsChangeColor';
import Button from '../../../common-components/buttons/Button';

const sizeCart = layout.window.width * 0.48;
const textContent = 'Actualmente no cuentas con dirección de envío guardada.';
const textBold = ' Para continuar es necesario que agregues una dirección.';

export const AddressDeliveryEmpty = ({
  onPress = () => {},
  contentContainerStyle = {}
}) => {
  return (
    <View style={[styles.contentContainer, contentContainerStyle]}>
      <View style={styles.contentCart}>
        <Icon name="map-marker" size={170} color={COLORS.BRAND} />
      </View>
      <Text style={styles.textEmpty}>
        {textContent}
        {handleChangeColorBold(textBold, COLORS.DARK)}
      </Text>
      <Button
        marginTop={12}
        containerStyle={{ marginHorizontal: 16, width: '85%' }}
        backgroundColor={COLORS.BRAND}
        linkName={'Agregar dirección de envío'.toLocaleUpperCase()}
        textColor={COLORS.WHITE}
        onPress={() => onPress(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentCart: {
    alignSelf: 'center',
    backgroundColor: COLORS.BACKGROUNDICON,
    width: sizeCart,
    height: sizeCart,
    borderRadius: sizeCart / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textEmpty: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FONTS_SIZES.label,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    paddingHorizontal: 5,
    width: '80%'
  }
});
