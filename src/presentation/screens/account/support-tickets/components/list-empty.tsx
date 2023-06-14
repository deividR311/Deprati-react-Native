import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyIcon } from '../../../../../../assets/icons/EmptyIcon';
import { FontStyles } from '../../../../../application/common';

export const EmptyList: React.FC<{ text: string }> = ({ text = '' }) => {
  return (
    <View style={styles.container}>
      <EmptyIcon />
      <Text style={[FontStyles.H3_Headline, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  text: {
    marginVertical: 32
  }
});
