import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import {
  movementBody,
  MovementPeriodResponse,
  MovementPeriodsBody,
  movementResponse
} from './credit-movement.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    accountMovements: builder.mutation<movementResponse, movementBody>({
      query: body => ({
        url: ApiConfig.endpoints.accountMovements.movements,
        method: 'POST',
        body: body
      })
    }),
    accountPeriods: builder.mutation<
      MovementPeriodResponse,
      MovementPeriodsBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.accountMovements.period,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useAccountMovementsMutation: useAccountMovementsMutationRequest,
  useAccountPeriodsMutation: useAccountMovementsPeriodsRequest
} = extendedApi;
