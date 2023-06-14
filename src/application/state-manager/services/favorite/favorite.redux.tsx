import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { Product } from '../../../../presentation/screens/dashboard/PLP/interfaces/iProducts';

interface IFavorite {
  totalFavorite: number;
  allCodeFavorite: string[];
}

const initialState = {
  totalFavorite: 0,
  allCodeFavorite: []
} as IFavorite;

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState,
  reducers: {
    setTotalFavorite(state, action: PayloadAction<number>) {
      state.totalFavorite = action.payload;
    },
    setAllCodeFavorite(state, action: PayloadAction<string[]>) {
      state.allCodeFavorite = action.payload;
    }
  }
});

export const favoriteSelector = (state: RootState) => state.favoriteSlice;
export const { setTotalFavorite, setAllCodeFavorite } = favoriteSlice.actions;
