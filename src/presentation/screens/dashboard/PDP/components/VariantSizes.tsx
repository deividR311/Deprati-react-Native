import React, { Dispatch, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import {
  COLORS,
  MARING_HORIZONTAL,
  FONTS_SIZES,
  FontStyles
} from '../../../../../application/common';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { VariantValueCategories } from '../../../../../infrastucture/apis/product';
import { SetStateAction } from 'react';
import { testProps } from '../../../../../application/utils/accessibleId';
import { BaseOptions } from '../../../../../infrastucture/apis/product';
import { styleSelectGlobal } from '../../../../common-components/inputs/styles/stylesSelectInput';
import ErrorText from '../../../../common-components/texts/ErrorText';
import { useReduxPdp } from '../../../../../application/state-manager/services/pdp';
import sleep from '../../../../../application/utils/sleep';

interface Props {
  variantSizes: any[];
  variantValueCategories: VariantValueCategories[];
  styleButtonDropdown?: ViewStyle;
  handleSetProductCode: (productCode: string) => void;
  useSizeSelected: [boolean, Dispatch<SetStateAction<boolean>>];
  baseOptions: BaseOptions[];
}

export const VariantSizes = ({
  variantSizes,
  styleButtonDropdown,
  variantValueCategories,
  handleSetProductCode,
  useSizeSelected,
  baseOptions
}: Props) => {
  const selectRef = React.useRef<SelectDropdown>(null);
  const viewSizeRef = React.useRef<View>(null);
  const [sizeSelected, setSizeSelected] = useSizeSelected;
  const options = baseOptions[0]?.options ?? [];
  const { isErrorUnselected, onIsErrorUnselected, onCoordY } = useReduxPdp();

  useEffect(() => {
    if (viewSizeRef?.current) {
      sleep(400).then(() => {
        viewSizeRef?.current?.measure((x, y, width, height, pagex, pagey) => {
          console.log(x, y, width, height, pagex, pagey);
          onCoordY(pagey - height);
        });
      });
    }
  }, []);

  const sizes = useMemo(() => {
    if (variantSizes?.length > 0) {
      return variantSizes
        ?.map(variant => {
          return {
            ...variant.variantValueCategory,
            ProductCode: variant?.variantOption?.code
          };
        })
        .filter(({ ProductCode }) => {
          const stockProduct = options.find(x => x.code === ProductCode);
          //console.log('baseProduct', ProductCode, stockProduct)
          return stockProduct?.stock.stockLevel > 0 ?? false;
        });
    }
    return [];
  }, [variantSizes]);

  const indexSizeSelect = useMemo(() => {
    if (variantValueCategories?.length > 0 && sizeSelected) {
      const codesvalus = variantValueCategories?.map(elemt => elemt?.code);
      const indexSelect = sizes?.findIndex(item =>
        codesvalus?.includes(item.code)
      );
      return indexSelect;
    }
    return -1;
  }, [sizes, variantValueCategories]);

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
    <View
      ref={viewSizeRef}
      style={styles.container}
      accessible
      {...testProps('pdp_talla')}>
      <Text style={[styles.container_title, sizeStyle.title]}>Talla</Text>
      <SelectDropdown
        ref={selectRef}
        data={sizes}
        onSelect={(selectedItem, index) => {
          setSizeSelected(true);
          handleSetProductCode(selectedItem?.ProductCode, true);
          onIsErrorUnselected(false);
        }}
        defaultValueByIndex={indexSizeSelect}
        defaultButtonText={'Selecciona una talla'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              // name="keyboard-arrow-up"
              name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={20}
              color={COLORS.DARK70}
            />
          );
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <Text
              accessible
              {...testProps(`item${index}`)}
              numberOfLines={1}
              allowFontScaling={false}
              style={styleSelectGlobal.rowTextStyle}>
              {item.name}
            </Text>
          );
        }}
        dropdownIconPosition={'right'}
        dropdownOverlayColor={'transparent'}
        dropdownStyle={styleSelectGlobal.dropdownStyle}
        rowStyle={styleSelectGlobal.rowStyle}
        rowTextStyle={styleSelectGlobal.rowTextStyle}
        buttonStyle={{
          ...(styleButtonDropdown ?? styleSelectGlobal.buttonStyle),
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
