import { useEffect } from 'react';
import { useFindStoresRequest } from '../../../../../infrastucture/apis/stores/store.api';
import useGetLocation from './useGetLocation';

export default function useFinderStores() {
  const [getStores, { isLoading, data, isError }] = useFindStoresRequest();
  const {
    location: { latitude, longitude },
    loading
  } = useGetLocation();

  useEffect(() => {
    if (loading) return;

    getStores({
      latitud: latitude,
      longitud: longitude,
      horaUsuario: new Date()
    });
  }, [latitude, longitude, loading]);

  const findStore = () => {
    getStores({
      latitud: latitude,
      longitud: longitude,
      horaUsuario: new Date()
    });
  };

  return {
    findStore,
    isLoading: isLoading || loading,
    data,
    isError
  };
}
