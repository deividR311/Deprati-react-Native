import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { CreditBalanceModel } from '../../../../infrastucture/apis/credit-balance';

interface ICreditBalance {
  infoCreditBalance: Partial<CreditBalanceModel & { clientFirstName: string }>;
}
export interface ICreditBalancePayload extends Partial<CreditBalanceModel> {
  numeroTarjetaAdicionalDisplay?: string;
  clientFirstName?: string;
  celularCtaDisplay?: string;
}

const initialState = {
  infoCreditBalance: {}
} as ICreditBalance;

export const creditBalanceSlice = createSlice({
  name: 'creditBalanceSlice',
  initialState,
  reducers: {
    setInfoCreditBalance(state, action: PayloadAction<ICreditBalancePayload>) {
      state.infoCreditBalance = action.payload;
    }
  }
});

export const creditBalanceSelector = (state: RootState) =>
  state.creditBalanceSlice;
export const { setInfoCreditBalance } = creditBalanceSlice.actions;
