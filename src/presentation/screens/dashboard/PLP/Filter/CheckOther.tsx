import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../../application/common';

const CheckOther = ({
  title,
  isCheck,
  onPress
}: {
  title: string;
  isCheck: boolean;
  onPress(): void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.5}
      style={styles.container}>
      <View
        style={[
          styles.containerCheck,
          isCheck ? styles.backgroundCheck : styles.backgroundUnCheck
        ]}>
        <Text
          style={[
            styles.textColor,
            isCheck ? styles.colorCheck : styles.colorUnCheck
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    alignSelf: 'center',
    // backgroundColor:'cyan',
    marginBottom: 10,
    marginRight: 10
  },
  containerCheck: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: COLORS.ICONTRANSPARENT
  },
  textColor: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTS_FAMILY.Roboto
  },
  colorCheck: {
    color: COLORS.WHITE
  },
  colorUnCheck: {
    color: COLORS.ICONTRANSPARENT
  },
  backgroundCheck: {
    backgroundColor: COLORS.GRAYCHECK
  },
  backgroundUnCheck: {
    backgroundColor: COLORS.WHITE
  }
});

export default CheckOther;
