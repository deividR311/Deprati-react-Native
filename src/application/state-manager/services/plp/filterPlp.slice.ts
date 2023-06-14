import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {
  Breadcrumb,
  Facet
} from '../../../../presentation/screens/dashboard/PLP/interfaces/iProducts';
import { FilterState } from './IFilterPlp.slice.interface';

export const initialState = {
  valueFacet: [] as Facet[],
  totalResults: 0,
  valueInitial: {
    value: {}
  },
  breadcrumbs: [] as Breadcrumb[],
  isCategoryGiftCard: false,
  initialHistory: {
    value: {}
  }
} as FilterState;
export const filterPlpSlice = createSlice({
  name: 'filterPlpSlice',
  initialState,
  reducers: {
    setFacetPlp(state, action) {
      state.valueFacet = action.payload.valueFacet;
      state.totalResults = action.payload.totalResults;
    },
    setFacetInitalPlp(state, action) {
      state.valueInitial.value = action.payload.valueInitial;
      state.valueInitial.title = action.payload.title;
    },
    setBreadcrumbs(state, action) {
      state.breadcrumbs = action.payload;
    },
    hasCategoryGiftCard(state, action) {
      state.isCategoryGiftCard = action.payload.isCategoryGiftCard;
    },
    setInitialHistory(state, action) {
      state.initialHistory.value = action.payload.valueInitial;
    }
  }
});

export const filterPlpSelector = (state: RootState) => state.filterPlpSlice;

export const {
  setFacetPlp,
  setFacetInitalPlp,
  setBreadcrumbs,
  hasCategoryGiftCard,
  setInitialHistory
} = filterPlpSlice.actions;
