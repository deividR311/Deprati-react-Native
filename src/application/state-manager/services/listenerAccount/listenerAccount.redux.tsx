import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface IListenerAccount {
  isComesFromPaying: boolean;
}

const initialState = {
  isComesFromPaying: false
} as IListenerAccount;

export const listenerAccountSlice = createSlice({
  name: 'listenerAccountSlice',
  initialState,
  reducers: {
    setIsComesFromPaying(state, action: PayloadAction<boolean>) {
      state.isComesFromPaying = action.payload;
    }
  }
});

export const listenerAccountSelector = (state: RootState) =>
  state.listenerAccountSlice;
export const { setIsComesFromPaying } = listenerAccountSlice.actions;
