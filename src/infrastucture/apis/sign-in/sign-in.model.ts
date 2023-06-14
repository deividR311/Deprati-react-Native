import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { SignInResponse } from './sign-in.type';

export interface SignInModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
}

export function mapSignInModelfromDTO(rawData: SignInResponse): SignInModel {
  return new MapperDTO_To_Model<SignInResponse, SignInModel>(rawData, {
    access_token: 'accessToken',
    refresh_token: 'refreshToken',
    expires_in: 'expiresIn',
    token_type: 'tokenType',
    scope: 'scope'
  }).get();
}
