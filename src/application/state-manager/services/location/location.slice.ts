import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { RootState } from '../..';
import { DefaultLocation, LocationState } from './location.interface';
import Geolocation, { PositionError } from 'react-native-geolocation-service';

export const readGPSCoors = createAsyncThunk(
  'readGPSCoors',
  async (_, thunkApi) => {
    return new Promise<LocationState>(resolve => {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      request(permission).then(result => {
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              resolve({
                latitude,
                longitude,
                granted: true,
                status: 'completed'
              });
            },
            error => {
              console.log('>>> GPS Error:', error);
              if (error.code === PositionError.POSITION_UNAVAILABLE)
                resolve({
                  ...DefaultLocation,
                  granted: false,
                  status: 'deny'
                });
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000
            }
          );
          return;
        }

        Alert.alert(
          'De Prati',
          'Es necesario que habilites el permiso de ubicación para ofrecerte una mejor experiencia',
          [
            {
              text: 'Ir a ajustes',
              onPress: () => {
                Linking.openSettings();
                thunkApi.dispatch({
                  type: readGPSCoors.fulfilled,
                  payload: {
                    ...DefaultLocation,
                    granted: false,
                    status: 'pending'
                  }
                });
              }
            },
            {
              text: 'Continuar',
              onPress: () =>
                resolve({
                  ...DefaultLocation,
                  granted: false,
                  status: 'deny'
                })
            }
          ],
          {
            cancelable: false
          }
        );
      });
    });
  }
);

export const LocationGPSSlice = createSlice({
  name: 'LocationGPSSlice',
  initialState: {
    ...DefaultLocation,
    granted: false,
    status: 'pending'
  } as LocationState,
  extraReducers: builder => {
    builder.addCase(readGPSCoors.fulfilled, (state, action) => {
      state = {
        ...state,
        ...action.payload
      };
      return state;
    });
  },
  reducers: {}
});

export const locationGPSStateSelector = (state: RootState) =>
  state.LocationGPSSlice;

export default LocationGPSSlice.reducer;
