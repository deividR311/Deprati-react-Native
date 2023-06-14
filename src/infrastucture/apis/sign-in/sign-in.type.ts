export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
  scope: string;
}

export interface SignInErrorResponse {
  error: string;
  error_description: string;
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInWithSocialNetworksBody {
  email: string;
  userId: string;
  accessToken: string | null;
  appCode: 'google' | 'facebook';
}
