import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';

export const SupportHeaderCell: React.FC<SupportHeaderCellProps> = props => {
  return (
    <View style={style.container}>
      <Text style={[FontStyles.Overline, FontStyles.Bold, style.text]}>
        {props.title}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: COLORS.GRAYBRAND50
  },
  text: {
    color: COLORS.DARK
  }
});

interface SupportHeaderCellProps {
  title: string;
}
