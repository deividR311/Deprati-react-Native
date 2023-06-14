import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS_SIZES } from '../../../../../../application/common';
import CheckboxComp from '../../../../../common-components/checkboxs';

export const ComponentOptionsSelect: React.FC<ComponentOptionsSelectProps> = ({
  style = {},
  styleText = {},
  pickUpInStore,
  isGift,
  handleInStore,
  handleIsGift,
  acceptIsPickupStore,
  acceptIsGift
}) => {
  const handleOnPressPickup = () => {
    handleInStore?.(!pickUpInStore);
  };

  const handleOnPressGift = () => {
    handleIsGift?.(!isGift);
  };

  return (
    <View style={[styles.container, style]}>
      <CheckboxComp
        status={pickUpInStore ? 'checked' : 'unchecked'}
        disabled={!acceptIsPickupStore}
        onPress={handleOnPressPickup}
        activityIndicatorStyle={styles.checkBoxLoadingPickup}
        showActivityIndicator={false}
        color={COLORS.BRAND}
        styleContainer={styles.checkboxFirst}
        textStyle={[
          styles.checkbox_textStyle,
          styleText,
          !acceptIsPickupStore ? styles.textDisabled : styles.textEnable
        ]}
        label={'Retiro en tienda'}
      />
      <CheckboxComp
        status={isGift ? 'checked' : 'unchecked'}
        disabled={!acceptIsGift}
        onPress={handleOnPressGift}
        activityIndicatorStyle={styles.checkBoxLoadingGift}
        showActivityIndicator={false}
        color={COLORS.BRAND}
        styleContainer={styles.checkboxSecond}
        textStyle={[
          styles.checkbox_textStyle,
          styleText,
          !acceptIsGift ? styles.textDisabled : styles.textEnable
        ]}
        label={'Es un regalo'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: -10
  },
  checkboxFirst: {},
  checkboxSecond: { marginLeft: 15 },
  checkbox_textStyle: {
    fontSize: FONTS_SIZES.label,
    // color: COLORS.GRAYDARK,
    marginLeft: 10
  },
  textDisabled: {
    color: '#bdbdbd',
    fontWeight: '500'
  },
  textEnable: {
    color: COLORS.DARK,
    fontWeight: 'normal'
  },
  checkBoxLoadingGift: { paddingLeft: 8, paddingRight: 8 },
  checkBoxLoadingPickup: { paddingLeft: 10, paddingRight: 6 }
});

interface ComponentOptionsSelectProps {
  style?: ViewStyle;
  styleText?: TextStyle;
  pickUpInStore?: boolean;
  isGift?: boolean;
  handleInStore?: (pickUpInStore: boolean) => void;
  handleIsGift?: (isGift: boolean) => void;
  acceptIsPickupStore: boolean;
  acceptIsGift: boolean;
}

export default ComponentOptionsSelect;
