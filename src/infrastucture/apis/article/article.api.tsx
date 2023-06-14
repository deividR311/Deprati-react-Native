import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { articleBody, articleResponse } from './article.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    article: builder.mutation<articleResponse, articleBody>({
      query: body => ({
        url: ApiConfig.endpoints.article.article,
        method: 'POST',
        body: {
          ...body,
          latitud: body.latitud || '31.250440',
          longitud: body.longitud || '-99.250610'
        }
      })
    })
  })
});

export const {
  useArticleMutation: useArticleMutationRequest,
  usePrefetch: usePrefetchRequest
} = extendedApi;
