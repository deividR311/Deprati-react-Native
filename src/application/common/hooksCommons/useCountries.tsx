import { useEffect, useState } from 'react';
import {
  useCitiesRequest,
  useCountriesRequest,
  useRegionsRequest
} from '../../../infrastucture/apis/countriesAndOthers/countriesAndOthers.api';
import { MapDataResponse } from '../../../infrastucture/apis/countriesAndOthers/countriesAndOthers.interfaces';

export default function useCountriesAndOthers() {
  const [countries, setcountries] = useState<MapDataResponse[]>([]);
  const [cities, setCities] = useState<MapDataResponse[]>([]);
  const [regions, setRegions] = useState<MapDataResponse[]>([]);

  const [
    getCountriesApi,
    {
      data: responseCountries,
      isError: errorCountries,
      isLoading: loadingCountries,
      error: errorCountriesMessage
    }
  ] = useCountriesRequest();
  const [
    getCities,
    {
      data: responseCities,
      isError: errorCities,
      isLoading: loadingCities,
      error: errorCitiesMessage
    }
  ] = useCitiesRequest();

  const [
    getRegions,
    {
      data: responseRegions,
      isError: errorRegions,
      isLoading: loadingRegions,
      error: errorRegionsMessage
    }
  ] = useRegionsRequest();

  useEffect(() => {
    if (responseCountries?.countries?.length > 0) {
      const mapCountries: MapDataResponse[] = responseCountries?.countries?.map(
        country => ({
          label: country.name,
          value: country.isocode
        })
      );

      setcountries(mapCountries);
    }
  }, [responseCountries]);

  useEffect(() => {
    const { regions: _cities } = responseCities || {};
    if (!_cities?.length) return;

    const mapCities = _cities.map<MapDataResponse>(
      ({ name: label, isocode: value }) => ({
        label,
        value
      })
    );
    setCities(mapCities);
  }, [responseCities]);

  useEffect(() => {
    if (responseRegions?.regions?.length > 0) {
      const mapRegions: MapDataResponse[] = responseRegions?.regions?.map(
        regions => ({
          label: regions.name,
          value: regions.isocode
        })
      );

      setRegions(mapRegions);
    }
  }, [responseRegions]);

  return {
    getCountries: getCountriesApi,
    countries: countries,

    getRegions,
    regions: regions,

    getCities,
    cities: cities
  };
}
