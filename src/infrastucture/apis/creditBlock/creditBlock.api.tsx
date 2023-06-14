import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import { creditLockReasonRequest, BlockCardRequest } from './creditBlock.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    blockCard: builder.mutation<any, BlockCardRequest>({
      query: body => ({
        url: ApiConfig.endpoints.dcCard.blockCard,
        method: 'POST',
        body: body
      })
    }),
    blockReason: builder.mutation<any, creditLockReasonRequest>({
      query: body => ({
        url: ApiConfig.endpoints.dcCard.blockReason,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useBlockCardMutation: useBlockCardMutationRequest,
  useBlockReasonMutation: useBlockReasonMutationRequest
} = extendedApi;
