import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {
  BottomSheetType,
  ShowBottomSheetAction,
  INITIAL_STATE
} from './interface';

export const ContactlessPaymentSlice = createSlice({
  name: 'contactlessPaymentSlice',
  initialState: INITIAL_STATE,
  reducers: {
    showBottomSheet(state, action: PayloadAction<ShowBottomSheetAction>) {
      switch (action.payload.bottomSheet) {
        case BottomSheetType.IDENTITY_VALIDATION:
          state.bottomSheetState.identityValidationIsOpen = action.payload.show;
          break;
        case BottomSheetType.SUCCESS_BUY:
          state.bottomSheetState.successBuyIsOpen = action.payload.show;
          state.bottomSheetState.successBuyText = action.payload.text ?? '';
          state.bottomSheetState.successBuyTicketId =
            action.payload.ticketId ?? '';
          break;
      }
    }
  }
});

export const identityValidationStateSelector = (state: RootState) =>
  state.contactlessPaymentSlice.bottomSheetState.identityValidationIsOpen;

export const successBuyStateSelector = (state: RootState) =>
  state.contactlessPaymentSlice.bottomSheetState.successBuyIsOpen;

export const successBuyTextStateSelector = (state: RootState) =>
  state.contactlessPaymentSlice.bottomSheetState.successBuyText;

export const successBuyTicketIdStateSelector = (state: RootState) =>
  state.contactlessPaymentSlice.bottomSheetState.successBuyTicketId;

export const { showBottomSheet } = ContactlessPaymentSlice.actions;
export default ContactlessPaymentSlice.reducer;
