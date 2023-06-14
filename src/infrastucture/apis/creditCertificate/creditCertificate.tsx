import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import { creditCertificateBody } from './creditCertificate.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    dcCertificate: builder.mutation<any, creditCertificateBody>({
      query: body => ({
        url: ApiConfig.endpoints.creditCertificate.dcCertificate,
        method: 'POST',
        body: body
      })
    })
  })
});

export const { useDcCertificateMutation: useDcCertificateMutationRequest } =
  extendedApi;
