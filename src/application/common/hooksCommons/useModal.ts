import { DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ModalParams {
  params?: any;
  actionClose?: (param?: any) => void;
}

const EMIT_MODAL = 'emitModal';

export const useModal = () => {
  const navigation = useNavigation();

  const showModal = (
    screen: string,
    { params, actionClose }: ModalParams = {}
  ) => {
    navigation.navigate(screen, params);
    if (actionClose) {
      const event = DeviceEventEmitter.addListener(EMIT_MODAL, data => {
        actionClose(data);
        event.remove();
      });
    }
  };

  const closeModal = <T>(param?: T) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      if (param) {
        DeviceEventEmitter.emit(EMIT_MODAL, param);
      }
    }
  };
  return { showModal, closeModal };
};
