import React, { FC } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { COLORS } from '../../../application/common';
import { IFullLoading } from './IFullLoading';

export const FullLoadingComponent: FC<IFullLoading> = ({
  visible,
  sizeIndicator = 'large',
  colorIndicator = COLORS.BRAND,
  style = {},
  contentStyle = {}
}: IFullLoading) => {
  return (
    <Modal transparent style={[style]} visible={visible}>
      <View style={[styles.content, contentStyle]}>
        <ActivityIndicator size={sizeIndicator} color={colorIndicator} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffffffb3',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
