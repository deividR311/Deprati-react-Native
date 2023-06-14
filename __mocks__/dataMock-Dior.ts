export const DataMock_DiorContent = {
  defaultPage: true,
  name: 'Dior Corner Page',
  template: 'CategoryPageTemplate',
  typeCode: 'ContentPage',
  uid: 'dior',
  timestamp: 1683748558905,
  components: {
    DiorNewInProductCarouselComponent: {
      uid: 'DiorNewInProductCarouselComponent',
      typeCode: 'ProductCarouselComponent',
      modifiedTime: '2023-04-19T08:44:59.275-05:00',
      name: 'Dior NEW IN Product Carousel',
      container: 'false',
      popup: 'false',
      scroll: 'ALLVISIBLE',
      productCodes:
        '737I60119000020 738J30119090486 737I60119007813 737I60119001150 737I60119008882 737I60119009973 738J20119068247 738J30119007878 738J30119014709 738J20119000455',
      title: 'NOVEDADES',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DiorBestSellersProductCarouselComponent: {
      uid: 'DiorBestSellersProductCarouselComponent',
      typeCode: 'ProductCarouselComponent',
      modifiedTime: '2023-04-19T08:45:03.692-05:00',
      name: 'Dior BEST SELLER Product Carousel',
      container: 'false',
      popup: 'false',
      scroll: 'ALLVISIBLE',
      productCodes:
        '738J30119000555 738J30119014709 738J30119000155 738J30119001991 738J20119000157 737I80119000425 737I80119009262 737I60119007509 738J30119090486',
      title: 'MÁS VENDIDOS',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DiorSimpleBannerComponent3: {
      uid: 'DiorSimpleBannerComponent3',
      typeCode: 'SimpleBannerComponent',
      modifiedTime: '2022-09-15T15:00:54.876-05:00',
      name: 'SimpleBannerComponent',
      container: 'false',
      external: 'false',
      media: {
        code: '/images/banners/H_DIOR.jpg',
        mime: 'image/jpeg',
        url: 'https://imagestg.deprati.com.ec/sys-master/images/h7a/hcf/8987754430494/H_DIOR.jpg',
        downloadUrl:
          'https://imagestg.deprati.com.ec/sys-master/images/h7a/hcf/8987754430494/H_DIOR.jpg'
      },
      urlLink: 'https://www.deprati.com.ec/fragance',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DiorSimpleBannerComponent4: {
      uid: 'DiorSimpleBannerComponent4',
      typeCode: 'SimpleBannerComponent',
      modifiedTime: '2022-09-15T15:00:55.198-05:00',
      name: 'SimpleBannerComponent',
      container: 'false',
      external: 'false',
      media: {
        code: '/images/banners/I_DIOR.jpg',
        mime: 'image/jpeg',
        url: 'https://imagestg.deprati.com.ec/sys-master/images/h12/hcc/8987754332190/I_DIOR.jpg',
        downloadUrl:
          'https://imagestg.deprati.com.ec/sys-master/images/h12/hcc/8987754332190/I_DIOR.jpg'
      },
      urlLink: 'https://www.deprati.com.ec/skincare',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DiorSimpleBannerComponent5: {
      uid: 'DiorSimpleBannerComponent5',
      typeCode: 'SimpleBannerComponent',
      modifiedTime: '2022-09-15T15:00:54.848-05:00',
      name: 'SimpleBannerComponent',
      container: 'false',
      external: 'false',
      media: {
        code: '/images/banners/J_DIOR.jpg',
        mime: 'image/jpeg',
        url: 'https://imagestg.deprati.com.ec/sys-master/images/hd1/hcf/8987754463262/J_DIOR.jpg',
        downloadUrl:
          'https://imagestg.deprati.com.ec/sys-master/images/hd1/hcf/8987754463262/J_DIOR.jpg'
      },
      urlLink: 'https://www.deprati.com.ec/dior_expertise',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DiorSimpleBannerComponent1: {
      uid: 'DiorSimpleBannerComponent1',
      typeCode: 'SimpleBannerComponent',
      modifiedTime: '2022-08-12T11:50:29.485-05:00',
      name: 'SimpleBannerComponent',
      container: 'false',
      external: 'false',
      media: {
        code: '/images/banners/B_DIOR.png',
        mime: 'image/jpeg',
        url: 'https://imagestg.deprati.com.ec/sys-master/images/h03/h8b/8988019621918',
        downloadUrl:
          'https://imagestg.deprati.com.ec/sys-master/images/h03/h8b/8988019621918'
      },
      urlLink: 'https://www.deprati.com.ec/dior',
      childrenComponentsList: null,
      childrenComponents: {}
    },
    DePratiDiorRotatingImagesComponent: {
      uid: 'DePratiDiorRotatingImagesComponent',
      typeCode: 'DepratiHomeRotatingImagesComponent',
      modifiedTime: '2023-04-19T08:45:03.525-05:00',
      name: 'Deprati Dior Rotating Images Component',
      container: 'false',
      effect: 'FADE',
      rotatingImagesComponentsList: 'DePratiDiorCarouselRotatingImagesList',
      childrenComponentsList: ['DePratiDiorCarouselRotatingImagesList'],
      childrenComponents: {
        DePratiDiorCarouselRotatingImagesList: {
          uid: 'DePratiDiorCarouselRotatingImagesList',
          typeCode: 'RotatingImagesComponent',
          modifiedTime: '2023-04-28T12:59:58+0000',
          name: 'DePrati Dior Mobile Carousel',
          container: 'false',
          resolutionEnum: 'MOBILE',
          effect: 'FADE',
          banners: 'DiorBannerComponent2 BannerCarouselDiorVideo_1',
          timeout: '6',
          childrenComponentsList: [
            'DiorBannerComponent2',
            'BannerCarouselDiorVideo_1'
          ],
          childrenComponents: {
            BannerCarouselDiorVideo_1: {
              uid: 'BannerCarouselDiorVideo_1',
              typeCode: 'DepratiCloudflareVideoStreamBannerComponent',
              modifiedTime: '2023-04-19T13:44:59+0000',
              name: 'BannerCarouselDiorVideo_1',
              container: 'false',
              external: 'false',
              controls: 'false',
              loop: 'true',
              responsive: 'true',
              width: '400',
              videoId: 'b68f180d31b8ca922e663019f26b5e87',
              muted: 'true',
              autoplay: 'true',
              height: '200'
            },
            DiorBannerComponent2: {
              uid: 'DiorBannerComponent2',
              typeCode: 'BannerComponent',
              modifiedTime: '2023-04-19T13:44:59+0000',
              name: 'Example Banner Dior Mobile',
              container: 'false',
              external: 'false',
              media: {
                code: '/images/banners/C_DIOR.jpg',
                mime: 'image/jpeg',
                url: 'https://imagestg.deprati.com.ec/sys-master/images/h61/hd7/8987995865118',
                downloadUrl:
                  'https://imagestg.deprati.com.ec/sys-master/images/h61/hd7/8987995865118'
              },
              urlLink:
                'https://www.deprati.com.ec/sauvage-elixir-perfume-60-ml/p/738J00119000755'
            }
          }
        }
      }
    },
    DiorCategoryFeatureCarousel1: {
      uid: 'DiorCategoryFeatureCarousel1',
      typeCode: 'DepratiCategoryFeatureCarouselComponent',
      modifiedTime: '2023-04-28T08:29:51.542-05:00',
      name: 'DiorCategoryFeatureCarousel1',
      container: 'false',
      categoryList:
        'DiorCarouselFeatureComponent_1 DiorCarouselFeatureComponent_2 DiorCarouselFeatureComponent_3 DiorCarouselFeatureComponent_4',
      childrenComponentsList: [
        'DiorCarouselFeatureComponent_1',
        'DiorCarouselFeatureComponent_2',
        'DiorCarouselFeatureComponent_3',
        'DiorCarouselFeatureComponent_4'
      ],
      childrenComponents: {
        DiorCarouselFeatureComponent_1: {
          uid: 'DiorCarouselFeatureComponent_1',
          typeCode: 'CategoryFeatureComponent',
          modifiedTime: '2023-04-25T21:47:55+0000',
          name: 'CategoryFeatureComponent',
          container: 'false',
          media: {
            code: '/images/banners/D1_DIOR.jpg',
            mime: 'image/jpeg',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h22/hef/8988283306014',
            downloadUrl:
              'https://imagestg.deprati.com.ec/sys-master/images/h22/hef/8988283306014'
          },
          category: '04100750101',
          title: 'CHAQUETAS',
          childrenComponentsList: null,
          childrenComponents: {}
        },
        DiorCarouselFeatureComponent_2: {
          uid: 'DiorCarouselFeatureComponent_2',
          typeCode: 'CategoryFeatureComponent',
          modifiedTime: '2023-04-19T13:45:01+0000',
          name: 'CategoryFeatureComponent',
          container: 'false',
          media: {
            code: '/images/banners/D2_DIOR.png',
            mime: 'image/jpeg',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/hc6/ha2/8988284485662',
            downloadUrl:
              'https://imagestg.deprati.com.ec/sys-master/images/hc6/ha2/8988284485662'
          },
          category: '01021201',
          title: 'SWEATER Y PULLOVERS',
          childrenComponentsList: null,
          childrenComponents: {}
        },
        DiorCarouselFeatureComponent_3: {
          uid: 'DiorCarouselFeatureComponent_3',
          typeCode: 'CategoryFeatureComponent',
          modifiedTime: '2023-04-19T13:45:01+0000',
          name: 'CategoryFeatureComponent',
          container: 'false',
          media: {
            code: '/images/banners/D3_DIOR.png',
            mime: 'image/jpeg',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/he3/hef/8988283371550',
            downloadUrl:
              'https://imagestg.deprati.com.ec/sys-master/images/he3/hef/8988283371550'
          },
          category: '01021306',
          title: 'SUDADERAS',
          childrenComponentsList: null,
          childrenComponents: {}
        },
        DiorCarouselFeatureComponent_4: {
          uid: 'DiorCarouselFeatureComponent_4',
          typeCode: 'CategoryFeatureComponent',
          modifiedTime: '2023-04-19T13:45:01+0000',
          name: 'CategoryFeatureComponent',
          container: 'false',
          media: {
            code: '/images/banners/D4_DIOR.png',
            mime: 'image/jpeg',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h1f/ha0/8988284518430',
            downloadUrl:
              'https://imagestg.deprati.com.ec/sys-master/images/h1f/ha0/8988284518430'
          },
          category: '01011002',
          title: 'CÁRDIGANS',
          childrenComponentsList: null,
          childrenComponents: {}
        }
      }
    },
    DiorCategoryDoubleBanner1: {
      uid: 'DiorCategoryDoubleBanner1',
      typeCode: 'DepratiDoubleResponsiveBannerComponent',
      modifiedTime: '2023-04-28T08:31:39.084-05:00',
      name: 'DiorCategoryDoubleBanner1',
      firstBannersList: 'DiorBannerContainer1',
      container: 'false',
      secondBannersList: 'DiorBannerContainer2',
      childrenComponentsList: ['DiorBannerContainer1'],
      childrenComponents: {
        DiorBannerContainer1: {
          uid: 'DiorBannerContainer1',
          typeCode: 'SimpleResponsiveBannerComponent',
          modifiedTime: '2023-04-19T13:45:01+0000',
          name: 'SimpleResponsiveBannerComponent',
          container: 'false',
          media: {
            imageType: 'GALLERY',
            format: 'mobile',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h28/hd0/8987754496030/E1_DIOR.jpg',
            width: '480'
          },
          urlLink: '/p/738J00119000783',
          childrenComponentsList: null,
          childrenComponents: {}
        }
      }
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
    Section2: [
      'DiorNewInProductCarouselComponent',
      'DiorBestSellersProductCarouselComponent',
      'DiorSimpleBannerComponent3',
      'DiorSimpleBannerComponent4',
      'DiorSimpleBannerComponent5'
    ],
    Section1: [
      'DiorSimpleBannerComponent1',
      'DePratiDiorRotatingImagesComponent',
      'DiorCategoryFeatureCarousel1',
      'DiorCategoryDoubleBanner1'
    ],
    SiteLogo: ['SiteLogoComponent'],
    SearchBox: [],
    NavigationBar: [],
    TopHeaderSlot: []
  }
};
