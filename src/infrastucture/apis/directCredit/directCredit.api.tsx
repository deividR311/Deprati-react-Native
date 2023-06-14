import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  DirectCreditRequest,
  DirectCreditResponse
} from './directCredit.interfaces';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    directCreditAdd: builder.mutation<
      DirectCreditResponse,
      DirectCreditRequest
    >({
      query: body => ({
        url: ApiConfig.endpoints.directCredit.directCredit,
        method: 'PUT',
        body
      })
    }),
    directCreditGet: builder.query<void, void>({
      query: () => ({
        url: ApiConfig.endpoints.directCredit.directCredit,
        method: 'GET'
      })
    })
  })
});

export const { useDirectCreditAddMutation, useLazyDirectCreditGetQuery } =
  extendedApi;
