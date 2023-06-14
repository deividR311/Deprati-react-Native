import { MapperDTO_To_Model } from '../../src/infrastucture/apis/common/mapper-dto-to-model';
import { SignInResponse } from '../../src/infrastucture/apis/sign-in';
import {
  SignInModel,
  mapSignInModelfromDTO
} from '../../src/infrastucture/apis/sign-in/sign-in.model';

const rawData: SignInResponse = {
  access_token: 'accessTokenValue',
  refresh_token: 'refreshTokenValue',
  expires_in: 3600,
  token_type: 'Bearer',
  scope: 'user'
};

describe('mapSignInModelfromDTO', () => {
  it('should map SignInResponse to SignInModel correctly', () => {
    const expectedModel: SignInModel = {
      accessToken: rawData.access_token,
      refreshToken: rawData.refresh_token,
      expiresIn: rawData.expires_in,
      tokenType: rawData.token_type,
      scope: rawData.scope
    };

    const mapperMock = jest.spyOn(MapperDTO_To_Model.prototype, 'get');
    mapperMock.mockReturnValue(expectedModel);

    const result = mapSignInModelfromDTO(rawData);

    expect(mapperMock).toHaveBeenCalled();
    expect(result).toEqual(expectedModel);
  });
});
