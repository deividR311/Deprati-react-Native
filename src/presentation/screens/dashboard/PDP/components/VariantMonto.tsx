import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  COLORS,
  FONTS_SIZES,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../../../application/common';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  IVariant,
  VariantValueCategories
} from '../../../../../infrastucture/apis/product';
import { styleSelectGlobal } from '../../../../common-components/inputs/styles/stylesSelectInput';
import sleep from '../../../../../application/utils/sleep';
import { useReduxPdp } from '../../../../../application/state-manager/services/pdp';
import ErrorText from '../../../../common-components/texts/ErrorText';
import layout from '../../../../../application/common/layout';

interface Props {
  variant: IVariant[];
  variantValueCategories: VariantValueCategories[];
  handleSetProductCode: (productCode: string) => void;
  useSizeSelected: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const VariantMonto = ({
  variant,
  handleSetProductCode,
  variantValueCategories,
  useSizeSelected
}: Props) => {
  const [sizeSelected, setSizeSelected] = useSizeSelected;
  const { isErrorUnselected, onIsErrorUnselected, onCoordY } = useReduxPdp();
  const viewRef = React.useRef<View>(null);

  useEffect(() => {
    if (viewRef?.current) {
      sleep(500).then(() => {
        viewRef?.current?.measure((x, y, width, height, pagex, pagey) => {
          const posY = pagey - height;
          onCoordY(posY > 0 ? posY : layout.window.height / 1.2);
        });
      });
    }
  }, []);

  const prices = useMemo(() => {
    if (variant?.length > 0) {
      return variant?.map(_variant => {
        return {
          ..._variant.variantValueCategory,
          ProductCode: _variant?.variantOption?.code
        };
      });
    }
    return [];
  }, [variant]);

  const indexPriceSelect = useMemo(() => {
    if (variantValueCategories?.length > 0 && sizeSelected) {
      const [priceValue] = variantValueCategories;
      const PriceSelect = prices?.findIndex(
        price => price?.code === priceValue?.code
      );
      return PriceSelect;
    }
    return -1;
  }, [prices, variantValueCategories]);

  const sizeStyle = useMemo(() => {
    if (isErrorUnselected)
      return {
        title: styles.titleError,
        button: styles.buttonError,
        text: styles.textError
      };
    return {
      title: styles.title,
      button: styles.button,
      text: styles.text
    };
  }, [isErrorUnselected]);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text style={[styles.container_title, sizeStyle.title]}>Valor</Text>
      <SelectDropdown
        data={prices}
        onSelect={(selectedItem, index) => {
          if (selectedItem?.ProductCode) {
            setSizeSelected(true);
            handleSetProductCode(selectedItem.ProductCode, true);
            onIsErrorUnselected(false);
          }
        }}
        defaultValueByIndex={indexPriceSelect}
        defaultButtonText={'Selecciona un valor'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={20}
              color={COLORS.DARK70}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownOverlayColor={'transparent'}
        dropdownStyle={styleSelectGlobal.dropdownStyle}
        rowStyle={styleSelectGlobal.rowStyle}
        rowTextStyle={styleSelectGlobal.rowTextStyle}
        buttonStyle={{
          ...styleSelectGlobal.buttonStyle,
          ...sizeStyle.button
        }}
        buttonTextStyle={{
          ...styleSelectGlobal.buttonTextStyle,
          ...sizeStyle.text
        }}
      />
      {isErrorUnselected && (
        <View>
          <ErrorText
            textStyle={styles.container_error_text}
            text="* Este campo es requerido para continuar"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MARING_HORIZONTAL
  },
  container_title: {
    ...FontStyles.Body_1,
    textAlign: 'left'
  },
  container_error_text: {
    fontSize: FONTS_SIZES.label
  },

  buttonError: {
    backgroundColor: COLORS.ERRORBACKGROUND2,
    borderColor: COLORS.BRAND
  },
  button: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.DARK2ND
  },

  titleError: { color: COLORS.BRAND },
  title: { color: COLORS.DARK },

  textError: { color: COLORS.BRAND },
  text: { color: COLORS.DARK2ND }
});
