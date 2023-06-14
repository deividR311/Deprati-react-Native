import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../application/state-manager';
import { useSelector } from 'react-redux';
import {
  locationGPSStateSelector,
  readGPSCoors
} from '../../../../../application/state-manager/services/location/location.slice';
import { Location } from '../../../../../application/state-manager/services/location/location.interface';
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function useGetLocation(): UseLocationHook {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    granted,
    latitude,
    longitude,
    status: gpsStatus
  } = useSelector(locationGPSStateSelector);

  const [status, setStatus] = useState<
    'pending' | 'deny' | 'completed' | 'error'
  >(gpsStatus);

  const requestLocation = () => {
    setLoading(true);
    dispatch(readGPSCoors())
      .then(gpsState => console.log('>>> GPS Status:', gpsState))
      .finally(() => setLoading(false));
  };

  const checkEnableGPS = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const result = await check(permission);
    if (result === RESULTS.GRANTED && !granted) requestLocation();
  };

  useEffect(() => {
    setStatus(gpsStatus);
  }, [gpsStatus]);

  return {
    permissionGanted: granted,
    requestLocation,
    checkEnableGPS,
    location: {
      latitude,
      longitude
    },
    loading,
    status
  };
}

interface UseLocationHook {
  permissionGanted: boolean;
  requestLocation: () => void;
  checkEnableGPS: () => void;
  location: Location;
  loading: boolean;
  status: 'pending' | 'deny' | 'completed' | 'error';
}
