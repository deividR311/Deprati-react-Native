import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface IUnselected {
  isErrorUnselected: boolean;
  coordY: number;
}
const initialState = {
  coordY: 0,
  isErrorUnselected: false
} as IUnselected;

export const pdpSlice = createSlice({
  name: 'pdpSlice',
  initialState,
  reducers: {
    setIsErrorUnselected(state, action: PayloadAction<boolean>) {
      state.isErrorUnselected = action.payload;
    },
    setCoordY(state, action: PayloadAction<number>) {
      state.coordY = action.payload;
    }
  }
});

export const pdpSelector = (state: RootState) => state.pdpSlice;

export const { setIsErrorUnselected, setCoordY } = pdpSlice.actions;
