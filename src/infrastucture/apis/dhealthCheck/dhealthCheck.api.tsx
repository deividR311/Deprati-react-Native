import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import { VerifySiteEnabledResponse } from './dhealthCheck.interfaces';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    verifySiteEnabled: builder.query<VerifySiteEnabledResponse, void>({
      query: () => ({
        url: ApiConfig.endpoints.healthCheck.verifySiteEnabled,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
    })
  })
});

export const { useLazyVerifySiteEnabledQuery } = extendedApi;
