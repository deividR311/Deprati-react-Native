import { createSlice } from '@reduxjs/toolkit';

interface CreditState {
  infoCreditUser?: Partial<InitalInfo> | null;
  showRelatedModal: boolean;
  disabledSelectButtonModal: boolean;
  statusMessageCreditUser: number | null;
  messageCreditUser?: string | null;
}
interface InitalInfo {
  posicion: number;
  nombreCliente: string;
  numeroTarjetaAdicionalDisplay: string;
  numeroTarjeta: number;
  adicional: number;
  identificacion: number;
  celularCtaDisplay?: string;
}
const initialState = {
  infoCreditUser: null,
  showRelatedModal: false,
  disabledSelectButtonModal: false,
  messageCreditUser: null,
  statusMessageCreditUser: null
} as CreditState;

export const creditSlice = createSlice({
  name: 'creditSlice',
  initialState,
  reducers: {
    setCreditInfo(state, action) {
      state.infoCreditUser = action.payload;
    },
    setMessageCreditUser(state, action) {
      state.messageCreditUser = action?.payload?.message ?? null;
      state.statusMessageCreditUser = action?.payload?.status ?? null;
    },
    showModalRelatedSuccessAction(state, action) {
      state.showRelatedModal = action.payload;
    },
    setDisabledSelectButtonModal(state, action) {
      state.disabledSelectButtonModal = action.payload;
    },
    clearCreditInfo(state) {
      state.infoCreditUser = undefined;
    }
  }
});

export const creditState = (state: CreditState) =>
  state?.creditSlice?.infoCreditUser;
export const showModalRelatedSuccess = (state: CreditState) =>
  state?.creditSlice?.showRelatedModal;
export const disabledButtonSlector = (state: CreditState) =>
  state?.creditSlice?.showRelatedModal;

export const getMessageCreditUser = (state: CreditState) =>
  state?.creditSlice?.messageCreditUser;
export const getStatusMessageCreditUser = (state: CreditState) =>
  state?.creditSlice?.statusMessageCreditUser;

export const {
  clearCreditInfo,
  setCreditInfo,
  showModalRelatedSuccessAction,
  setDisabledSelectButtonModal,
  setMessageCreditUser
} = creditSlice.actions;
