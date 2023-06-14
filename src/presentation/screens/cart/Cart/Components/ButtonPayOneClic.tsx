import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import React from 'react';
import IconPayOneClick from '../../../../../../assets/icons/IconPayOneClick';
import { COLORS, FontStyles } from '../../../../../application/common';

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
export default function ButtonPayOneClic({ onPress, style = {} }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.text1}>
        PAGA EN <Text style={styles.text2}>UN SOLO CLIC</Text>
      </Text>
      <IconPayOneClick />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BRAND,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4
  },

  text1: {
    ...FontStyles.Button,
    fontWeight: '500',
    color: COLORS.WHITE,
    marginRight: 12,
    fontSize: 15
  },
  text2: {
    ...FontStyles.Button,
    color: COLORS.WHITE,
    fontSize: 15
  }
});
