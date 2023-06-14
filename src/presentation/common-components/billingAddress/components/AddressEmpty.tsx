import React, { Children, useMemo } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../../application/common';
import { handleChangeColorBold } from '../../../../application/utils/functionsChangeColor';
import Button from '../../buttons/Button';
import { AddressEmptyProps, stylesAddressEmpty as styles } from '.';

const textContent =
  'Actualmente no cuentas con dirección de facturación guardada.';
const textBold = ' Para continuar es necesario que agregues una dirección.';

export const AddressEmpty = ({
  onPress,
  style = {},
  children,
  styleSecundaryButton
}: AddressEmptyProps) => {
  return (
    <View style={style}>
      <View style={styles.contentCart}>
        <Icon name="map-marker" size={80} color={COLORS.BRAND} />
      </View>
      <Text style={styles.textEmpty}>
        {textContent}
        {handleChangeColorBold(textBold, COLORS.DARK)}
      </Text>
      <Button
        testID="add_address"
        marginTop={12}
        containerStyle={[
          {
            marginHorizontal: 16,
            paddingHorizontal: 8,
            marginBottom: 24,
            borderColor: COLORS.DARK70,
            borderWidth: styleSecundaryButton ? 1 : 0
          }
        ]}
        backgroundColor={styleSecundaryButton ? COLORS.WHITE : COLORS.BRAND}
        linkName="AGREGAR DIRECCIÓN DE FACTURACIÓN"
        textColor={styleSecundaryButton ? COLORS.DARK70 : COLORS.WHITE}
        onPress={() => onPress(false)}
      />
      {children}
    </View>
  );
};
