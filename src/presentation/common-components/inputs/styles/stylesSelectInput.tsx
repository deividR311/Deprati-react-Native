import { StyleSheet } from 'react-native';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../../application/common';
import { COLORS } from '../../../../application/common/colors';

export const stylesSelectInput = StyleSheet.create({
  searchTextInputStyle: {
    borderWidth: 0,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4
  },
  dropDownPickerStyle: {
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  dropDownPickerContainerStyle: {
    borderColor: '#fff',
    borderTopRightRadius: 4,
    marginTop: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 5.3,

    elevation: 8,
    borderRadius: 4
  },
  baseInput: {
    paddingLeft: 16,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAYDARK60,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  }
});

export const styleSelectGlobal = StyleSheet.create({
  dropdownStyle: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: COLORS.DARK70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 2
  },
  rowStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 0
  },
  rowTextStyle: {
    textAlign: 'left',
    borderWidth: 0,
    paddingLeft: 16,
    fontFamily: FONTS_FAMILY.Roboto
  },
  buttonStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.DARK2ND,
    width: '100%',
    marginTop: 8
  },
  buttonTextStyle: {
    color: COLORS.DARK2ND,
    textAlign: 'left',
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  }
});
