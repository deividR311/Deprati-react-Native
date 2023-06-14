import React, { FC } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  modalInfoSelector,
  openModal,
  setConfigAction,
  closeModalCurrent
} from '../../../application/state-manager/services/credit/modal.slice';
import { Popup, PopupProps } from '../poppup';
import {
  GenericModalHook,
  Modal,
  ModalProviderProps,
  ModalsType
} from './modal.interfaces';

export const ModalProvider: FC<ModalProviderProps> = ({ children, modals }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <BuilderModals modals={modals} />
    </View>
  );
};

const BuilderModals: FC<{
  modals: Modal[];
  buttonAction?: (modalId: string) => void;
}> = props => {
  const { currentModal, config, hideModal, onCloseRequestModal } =
    useGenericModal();

  return (
    <>
      {props.modals.map((modal, index) => {
        if (modal.id === currentModal && config !== undefined) {
          modal.config = { ...modal.config, ...config };
        }
        return (
          <Popup
            key={modal.id}
            {...modal.config}
            closeAction={modal.config?.closeAction || hideModal}
            onCloseRequest={() => {
              if (currentModal === ModalsType.initial) return;
              modal?.config?.onCloseRequest?.();
              onCloseRequestModal();
            }}
            onDismiss={() => {
              if (currentModal === ModalsType.initial) return;
              modal?.config?.onDismiss?.();
            }}
            visible={currentModal === modal.id}
          />
        );
      })}
    </>
  );
};

export const useGenericModal = (): GenericModalHook => {
  const dispatch = useDispatch();
  const { currentModal, config } = useSelector(modalInfoSelector);

  const hideModal = () => {
    dispatch(closeModal());
  };

  const onCloseRequestModal = () => {
    dispatch(closeModalCurrent({ status: true }));
  };

  const showModal = (modalID: ModalsType, _config?: PopupProps) => {
    if (_config !== undefined) {
      dispatch(setConfigAction({ config: _config }));
    } else {
      dispatch(setConfigAction({ config: {} }));
    }

    currentModal !== ModalsType.NoModal &&
      currentModal !== ModalsType.initial &&
      hideModal();

    setTimeout(() => {
      dispatch(openModal({ id: modalID }));
      dispatch(closeModalCurrent({ status: false }));
    }, 200);
  };

  return {
    showModal,
    hideModal,
    currentModal,
    config,
    onCloseRequestModal
  };
};

export default ModalProvider;
