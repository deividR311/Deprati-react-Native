import { createSlice } from '@reduxjs/toolkit';
import { Indications } from './indications.interface';
import { RootState } from '../..';

interface IndicationState {
  indications: Indications;
}

const initialState = {
  indications: {
    notifications: 0,
    cart: 0,
    favorities: 0
  }
} as IndicationState;

export const indicationsSlice = createSlice({
  name: 'indicationsSlice',
  initialState,
  reducers: {
    loadIndications(state, action) {
      state.indications = action.payload;
    },
    loadIndicationsKeys(state, action) {
      state.indications = {
        ...state.indications,
        ...action.payload
      };
    }
  }
});

export const indicationsSelector = (state: RootState) =>
  state.indicationsSlice.indications;

export const { loadIndications, loadIndicationsKeys } =
  indicationsSlice.actions;
