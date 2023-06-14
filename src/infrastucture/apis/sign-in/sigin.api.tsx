import { Platform } from 'react-native';
import Config from '../../../application/common/dotEnv';
import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  SignInBody,
  SignInResponse,
  SignInWithSocialNetworksBody
} from './sign-in.type';

const platformClientId =
  Platform.select({
    ios: Config.HYBRIS_CLIENT_ID_IOS,
    android: Config.HYBRIS_CLIENT_ID_ANDROID
  }) ?? '';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInBody>({
      query: ({ email, password }) => ({
        url: ApiConfig.endpoints.auth.token,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: ApiConfig.staticHeaders.Authorization
        },
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'password',
          scope: 'basic',
          username: encodeURIComponent(email.toLowerCase()),
          password: encodeURIComponent(password)
        }).toString()
      })
    }),

    signInWithSocialNetworks: builder.mutation<
      SignInResponse,
      SignInWithSocialNetworksBody
    >({
      query: ({ accessToken, ...body }) => ({
        url: ApiConfig.endpoints.auth.social,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: ApiConfig.staticHeaders.Authorization
        },
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'password',
          scope: 'basic',
          accessToken: accessToken ?? '',
          ...body
        }).toString()
      })
    }),

    refreshToken: builder.mutation<SignInResponse, { refreshToken: string }>({
      query: ({ refreshToken: refresh_token }) => ({
        url: ApiConfig.endpoints.auth.token,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          scope: 'basic',
          refresh_token,
          client_id: platformClientId,
          client_secret: Config.HYBRIS_CLIENT_SECRET
        }).toString()
      })
    })
  })
});

export const {
  useSignInMutation: useSignInRequest,
  useRefreshTokenMutation: useRefreshTokenRequest,
  useSignInWithSocialNetworksMutation: useSignInWithSocialNetworksRequest
} = extendedApi;
