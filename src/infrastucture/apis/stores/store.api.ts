import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { StoreRequestBody, StoresApiResponse } from './stores.Interfaces';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    findStores: builder.mutation<StoresApiResponse, StoreRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.findedStores,
        method: 'POST',
        body: body
      })
    })
  })
});

export const { useFindStoresMutation: useFindStoresRequest } = extendedApi;
