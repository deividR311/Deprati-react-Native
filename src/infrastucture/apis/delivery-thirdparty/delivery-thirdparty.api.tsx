import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  CityBody,
  CityResponse,
  ProvincesResponse,
  selectThirdPartyAgencyBody,
  selectThirdPartyAgencyResponse,
  ThirdPartyAgencyBody,
  ThirdPartyAgencyResponse,
  updateThirdPartyAgencyBody
} from './delivery-thirdparty.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getProvinces: builder.mutation<ProvincesResponse, any>({
      query: () => ({
        url: ApiConfig.endpoints.delivery.thirdParty.getProvinces,
        method: 'GET'
      })
    }),
    getCities: builder.mutation<CityResponse, CityBody>({
      query: params => ({
        url: ApiConfig.endpoints.delivery.thirdParty.getCities,
        method: 'GET',
        params
      })
    }),
    getThirdPartyAgenciesList: builder.mutation<
      ThirdPartyAgencyBody,
      ThirdPartyAgencyResponse
    >({
      query: params => ({
        url: ApiConfig.endpoints.delivery.thirdParty.getThirdPartyAgenciesList,
        method: 'GET',
        params
      })
    }),
    selectThirdPartyAgency: builder.mutation<
      selectThirdPartyAgencyResponse,
      selectThirdPartyAgencyBody
    >({
      query: ({ cartId, posCode, ...body }) => ({
        url: ApiConfig.endpoints.delivery.thirdParty.selectThirdPartyAgency(
          cartId,
          posCode
        ),
        method: 'POST',
        body
      })
    }),
    updateThirdPartyAgency: builder.mutation<any, updateThirdPartyAgencyBody>({
      query: ({ cartId, ...body }) => ({
        url: ApiConfig.endpoints.delivery.thirdParty.updateThirdPartyAgency(
          cartId
        ),
        method: 'PUT',
        body
      })
    })
  })
});

export const {
  useGetProvincesMutation,
  useGetCitiesMutation,
  useGetThirdPartyAgenciesListMutation,
  useSelectThirdPartyAgencyMutation,
  useUpdateThirdPartyAgencyMutation
} = extendedApi;
