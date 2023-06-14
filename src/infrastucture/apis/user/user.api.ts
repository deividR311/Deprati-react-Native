import Config from '../../../application/common/dotEnv';
import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  NewUserRequest,
  UserRequest,
  UserResponse,
  UserUpdateRequestBody,
  UserUpdateRequestMetaData
} from './user.interface';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getInfoUser: builder.query<UserResponse, UserRequest>({
      query: params => ({
        url: `${Config.API_URL_ECCOMMERCE}/users/${params.email}?fields=FULL`
      }),
      providesTags: ['UserInfo']
    }),

    updateProfile: builder.mutation<
      void,
      UserUpdateRequestBody & UserUpdateRequestMetaData
    >({
      query: ({ token, userEmail, ...params }) => ({
        url: `${Config.API_URL_ECCOMMERCE}/users/${userEmail}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: params
      }),
      invalidatesTags: ['UserInfo']
    }),
    newUser: builder.mutation<any, NewUserRequest>({
      query: body => ({
        url: ApiConfig.endpoints.user.newUser,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
    }),
    forgottenpassword: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: ApiConfig.endpoints.user.forgottenpassword(email),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })
});

export const {
  useLazyGetInfoUserQuery: useGetLazyInfoUserRequest,
  useGetInfoUserQuery: useGetInfoUserRequest,
  useUpdateProfileMutation: useUpdateProfileRequest,
  useNewUserMutation: useNewUserRequest,
  useForgottenpasswordMutation: useForgottenpasswordRequest
} = extendedApi;
