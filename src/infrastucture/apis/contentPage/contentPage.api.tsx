import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  ContentPageRequest,
  ContentPageResponse,
  ComponentDtoRequest,
  ComponentDtoResponse
} from './contentPage.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    page: builder.mutation<ContentPageResponse, ContentPageRequest>({
      query: params => ({
        url: ApiConfig.endpoints.page.page,
        method: 'GET',
        params: { fields: 'FULL', ...params }
      })
    }),
    components: builder.mutation<ComponentDtoResponse, ComponentDtoRequest>({
      query: params => ({
        url: ApiConfig.endpoints.page.components,
        method: 'GET',
        params: { fields: 'FULL', ...params }
      })
    })
  })
});

export const { usePageMutation, useComponentsMutation } = extendedApi;
