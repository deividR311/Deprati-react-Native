import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { stylesModal } from './stylesModal';

interface Props {
  title: string;
  message: string;
  onPress: () => void;
  textButton: string;
}
export default function CustomModal({
  title,
  message,
  onPress,
  textButton
}: Props) {
  return (
    <Modal animationType="slide" transparent style={{ margin: 0 }}>
      <View style={stylesModal.modal}>
        <View style={stylesModal.containerModal}>
          <Text style={stylesModal.title}>{title}</Text>
          <Text style={stylesModal.message}>{message}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={stylesModal.button}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
