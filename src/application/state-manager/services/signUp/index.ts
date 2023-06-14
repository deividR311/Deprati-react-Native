import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface CounterState {
  enabledNextArrow: boolean;
  values: any;
  creditSelected: number;
  indexPage: number;
}

const initialState = {
  enabledNextArrow: false,
  values: {},
  creditSelected: -1,
  indexPage: 0
} as CounterState;

export const signUpSlice = createSlice({
  name: 'signupValuesAndNav',
  initialState,
  reducers: {
    enabledButton(state, action) {
      state.enabledNextArrow = action.payload;
    },
    setValuesSignUp(state, action) {
      state.values = action.payload;
    },
    setIndexPaage(state, action) {
      state.indexPage = action.payload;
    },
    setCreditOption(state, action) {
      state.creditSelected = action.payload;
    }
  }
});

export const signUpState = (state: RootState) => state.signupValuesAndNav;

export const {
  enabledButton,
  setValuesSignUp,
  setCreditOption,
  setIndexPaage
} = signUpSlice.actions;
