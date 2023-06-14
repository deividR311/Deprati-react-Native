import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../application/common/colors';
import { FONTS_FAMILY } from '../../../../../application/common/fonts';
interface IProps {
  status: string;
}
export default function StatusBradge({ status }: IProps) {
  return (
    <View
      style={{
        ...styles.status_contentTitle,
        backgroundColor: status === 'CERRADO' ? COLORS.BRAND : COLORS.GREENOK
      }}>
      <Text style={styles.status_store}>{status}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  status_contentTitle: {
    padding: 2,

    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  status_store: {
    fontSize: 10,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    color: COLORS.WHITE
  }
});
