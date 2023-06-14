import React, { useState, forwardRef, useMemo } from 'react';
import { Text, View, TextStyle, LayoutChangeEvent } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { testProps } from '../../../application/utils/accessibleId';
import {
  styleSelectGlobal,
  stylesSelectInput
} from './styles/stylesSelectInput';

export const SelectInput = forwardRef<SelectDropdown, SelectInputProps>(
  (props, ref) => {
    const {
      items,
      onChange,
      label = '',
      error,
      styles,
      value,
      namePropertyDisplay,
      customRow,
      disabled,
      dropDownStyle,
      inputBasic = false,
      valueByIndex,
      testID = '',
      selectRef,
      onBlur,
      useOnlyPlaceHolder = false,
      autoPlaceholderMessage = true,
      showLabel = true,
      onLayout = () => {}
    } = props;
    const [isFocused, setisFocused] = useState(false);
    const handleFocus = () => setisFocused(true);
    const handleBlur = () => {
      setisFocused(false);
      onBlur?.();
    };
    const labelStyle: TextStyle = {
      position: 'absolute',
      left: 10,
      top: !isFocused ? 8 : -7,
      backgroundColor: error ? COLORS.ERRORBACKGROUND : COLORS.WHITE,
      paddingHorizontal: 2,
      fontSize: FONTS_SIZES.legal,
      color: !isFocused
        ? COLORS.GRAYDARK60
        : error
        ? COLORS.MATERIALCOLORERROR
        : COLORS.DARK70,
      zIndex: 10,
      fontFamily: FONTS_FAMILY.Roboto
    };

    const labelValueStyle: TextStyle = {
      position: 'absolute',
      left: 10,
      top: -8,
      backgroundColor: error ? COLORS.ERRORBACKGROUND : COLORS.WHITE,
      paddingHorizontal: 4,
      fontSize: FONTS_SIZES.legal,
      color: COLORS.GRAYDARK60,
      zIndex: 2,
      fontFamily: FONTS_FAMILY.Roboto
    };

    const indexPriceSelect = useMemo(() => {
      if (valueByIndex) {
        return valueByIndex;
      }

      const index = items?.findIndex(item => {
        if (typeof value === 'string') {
          return item?.value?.toLowerCase?.() === value?.toLowerCase?.();
        }
        return undefined;
      });
      return index;
    }, [value, valueByIndex]);

    function getColor(
      hasError: boolean | undefined,
      isEnabled: boolean,
      selectedValue: any = undefined
    ) {
      if (hasError) return COLORS.MATERIALCOLORERROR;

      if (selectedValue && isEnabled) return COLORS.DARK70;
      else return COLORS.GRAYDARK60;
    }

    function getBackgroundColor(hasError: boolean, isDisabled: boolean) {
      if (hasError) return COLORS.ERRORBACKGROUND;

      if (isDisabled) return COLORS.GRAYDARK20;

      return COLORS.WHITE;
    }

    return (
      <View
        style={styles}
        accessible
        {...testProps(testID)}
        onLayout={onLayout}>
        {showLabel && (
          <>
            {!isFocused && value && !useOnlyPlaceHolder && label ? (
              <Text style={[labelValueStyle]}>{label}</Text>
            ) : null}
            {isFocused && !useOnlyPlaceHolder && (
              <Text style={[labelStyle]}>{label}</Text>
            )}
          </>
        )}
        <SelectDropdown
          ref={selectRef}
          disabled={disabled}
          defaultValue={value}
          defaultValueByIndex={!inputBasic ? indexPriceSelect : undefined}
          data={items}
          dropdownOverlayColor="transparent"
          defaultButtonText={
            !isFocused
              ? label
              : autoPlaceholderMessage
              ? 'Selecciona una opción'
              : label
          }
          buttonTextAfterSelection={selectedItem => {
            return namePropertyDisplay
              ? selectedItem[namePropertyDisplay]
              : selectedItem.label;
          }}
          rowTextForSelection={item => {
            return namePropertyDisplay ? item[namePropertyDisplay] : item.label;
          }}
          onSelect={(selectItem, index) => {
            const data = namePropertyDisplay ? selectItem : selectItem.value;
            onChange(data, index);
          }}
          buttonTextStyle={{
            textAlign: 'left',
            color: getColor(error, !disabled, value),
            fontSize: FONTS_SIZES.subtitle1,
            fontFamily: FONTS_FAMILY.Roboto
          }}
          buttonStyle={{
            ...stylesSelectInput.baseInput,
            borderWidth: isFocused ? 2 : 1,
            borderColor: error
              ? COLORS.MATERIALCOLORERROR
              : isFocused
              ? COLORS.DARK70
              : COLORS.GRAYDARK60,
            backgroundColor: getBackgroundColor(error, disabled)
          }}
          dropdownStyle={{
            ...styleSelectGlobal.dropdownStyle,
            ...stylesSelectInput.dropDownPickerStyle,
            ...dropDownStyle
          }}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                // name="keyboard-arrow-up"
                name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={20}
                color={disabled ? COLORS.GRAYDARK60 : COLORS.DARK70}
              />
            );
          }}
          renderCustomizedRowChild={(item, index) =>
            customRow ? (
              <View accessible {...testProps(`item${index}`)}>
                {customRow(item)}
              </View>
            ) : (
              <Text
                accessible
                {...testProps(`item${index}`)}
                style={{
                  borderWidth: 0,
                  borderColor: 'white',
                  paddingLeft: 16,
                  fontFamily: FONTS_FAMILY['Roboto-Regular'],
                  fontSize: FONTS_SIZES.label
                }}>
                {namePropertyDisplay ? item[namePropertyDisplay] : item.label}
              </Text>
            )
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          rowTextStyle={styleSelectGlobal.rowTextStyle}
        />
      </View>
    );
  }
);

interface SelectInputProps {
  autoPlaceholderMessage?: boolean;
  schema?: any;
  items: any[];
  disabled?: boolean;
  useOnlyPlaceHolder?: boolean;
  onChange: (value: any, index: number) => void;
  value: any;
  label: string;
  error?: boolean;
  customRow?: (data: any) => JSX.Element;
  styles?: any;
  dropDownStyle?: any;
  namePropertyDisplay?: string;
  selectRef?: any;
  inputBasic?: boolean;
  valueByIndex?: number;
  testID?: string;
  onBlur?: () => void;
  showLabel?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export default SelectInput;
