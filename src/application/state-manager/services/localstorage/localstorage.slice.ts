import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkInfo } from 'react-native-network-info';
import { RootState } from '../..';
import {
  InitialLocalStorage,
  LocalStorageKey,
  LocalStorageParams,
  LocalStorageType
} from './interface';

export const readAndStorageInState = createAsyncThunk(
  'readAndStorageInState',
  async () => {
    const IpAddress = (await NetworkInfo.getIPV4Address()) ?? '0.0.0.0';
    return new Promise<LocalStorageType>(resolve => {
      const keys = Object.keys(InitialLocalStorage);
      AsyncStorage.multiGet(keys, (errors, _keysAndValues) => {
        errors && console.error('>>> ERROR LOCAL_STORAGE READ: ', errors);

        if (_keysAndValues === undefined || _keysAndValues === null) {
          resolve({
            ...InitialLocalStorage,
            [LocalStorageKey.WasStoreRead]: true,
            [LocalStorageKey.IpAddress]:
              IpAddress ?? InitialLocalStorage.IP_ADDRESS
          });
          return;
        }

        const state = _keysAndValues.reduce((_state, [key, value]) => {
          try {
            if (value === null || value === undefined) return _state;
            return {
              ..._state,
              [key]: value ? JSON.parse(value) : value
            };
          } catch (error) {
            console.log('>>> [reduce][localstorage.slice.ts]', value, _state);
          }
          return { ..._state };
        }, InitialLocalStorage);

        resolve({
          ...state,
          [LocalStorageKey.WasStoreRead]: true,
          [LocalStorageKey.IpAddress]:
            IpAddress ?? state[LocalStorageKey.IpAddress]
        });
      });
    });
  }
);

export const save = createAsyncThunk(
  'save',
  async (params: LocalStorageParams, thunkApi) =>
    new Promise<Partial<LocalStorageType>>(resolve => {
      const _data = Object.keys(params).map<[string, string]>(key => [
        key,
        JSON.stringify(params[key as keyof LocalStorageParams])
      ]);
      AsyncStorage.multiSet(_data, errors => {
        errors &&
          errors.length > 0 &&
          console.log('>>> ERROR LOCAL_STORAGE SAVE: ', errors);
        resolve(params);
      });
    })
);

export const LocalStorageSlice = createSlice({
  name: 'localStorage',
  initialState: InitialLocalStorage,
  extraReducers: builder => {
    builder.addCase(readAndStorageInState.fulfilled, (state, action) => {
      state = {
        ...state,
        ...action.payload
      };
      return state;
    });
    builder.addCase(save.fulfilled, (state, action) => {
      state = {
        ...state,
        ...action.payload
      };
      return state;
    });
  },
  reducers: {}
});

export const localStorageStateSelector = (state: RootState) =>
  state.localStorage;

export default LocalStorageSlice.reducer;
