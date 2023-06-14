import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  CitiesResponse,
  CountriesResponse,
  RegionsResponse,
  Response
} from './countriesAndOthers.interfaces';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    countries: builder.query<CountriesResponse, void>({
      query: () => ({
        url: ApiConfig.endpoints.countriesAndOthers.countries,
        headers: {
          'Content-Type': 'application/json'
        },

        method: 'GET'
      })
    }),
    regions: builder.query<RegionsResponse, void>({
      query: () => ({
        url: ApiConfig.endpoints.countriesAndOthers.regions,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
    }),
    cities: builder.query<CitiesResponse, { region: string }>({
      query: ({ region }) => ({
        url: ApiConfig.endpoints.countriesAndOthers.cities(region),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
    })
  })
});

export const {
  useLazyCountriesQuery: useCountriesRequest,
  useLazyCitiesQuery: useCitiesRequest,
  useLazyRegionsQuery: useRegionsRequest
} = extendedApi;
