import React from 'react';
import { render, within } from '@testing-library/react-native';
import PDPScreen from '../../../../../src/presentation/screens/dashboard/PDP/PDPScreen';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { useProductPage } from '../../../../../src/presentation/screens/dashboard/PDP/hook/useProductPage.hook';

jest.mock(
  '../../../../../src/presentation/screens/dashboard/PDP/hook/useProductPage.hook'
);
describe('Product Page', () => {
  beforeEach(() => {
    useProductPage.mockImplementation(() => ({
      loading: false,
      isFavorite: false,
      error: false,
      contentProduct: {
        name: 'product name',
        code: '232A40269490167003',
        description: 'description',
        detailVideoMediaCloudflare: {
          videoId: 'db0aa67abce5eab474f6e5cc9b16172e',
          width: '500',
          height: '500',
          responsive: true,
          autoplay: true,
          controls: false,
          loop: true,
          muted: false,
          thumbnailTime: 2
        },
        variantValueCategories: [
          {
            code: 'C0003689',
            name: 'Verde Oliva',
            sequence: 681
          },
          {
            code: 'T8011',
            name: 'L',
            sequence: 4
          }
        ],
        variantSelectors: [
          {
            values: [],
            variantCategoryCode: {
              code: 'color',
              hasImage: true,
              name: 'Color',
              priority: 0
            }
          },
          {
            values: [],
            variantCategoryCode: {
              code: 'monto',
              hasImage: true,
              name: 'Valor de Tarjeta',
              priority: 0
            }
          }
        ],
        baseOptions: [
          {
            options: []
          }
        ]
      },
      pageContent: {
        uid: 'productDetails',
        typeCode: 'ProductPage',
        slots: {
          Section1: [
            'ProductDetailsPageCarouselComponent',
            'ProductDetailsPagePricesComponent',
            'VariantSelectorComponent',
            'DepratiInstallmentHeaderMessageComponent',
            'ProductDetailsPageDeliveryModesComponent',
            'ProductDetailsPageAssembleAtHomeComponent',
            'ProductDetailsPageAvailabilityNearbyStoresComponent'
          ],
          Section2: ['TabPanelContainer'],
          Section0: ['pdp-deprati-simple-responsive-banner-dior-black']
        },
        components: {
          ProductDetailsPageCarouselComponent: {
            uid: 'ProductDetailsPageCarouselComponent',
            typeCode: 'DepratiFlexComponent'
          },
          ProductDetailsPagePricesComponent: {
            uid: 'ProductDetailsPagePricesComponent',
            typeCode: 'DepratiFlexComponent'
          },
          DepratiInstallmentHeaderMessageComponent: {
            uid: 'DepratiInstallmentHeaderMessageComponent',
            typeCode: 'DepratiInstallmentHeaderMessageComponent'
          },
          ProductDetailsPageDeliveryModesComponent: {
            uid: 'ProductDetailsPageDeliveryModesComponent',
            typeCode: 'DepratiFlexComponent'
          },
          ProductDetailsPageAssembleAtHomeComponent: {
            uid: 'ProductDetailsPageAssembleAtHomeComponent',
            typeCode: 'DepratiFlexComponent'
          },
          ProductDetailsPageAvailabilityNearbyStoresComponent: {
            uid: 'ProductDetailsPageAvailabilityNearbyStoresComponent',
            typeCode: 'DepratiFlexComponent'
          },
          VariantSelectorComponent: {
            uid: 'VariantSelectorComponent',
            typeCode: 'ProductVariantSelectorComponent'
          },
          TabPanelContainer: {
            uid: 'TabPanelContainer',
            typeCode: 'CMSTabParagraphContainer'
          },
          'pdp-deprati-simple-responsive-banner-dior-black': {
            uid: 'pdp-deprati-simple-responsive-banner-dior-black',
            typeCode: 'DepratiSimpleResponsiveBannerComponent',
            modifiedTime: '2023-04-19T08:45:05.252-05:00',
            name: 'Banner Dior PDP',
            container: false,
            visibleOn: 'MOBILE',
            bannersList: 'pdp-banner-dior-black',
            childrenComponentsList: ['pdp-banner-dior-black'],
            childrenComponents: {
              'pdp-banner-dior-black': {
                uid: 'pdp-banner-dior-black',
                typeCode: 'SimpleResponsiveBannerComponent',
                modifiedTime: '2023-04-19T13:45:00+0000',
                name: 'SimpleResponsiveBannerComponent',
                container: false,
                childrenComponentsList: null,
                childrenComponents: {},
                media: {
                  imageType: 'GALLERY',
                  format: 'mobile',
                  url: 'https://imagestg.deprati.com.ec/sys-master/images/hd8/h05/8987757215774/Dior-Pdp-Negro.jpg',
                  width: 480
                }
              }
            }
          }
        }
      },
      handleSetProductCode: jest.fn(),
      loadingProduct: false
    }));
  });

  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={PDPScreen} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Icon Shopping Cart', () => {
    const screenTest = render(<NavigationWrapper screen={PDPScreen} />);
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });

  it('product name under the picture', () => {
    const screenTest = render(<NavigationWrapper screen={PDPScreen} />);
    const messages = screenTest.getByTestId('detail-pdp');

    expect(within(messages).getByText('product name')).toBeDefined();
  });
});
