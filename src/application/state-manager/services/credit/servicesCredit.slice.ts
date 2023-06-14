import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface ICreditServicesProps {
  titleScreen: string;
}

const initialState = {
  titleScreen: ''
} as ICreditServicesProps;

export const servicesCreditSlice = createSlice({
  name: 'servicesCreditSlice',
  initialState,
  reducers: {
    setTitleService(state, action: PayloadAction<string>) {
      state.titleScreen = action.payload;
    }
  }
});

export const servicesCreditSelector = (state: RootState) =>
  state.servicesCreditSlice;

export const { setTitleService } = servicesCreditSlice.actions;
