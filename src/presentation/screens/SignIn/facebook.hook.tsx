import { useState } from 'react';
import { Platform } from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  Profile,
  LoginManager
} from 'react-native-fbsdk-next';
import { CommonDataUserSocialNetwork } from './interface';

export const useFacebookProfile = (): UseFacebookProfileHook => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<FacebookProfile>();

  const callToFacebookAPI = async (
    accessToken: string
  ): Promise<FacebookProfile> =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,first_name,last_name`
      )
        .then(response => response.json())
        .then(data => {
          const profile = {
            email: data.email,
            userId: data.id,
            firsname: data.first_name,
            lastname: data.last_name,
            accessToken
          };
          console.log('>>> [FACEBOOOK-API] PROFILE_USER: ', data);
          setProfile(profile);
          setIsLoading(false);
          resolve(profile);
        })
        .catch(reject);
    });

  const getProfile = async (): Promise<FacebookProfile> => {
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const _profile = await Profile.getCurrentProfile();
    const accessToken =
      (await AccessToken.getCurrentAccessToken())?.accessToken ?? '';

    const { firstName, lastName, userID, email } = _profile ?? {};
    if (!!firstName && !!lastName && !!userID && !!email && !!accessToken) {
      return {
        email: email,
        userId: userID,
        firsname: firstName,
        lastname: lastName,
        accessToken
      };
    }
    return callToFacebookAPI(accessToken);
  };

  return [
    getProfile,
    {
      isLoading,
      profile
    }
  ];
};

export type UseFacebookProfileHook = [
  () => Promise<FacebookProfile>,
  {
    profile?: FacebookProfile;
    isLoading: boolean;
  }
];

export type FacebookProfile = CommonDataUserSocialNetwork & {
  userId: string;
  accessToken: string;
};
