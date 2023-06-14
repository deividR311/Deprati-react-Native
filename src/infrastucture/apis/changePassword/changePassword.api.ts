import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import { ChangePasswordBody } from './changePassword.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    changePassword: builder.mutation<any, ChangePasswordBody>({
      query: ({ username, ...params }) => ({
        url: ApiConfig.endpoints.changePassword.updatePassword(username),
        method: 'PUT',
        params
      })
    })
  })
});

export const { useChangePasswordMutation } = extendedApi;
