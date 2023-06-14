import { ApiConfig } from '../../common/config';
import { SAP_API } from '../../common/hybriss.api';
import {
  ProductNearblyStoreBody,
  ProductNearblyStoreResponse
} from './productNearblyStore.interfaces';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    findProductNearblyStores: builder.mutation<
      ProductNearblyStoreResponse,
      ProductNearblyStoreBody
    >({
      transformResponse: (response: ProductNearblyStoreResponse) =>
        response.data.dato.listaInventario,
      query: body => ({
        url: ApiConfig.endpoints.product.productNearbyStore,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useFindProductNearblyStoresMutation:
    useFindProductNearblyStoresMutationRequest
} = extendedApi;
