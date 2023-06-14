import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

interface ILegend {
  text: string;
  subtitle?: string;
}

export const FormLegend = ({ text, subtitle }: ILegend) => {
  return (
    <View style={styles.legend_content}>
      <Text style={[FontStyles.Regular, styles.legend_title]}>{text}</Text>
      {subtitle && (
        <Text style={[FontStyles.Regular, styles.legend_subtitle]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  legend_content: { marginTop: 16 },
  legend_title: { color: COLORS.DARK70 },
  legend_subtitle: {
    color: COLORS.DARK70,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700')
  }
});
