import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ButtonCloseModal = ({ closeModal }: { closeModal(): void }) => {
  return (
    <View style={styles.content_close}>
      <TouchableOpacity onPress={closeModal} style={styles.content_close_x}>
        <Icon name="close" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content_close: {
    backgroundColor: COLORS.DEPRATYGRAY,
    width: 30,
    height: 30,
    right: 0,
    position: 'absolute'
  },
  content_close_x: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default ButtonCloseModal;
