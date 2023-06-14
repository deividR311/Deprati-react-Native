import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface LoadingPlpState {
  reloading: boolean;
}
const initialState = {
  reloading: false
} as LoadingPlpState;

export const loadingPlpSlice = createSlice({
  name: 'loadingPlpSlice',
  initialState,
  reducers: {
    setReloadingPlp(state, action: PayloadAction<boolean>) {
      state.reloading = action.payload;
    }
  }
});

export const loadingPlpSelector = (state: RootState) => state.loadingPlpSlice;

export const { setReloadingPlp } = loadingPlpSlice.actions;
