import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { stylesModal } from './stylesModal';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../../application/common/colors';

export default function ModalLoading({ visible = true }) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      style={{ margin: 0, backgroundColor: '#7a716e' }}>
      <View style={[styles.overlay, { height: '100%' }]} />
      <View style={stylesModal.modal}>
        <ActivityIndicator size="large" color={COLORS.BRAND} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'white',
    width: '100%'
  }
});
