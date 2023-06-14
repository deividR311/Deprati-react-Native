import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { ModalsType } from '../../../../presentation/common-components/modal/modal.interfaces';
import { PopupProps } from '../../../../presentation/common-components/poppup';

interface InitialProps {
  currentModal: ModalsType;
  config?: Partial<PopupProps>;
  closeModalCurrent: boolean;
}

const initialState: InitialProps = {
  currentModal: ModalsType.initial,
  config: {},
  closeModalCurrent: false
};
export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ id: ModalsType }>) {
      state.currentModal = action.payload.id;
    },
    setConfigAction(
      state,
      action: PayloadAction<{ config?: Partial<PopupProps> }>
    ) {
      state.config = action.payload?.config as any;
    },
    closeModal(state) {
      state.currentModal = ModalsType.NoModal;
    },
    closeModalCurrent(state, action) {
      state.closeModalCurrent = action.payload.status;
    }
  }
});

export const modalInfoSelector = (state: RootState) => state.modalSlice;
export const { openModal, closeModal, setConfigAction, closeModalCurrent } =
  modalSlice.actions;

interface ModalState {
  currentModal: ModalsType;
}
