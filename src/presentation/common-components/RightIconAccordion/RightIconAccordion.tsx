import React from 'react';
import { COLORS } from '../../../application/common';
import { List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
export const RightIconAccordion = ({ isExpanded }) => {
  return (
    <List.Icon icon={isExpanded ? 'close' : 'plus'} color={COLORS.DARK70} />
  );
};

export const stylesAccordion = StyleSheet.create({
  container__accordion: {
    backgroundColor: COLORS.WHITE,
    height: 50,
    justifyContent: 'center'
  }
});
