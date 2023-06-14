import React from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  View,
  ViewStyle,
  NativeModules,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import sleep from '../../../application/utils/sleep';
import { Styles } from './bottomSheet.stylesheet';

interface BottomSheetProps {
  show: boolean;
  percentage?: number;
  canDrop?: boolean;
  maniaStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  scrollViewContainerStyle?: ViewStyle;
  header?: React.ReactNode;
  footerPermanent?: React.ReactNode;
  paddingHorizontal?: number;
  behaviorIOSCustom?: 'height' | 'position' | 'padding';
  behaviorAndroidCustom?: 'height' | 'position' | 'padding';
  keyboardVerticalOffset?: number;
  onCloseRequest?: () => void;
  isCancelable?: boolean;
  fakeMania?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = props => {
  const { StatusBarManager } = NativeModules;
  const {
    children,
    show,
    percentage = 100,
    canDrop = true,
    onCloseRequest,
    maniaStyle,
    contentContainerStyle = {},
    scrollViewStyle = {},
    scrollViewContainerStyle = {},
    header: Header = null,
    footerPermanent: Footer = null,
    paddingHorizontal = 0,
    keyboardVerticalOffset,
    behaviorIOSCustom,
    behaviorAndroidCustom,
    isCancelable = false,
    fakeMania = false
  } = props;

  const getDimentions = React.useCallback((_percentage: number) => {
    return (
      ((Dimensions.get('window').height - (StatusBarManager.HEIGHT ?? 0)) *
        _percentage) /
      100
    );
  }, []);

  const [_showModal, setShowModal] = React.useState(show);
  const heigthValue = React.useRef(new Animated.Value(0)).current;

  const _toggleModal = (state: boolean) => {
    const animationDuration = 300;
    if (state) {
      setShowModal(true);
      Animated.timing(heigthValue, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
        delay: animationDuration
      }).start();
    }

    if (!state) {
      Animated.timing(heigthValue, {
        toValue: getDimentions(percentage),
        duration: animationDuration,
        useNativeDriver: true
      }).start(finished => {
        if (finished) {
          setShowModal(false);
          sleep(200).then(() => {
            if (Platform.OS === 'android') {
              onCloseRequest?.();
            }
          });
        }
      });
    }
  };

  const onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    event.nativeEvent.translationY > 0 &&
      heigthValue.setValue(event.nativeEvent.translationY);
  };

  const onGestureEventEnd = (event: any) => {
    const {
      nativeEvent: { translationY }
    } = event as GestureEvent<PanGestureHandlerEventPayload>;
    translationY > getDimentions(percentage) / 2
      ? _toggleModal(false)
      : _toggleModal(true);
  };

  React.useEffect(() => {
    _toggleModal(show);
  }, [show]);

  return (
    <Modal
      onRequestClose={() => onCloseRequest?.()}
      onDismiss={() => onCloseRequest?.()}
      transparent={true}
      visible={_showModal}
      animationType={'fade'}>
      <View style={Styles.backDrop}>
        <View style={Styles.without}>
          <TouchableWithoutFeedback
            style={Styles.without}
            onPress={() => isCancelable && onCloseRequest?.()}>
            <View style={Styles.without} />
          </TouchableWithoutFeedback>
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={
            Platform.OS === 'ios' ? behaviorIOSCustom : behaviorAndroidCustom
          }>
          <Animated.View
            style={[
              Styles.contentContainer,
              contentContainerStyle,
              {
                height: getDimentions(percentage),
                transform: [{ translateY: heigthValue }]
              }
            ]}>
            {canDrop && (
              <GestureHandlerRootView>
                <PanGestureHandler
                  onGestureEvent={onGestureEvent}
                  onEnded={onGestureEventEnd}>
                  <Animated.View style={Styles.header}>
                    <Animated.View style={[Styles.mania, maniaStyle]} />
                  </Animated.View>
                </PanGestureHandler>
              </GestureHandlerRootView>
            )}
            {fakeMania && (
              <>
                <Animated.View style={Styles.header}>
                  <Animated.View style={[Styles.mania, maniaStyle]} />
                </Animated.View>
              </>
            )}
            {Header}

            <ScrollView
              style={[{ paddingHorizontal }, scrollViewStyle]}
              contentContainerStyle={scrollViewContainerStyle}>
              {children}
            </ScrollView>

            {Footer}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
