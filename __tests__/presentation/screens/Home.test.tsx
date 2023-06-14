import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import Home from '../../../src/presentation/screens/home/home';
import { useLocalStorage } from '../../../src/application/state-manager/services/localstorage/useLocalStorage';

const dirMookLocalStorage =
  '../../../src/application/state-manager/services/localstorage/useLocalStorage';
jest.mock(
  '../../../src/application/state-manager/services/localstorage/useLocalStorage'
);
describe('Home', () => {
  beforeEach(() => {
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        IS_LOGIN: false // valor inicial de IS_LOGIN
      }
    }));
  });

  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={Home} />);
    const { queryByText } = screenTest;
    expect(queryByText('¡Hola')).toBeNull();
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Login and shows message welcome', () => {
    jest
      .spyOn(require(dirMookLocalStorage), 'useLocalStorage')
      .mockReturnValueOnce({
        save: jest.fn(),
        localStorageData: {
          IS_LOGIN: true,
          LocalUserData: {
            firstName: 'Cali'
          }
        }
      });
    const screenTest = render(<NavigationWrapper screen={Home} />);
    const { queryByText } = screenTest;
    expect(queryByText('¡Hola')).toBeTruthy();
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot loading skeleton home', () => {
    jest
      .spyOn(
        require('../../../src/infrastucture/apis/contentPage'),
        'usePageContent'
      )
      .mockReturnValueOnce({
        loading: true,
        pageContent: {},
        getDataContent: jest.fn(),
        error: false
      });
    const screenTest = render(<NavigationWrapper screen={Home} />);
    const { queryByTestId } = screenTest;
    expect(queryByTestId('skeleton_home')).toBeTruthy();
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot home section components', () => {
    jest
      .spyOn(
        require('../../../src/infrastucture/apis/contentPage'),
        'usePageContent'
      )
      .mockReturnValueOnce({
        loading: false,
        pageContent: {
          uid: 'homePage',
          typeCode: 'ContentPage',
          slots: {
            Section1: [
              'HomeBannerInicioComponent',
              'HomePageCategoryListComponent'
            ]
          },
          components: {
            HomeBannerInicioComponent: {
              uid: 'HomeBannerInicioComponent',
              typeCode: 'SimpleBannerComponent',
              media: {
                code: '/images/banners/home/HomeInicio_Mobile.jpg',
                mime: 'image/jpeg',
                url: 'https://imagestg.deprati.com.ec/sys-master/images/hb4/h89/8980812464158',
                downloadUrl:
                  'https://imagestg.deprati.com.ec/sys-master/images/hb4/h89/8980812464158'
              }
            },
            HomePageCategoryListComponent: {
              uid: 'HomePageCategoryListComponent',
              typeCode: 'DepratiCategoryListComponent',
              childrenComponents: {
                HomePageCategoryListComponent: {
                  uid: 'HomePageCategoryListComponent',
                  typeCode: 'DepratiCategoryListComponent',
                  mediaContainer: [
                    {
                      imageType: 'GALLERY',
                      format: 'mobile',
                      url: 'https://imagestg.deprati.com.ec/sys-master/images/h6a/he6/8985041928222',
                      width: 480,
                      text: 'Niños',
                      textColor: '#ffffff',
                      order: 3,
                      link: {
                        category: '03'
                      }
                    }
                  ]
                }
              },
              childrenComponentsList: ['HomePageCategoryListComponent']
            }
          }
        },
        getDataContent: jest.fn(),
        error: false
      });
    const screenTest = render(<NavigationWrapper screen={Home} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Icon Shopping Cart', () => {
    const screenTest = render(<NavigationWrapper screen={Home} />);
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });
});
