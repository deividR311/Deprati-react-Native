import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CropSquareSvg from '../../../../../../../assets/icons/Plp/CropSquareSvg';
import GridSvg from '../../../../../../../assets/icons/Plp/GridSvg';
import ListBulletSvg from '../../../../../../../assets/icons/Plp/ListBulletSvg';
import { COLORS } from '../../../../../../application/common/colors';
import { OPTION_SELECTED, OPTION_COLOR } from '../utils/optionsPlp';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './stylesButtonsViewPlp';
import { SortBy } from '../../interfaces/iProducts';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../../application/common/fonts';
export default function ButtonsViewPlp({
  onChange,
  sorts,
  OnCurrentSort,
  viewSelect,
  sortByCurrent
}: {
  onChange(data: string): void;
  sorts: SortBy[];
  OnCurrentSort(data: string): void;
  viewSelect?: string;
  sortByCurrent?: string;
}) {
  const [select, setSelect] = useState<string>(
    viewSelect ?? OPTION_SELECTED.GRID
  );

  useEffect(() => {
    onChange(select);
  }, [select]);

  const textTitle = useMemo(
    () => sorts.find(x => x.code === sortByCurrent),
    [sortByCurrent]
  );

  const isActive = (value: string) => {
    if (select === value) {
      return OPTION_COLOR.ACTIVE;
    }
    return OPTION_COLOR.INACTIVE;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentDropDown}>
        <SelectDropdown
          data={sorts}
          onSelect={(selectedItem, index) => {
            console.log('selectedItem', selectedItem, index);
            OnCurrentSort(selectedItem.code);
            // citiesDropdownRef.current.reset()
          }}
          defaultButtonText={textTitle?.title ?? 'Ordenar por'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles2.dropdown1BtnStyle}
          buttonTextStyle={styles2.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={20}
                color={COLORS.DARK70}
              />
            );
          }}
          dropdownOverlayColor={'transparent'}
          dropdownIconPosition={'right'}
          dropdownStyle={styles2.dropdown1DropdownStyle}
          rowStyle={styles2.dropdown1RowStyle}
          rowTextStyle={styles2.listTxtStyle}
        />
      </View>
      <View style={styles.contentButtons}>
        <IconButton
          icon={() => <GridSvg fill={isActive(OPTION_SELECTED.GRID)} />}
          color={'red'}
          size={20}
          onPress={() => setSelect(OPTION_SELECTED.GRID)}
        />
        <IconButton
          icon={() => <CropSquareSvg fill={isActive(OPTION_SELECTED.SQUARE)} />}
          color={'red'}
          size={20}
          onPress={() => setSelect(OPTION_SELECTED.SQUARE)}
        />
        <IconButton
          icon={() => <ListBulletSvg fill={isActive(OPTION_SELECTED.LIST)} />}
          color={'red'}
          size={20}
          onPress={() => setSelect(OPTION_SELECTED.LIST)}
        />
        {/* <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelect(OPTION_SELECTED.GRID)}>
              <GridSvg fill={isActive(OPTION_SELECTED.GRID)} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelect(OPTION_SELECTED.SQUARE)}>
              <CropSquareSvg fill={isActive(OPTION_SELECTED.SQUARE)} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelect(OPTION_SELECTED.LIST)}>
              <ListBulletSvg fill={isActive(OPTION_SELECTED.LIST)} />
            </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles2 = StyleSheet.create({
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.DARK2ND
    // width: 500
  },
  dropdown1BtnTxtStyle: {
    color: COLORS.DARK2ND,
    textAlign: 'left',
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },
  dropdown1DropdownStyle: {
    backgroundColor: 'white',
    width: 250,
    elevation: 7
  },
  dropdown1RowStyle: {
    backgroundColor: 'white',
    // borderColor: 'white',
    borderBottomColor: 'white'
  },
  listTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY.Roboto
  }
});
