import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomeScreen from '../../../src/presentation/screens/Welcome/WelcomeScreen';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
const dirMockHook =
  '../../../src/infrastucture/apis/contentPage/contentPage.hook';

describe('Welcome', () => {
  it('renders correctly in Snapshot', () => {
    jest.spyOn(require(dirMockHook), 'usePageContent').mockReturnValueOnce({
      loading: false,
      pageContent: {
        defaultPage: true,
        name: 'WelcomePage',
        template: 'WelcomePageTemplate',
        typeCode: 'ContentPage',
        uid: 'welcomePage',
        timestamp: 1679610740894,
        components: {
          DePratiWelcomeRotatingImagesComponent: {
            uid: 'DePratiWelcomeRotatingImagesComponent',
            typeCode: 'DepratiWelcomeRotatingImagesComponent',
            modifiedTime: '2022-04-08T10:39:02.55-05:00',
            name: 'Deprati Welcome Rotating Images Component',
            container: 'false',
            effect: 'FADE',
            rotatingImagesComponentsList: 'DePratiWelcomeCarousel_Mobile',
            childrenComponentsList: ['DePratiWelcomeCarousel_Mobile'],
            childrenComponents: {
              DePratiWelcomeCarousel_Mobile: {
                uid: 'DePratiWelcomeCarousel_Mobile',
                typeCode: 'RotatingImagesComponent',
                modifiedTime: '2022-04-08T15:38:40+0000',
                name: 'DePrati Homepage Mobile Carousel',
                container: 'false',
                resolutionEnum: 'MOBILE',
                effect: 'FADE',
                banners:
                  'WelcomeCarousel_1_Mobile WelcomeCarousel_2_Mobile WelcomeCarousel_3_Mobile',
                timeout: '6',
                childrenComponentsList: [
                  'WelcomeCarousel_1_Mobile',
                  'WelcomeCarousel_2_Mobile',
                  'WelcomeCarousel_3_Mobile'
                ],
                childrenComponents: {
                  WelcomeCarousel_1_Mobile: {
                    uid: 'WelcomeCarousel_1_Mobile',
                    typeCode: 'BannerComponent',
                    modifiedTime: '2022-05-18T21:25:31+0000',
                    name: 'Example1 Home Banner Mobile',
                    container: 'false',
                    external: 'false',
                    media: {
                      code: 'WelcomeCarousel_1_Mobile.png',
                      mime: 'image/png',
                      url: 'https://imagestg.deprati.com.ec/sys-master/images/h6f/h47/8969902358558',
                      downloadUrl:
                        'https://imagestg.deprati.com.ec/sys-master/images/h6f/h47/8969902358558'
                    },
                    headline: 'Bienvenido A De Prati App - Prueba',
                    content: 'Prueba iPhone - texto texto texto',
                    urlLink: '/'
                  },
                  WelcomeCarousel_2_Mobile: {
                    uid: 'WelcomeCarousel_2_Mobile',
                    typeCode: 'BannerComponent',
                    modifiedTime: '2023-01-25T14:25:41+0000',
                    name: 'Example2 Home Banner Mobile',
                    container: 'false',
                    external: 'false',
                    media: {
                      code: 'WelcomeCarousel_2_Mobile.png',
                      mime: 'image/png',
                      url: 'https://imagestg.deprati.com.ec/sys-master/images/h8e/he8/8969829449758',
                      downloadUrl:
                        'https://imagestg.deprati.com.ec/sys-master/images/h8e/he8/8969829449758'
                    },
                    headline: 'Encuentra tus productos favoritos',
                    content:
                      'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit',
                    urlLink: '/'
                  },
                  WelcomeCarousel_3_Mobile: {
                    uid: 'WelcomeCarousel_3_Mobile',
                    typeCode: 'BannerComponent',
                    modifiedTime: '2023-01-25T14:25:41+0000',
                    name: 'Example3 Home Banner Mobile',
                    container: 'false',
                    external: 'false',
                    media: {
                      code: 'WelcomeCarousel_3_Mobile.png',
                      mime: 'image/png',
                      url: 'https://imagestg.deprati.com.ec/sys-master/images/h23/he8/8969829482526',
                      downloadUrl:
                        'https://imagestg.deprati.com.ec/sys-master/images/h23/he8/8969829482526'
                    },
                    headline:
                      'Solicita tu Crédito De Prati de forma facíl y rápida - Prueba iPhone',
                    content:
                      'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit. Hola.',
                    urlLink: '/'
                  }
                }
              }
            }
          },
          SkipWelcomeLink: {
            uid: 'SkipWelcomeLink',
            typeCode: 'CMSLinkComponent',
            modifiedTime: '2022-06-22T12:28:34.64-05:00',
            name: 'SkipWelcomeLink',
            container: 'false',
            external: 'false',
            linkName: 'Invitado',
            url: 'homePage',
            target: 'false',
            childrenComponentsList: null,
            childrenComponents: {}
          },
          SiteLogoComponent: {
            uid: 'SiteLogoComponent',
            typeCode: 'SimpleBannerComponent',
            modifiedTime: '2022-05-20T11:47:01.945-05:00',
            name: 'Site Logo Component',
            container: 'false',
            external: 'false',
            media: {
              code: '/images/logo_deprati_responsive.svg',
              mime: 'image/svg+xml',
              altText: 'Deprati Storefront',
              url: 'https://imagestg.deprati.com.ec/sys-master/images/h9f/hfd/8969934569502',
              downloadUrl:
                'https://imagestg.deprati.com.ec/sys-master/images/h9f/hfd/8969934569502'
            },
            urlLink: '/',
            childrenComponentsList: null,
            childrenComponents: {}
          }
        },
        slots: {
          Section1: ['DePratiWelcomeRotatingImagesComponent'],
          Section2: ['SkipWelcomeLink'],
          SiteLogo: ['SiteLogoComponent']
        }
      },
      getDataContent: jest.fn(),
      error: false
    });
    const screenTest = render(<NavigationWrapper screen={WelcomeScreen} />);
    const { getByTestId } = screenTest;
    expect(getByTestId('welcome_iniciar_sesion')).toBeTruthy();
    expect(getByTestId('welcome_btn_omitir')).toBeTruthy();
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Loadind Skeleton', () => {
    jest.spyOn(require(dirMockHook), 'usePageContent').mockReturnValueOnce({
      loading: true,
      pageContent: {},
      getDataContent: jest.fn(),
      error: false
    });
    const { findByTestId } = render(
      <NavigationWrapper screen={WelcomeScreen} />
    );
    expect(findByTestId('skeletonSignIn')).toBeTruthy();
  });

  it('renders correctly in Error Skeleton', () => {
    jest.spyOn(require(dirMockHook), 'usePageContent').mockReturnValueOnce({
      error: true,
      loading: false,
      getDataContent: jest.fn()
    });
    const { findByTestId } = render(
      <NavigationWrapper screen={WelcomeScreen} />
    );
    expect(findByTestId('errorPage')).toBeTruthy();
  });
});
