import React, { useRef, useCallback, useEffect } from 'react';
import {
  Animated,
  Modal,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions
} from 'react-native';
import layout from '../../../application/common/layout';
import { MainButton } from '../buttons/Button';
import { styles } from './ModalCard.styles';

interface ModalProductProps {
  show: boolean;
  text: string;
  textButton: string;
  style?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  styleContentText?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleContentButton?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
  onConfirm: () => void;
  onCloseRequest: () => void;
}

export default function ModalCard({
  show,
  text,
  textButton,
  onCloseRequest,
  onConfirm,
  style = {},
  styleContent = {},
  styleContentText = {},
  styleText = {},
  styleContentButton = {},
  styleButton = {}
}: ModalProductProps) {
  const translationXAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    _toggleModal(false);
  }, []);

  useEffect(() => {
    if (show) _toggleModal(show);
  }, [show]);

  // Math.trunc(layout.window.height)
  const _toggleModal = (state: boolean) => {
    const animationDuration = 400;
    if (state) {
      Animated.timing(translationXAnimated, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
        delay: animationDuration
      }).start(() => handleHide());
    }

    if (!state) {
      Animated.timing(translationXAnimated, {
        toValue: layout.window.width,
        duration: animationDuration,
        useNativeDriver: true
      }).start(() => _onCloseRequest());
    }
  };
  const handleHide = () => {
    setTimeout(() => {
      _toggleModal(false);
    }, 2000);
  };

  const _onCloseRequest = useCallback(() => {
    onCloseRequest?.();
  }, []);

  return (
    <Modal
      onRequestClose={_onCloseRequest}
      transparent={true}
      visible={show}
      animationType={'fade'}>
      <Animated.View
        style={[
          styles.container,
          style,
          {
            transform: [
              {
                translateX: translationXAnimated
                // translateY: 100,
              }
            ]
          }
        ]}>
        <View style={[styles.content, styleContent]}>
          <View style={[styles.content__text, styleContentText]}>
            <Text style={[styles.text, styleText]}>{text}</Text>
          </View>
          <View style={[styles.content__button, styleContentButton]}>
            <MainButton
              title={textButton}
              style={[styles.button, styleButton]}
              onPress={() => onConfirm()}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
