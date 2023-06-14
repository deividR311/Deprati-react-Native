export const DataMock_CustomProps = {
  url: 'url',
  style: {},
  content: 'qwerty',
  uid: 'uid',
  typeCode: 'qwerty',
  modifiedTime: 'qwerty',
  name: 'qwerty',
  container: true,
  rotatingImagesComponentsList: 'DepratiBrandsRotatingImages',
  childrenComponentsList: ['DepratiBrandsRotatingImages'],
  childrenComponents: {
    DepratiBrandsRotatingImages: {
      uid: 'DepratiBrandsRotatingImages',
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
      ]
    }
  }
};

export const DataMock_BillingAddressComponent = {
  style: {},
  onSelected: () => {},
  emptyStyle: {},
  showTitle: true,
  enableHandleEnableButton: true,
  onIsEnable: () => {},
  paymentAddress: {
    defaultAddress: false,
    email: 'string',
    firstName: 'string',
    formattedAddress: 'string',
    id: 'string',
    line1: 'string',
    line2: 'string',
    phone: 'string',
    phonePreffix: 'string',
    shippingAddress: false,
    visibleInAddressBook: false
  },
  paymentCredit: {
    showAlerAddressPayment: false,
    setShowAlerAddressPayment: () => {}
  },
  styleSecundaryButton: false
};

export const DataMock_useBillingAddress = {
  addressSelected: {
    defaultAddress: false,
    firstName: 'firstName',
    id: 'qwertystring',
    line1: 'qwerty',
    line2: 'qwerty',
    phone: 'qwerty',
    phonePreffix: 'qwerty'
  },
  isLoadingByDeleting: false,
  addressPaymentList: {
    default: null,
    others: [],
    existsAddress: false,
    loading: false
  },
  isLoading: false,
  buttonChangeData: false,
  handleChangeData: jest.fn(),
  changeAddress: {
    handleSelected: jest.fn(),
    addressSelected: undefined
  },
  handleDelete: jest.fn(),
  handleAddEdit: jest.fn(),
  handleBillingAddressList: () => {
    return [
      {
        defaultAddress: false,
        email: 'string',
        firstName: 'string',
        formattedAddress: 'string',
        id: 'string',
        line1: 'string',
        line2: 'string',
        phone: 'string',
        phonePreffix: 'string',
        shippingAddress: false,
        visibleInAddressBook: false
      }
    ];
  }
};

export const DataMock_IncreaseCreditLimit = {
  rectangularSize: 232,
  value: 1000,
  maxValue: 2000,
  onChangeCreditLimit: jest.fn()
};

export const DataMock_Charts = {
  constentChart: {
    availableAmount: 100,
    amountSpent: 20,
    totalAmount: 200
  },
  ownerFullname: 'Custom customer customization',
  invertValues: true,
  showDisplayCard: true
};
