export const confirmation = {
  closeOTPConfirmation: jest.fn(),
  successOTPConfirmation: jest.fn(),
  isVisibleOTPConfirmation: false,
  otpConfirmationData: {},
  showBottomSheetDePratiCredit: true,
  showPurchaseSuccess: false,
  setShowBottomSheetDePratiCredit: jest.fn(),
  setShowPurchaseSuccess: jest.fn(),
  order: {},
  //functions DirectCreditAuthorize
  isLoadingAuthorize: false,
  isLoadingGetToken: false,
  setDirectCreditAuthorize: jest.fn(),
  getDirectCreditToken: jest.fn(),
  msgErrorCodeDePratiCredit: '',
  setMsgErrorCodeDePratiCredit: jest.fn(),

  //paymentMode
  typePaymentMethod: 'custom',
  loadingPetition: false,
  firstTimeSummary: undefined,
  changefirstTimeSummary: jest.fn()
};

export const sumaryPurchase = {
  checkSummary: false,
  setCheckSummary: ' bound dispatchAction() ',
  deliveryAddressSelect: {
    city: 'AZU-7',
    country: {
      isocode: 'EC',
      name: 'Ecuador'
    },
    defaultAddress: false,
    formattedAddress: 'Av. Loja S/N Y Av. Don Bosco, Azuay, Cuenca',
    id: '8806944374807',
    line1: 'Av. Loja S/N Y Av. Don Bosco',
    phone: '58889363',
    phonePreffix: '09',
    region: {
      countryIso: 'EC',
      isocode: 'EC-AZU',
      isocodeShort: '195',
      name: 'Azuay'
    },
    shippingAddress: false,
    town: 'Cuenca',
    visibleInAddressBook: true
  },
  goBackDeveliveryAddress: ' goBackDeveliveryAddress() ',
  deliveryMode: 'thirdParty',
  pickupAddress: {
    address: {
      city: 'AZU-7',
      country: {
        isocode: 'EC',
        name: 'Ecuador'
      },
      defaultAddress: false,
      formattedAddress: 'Av. Loja S/N Y Av. Don Bosco, Azuay, Cuenca',
      id: '8806944374807',
      line1: 'Av. Loja S/N Y Av. Don Bosco',
      phone: '09-58889363',
      phonePreffix: '09',
      region: {
        countryIso: 'EC',
        isocode: 'EC-AZU',
        isocodeShort: '195',
        name: 'Azuay'
      },
      shippingAddress: false,
      town: 'Cuenca',
      visibleInAddressBook: true
    },
    displayName: 'AV. LOJA',
    features: {},
    geoPoint: {
      latitude: -2.913551,
      longitude: -79.030823
    },
    name: '30200047-AZU-7-004',
    openingHours: {
      code: '30200047-AZU-7-004-schedule',
      specialDayOpeningList: [],
      weekDayOpeningList: [
        {
          closingTime: {
            formattedHour: '0:30',
            hour: 0,
            minute: 30
          },
          openingTime: {
            formattedHour: '8:00',
            hour: 8,
            minute: 0
          },
          closed: false,
          weekDay: 'lunes'
        },
        {
          closingTime: {
            formattedHour: '0:30',
            hour: 0,
            minute: 30
          },
          openingTime: {
            formattedHour: '8:00',
            hour: 8,
            minute: 0
          },
          closed: false,
          weekDay: 'martes'
        },
        {
          closingTime: {
            formattedHour: '0:30',
            hour: 0,
            minute: 30
          },
          openingTime: {
            formattedHour: '8:00',
            hour: 8,
            minute: 0
          },
          closed: false,
          weekDay: 'miércoles'
        },
        {
          closingTime: {
            formattedHour: '0:30',
            hour: 0,
            minute: 30
          },
          openingTime: {
            formattedHour: '8:00',
            hour: 8,
            minute: 0
          },
          closed: false,
          weekDay: 'jueves'
        },
        {
          closingTime: {
            formattedHour: '0:30',
            hour: 0,
            minute: 30
          },
          openingTime: {
            formattedHour: '8:00',
            hour: 8,
            minute: 0
          },
          closed: false,
          weekDay: 'viernes'
        },
        {
          closingTime: {
            formattedHour: '13:00',
            hour: 1,
            minute: 0
          },
          openingTime: {
            formattedHour: '9:00',
            hour: 9,
            minute: 0
          },
          closed: false,
          weekDay: 'sábado'
        },
        {
          closed: true,
          weekDay: 'dom'
        }
      ]
    },
    storeImages: []
  },
  addressCart: {},
  paymentInfo: {
    accountAdditionalNumber: '00',
    accountNumber: '703',
    defaultCard: false,
    defaultPayment: false,
    obfuscatedAccountNumber: '7X3',
    payFirstMonth: 3.07,
    paySecondMonth: 0,
    paymentMode: 'directCreditPaymentMode',
    paymentModeDisplayLine1: 'Crédito De Prati',
    periodFirstMonth: 'mayo',
    periodSecondMonth: 'junio',
    saved: false,
    selectedDeferredData: {
      deferredDescription: 'ROTATIVO',
      feeValue: 3.07,
      interestValue: 0,
      orderCode: '0'
    }
  },
  paymentAddress: {
    billingAddress: true,
    defaultAddress: false,
    email: 'eduardo.boada@softwareone.com',
    firstName: 'edd',
    formattedAddress: 'calle falsa, 123',
    id: '8821258878999',
    idNumber: '098765432',
    idType: 'PASAPORTE',
    line1: 'calle falsa',
    line2: '123',
    phone: '09808098',
    phonePreffix: '09',
    shippingAddress: false,
    streetName: 'calle falsa',
    streetNumber: '123',
    visibleInAddressBook: true
  },
  itemsCart: [
    {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$3,04',
        priceType: 'BUY',
        value: 3.04
      },
      basePriceWithTaxes: {
        currencyIso: 'USD',
        formattedValue: '$3,40',
        priceType: 'BUY',
        value: 3.4048000000000003
      },
      basePriceWithoutTaxes: {
        currencyIso: 'USD',
        formattedValue: '$30,35',
        priceType: 'BUY',
        value: 30.35
      },
      deliveryMode: {
        code: 'thirdParty'
      },
      deliveryPointOfService: {
        address: {
          city: 'AZU-7',
          country: {
            isocode: 'EC',
            name: 'Ecuador'
          },
          defaultAddress: false,
          formattedAddress: 'Av. Loja S/N Y Av. Don Bosco, Azuay, Cuenca',
          id: '8806944374807',
          line1: 'Av. Loja S/N Y Av. Don Bosco',
          phone: '09-58889363',
          phonePreffix: '09',
          region: {
            countryIso: 'EC',
            isocode: 'EC-AZU',
            isocodeShort: '195',
            name: 'Azuay'
          },
          shippingAddress: false,
          town: 'Cuenca',
          visibleInAddressBook: true
        },
        displayName: 'AV. LOJA',
        features: {},
        geoPoint: {
          latitude: -2.913551,
          longitude: -79.030823
        },
        name: '30200047-AZU-7-004',
        openingHours: {
          code: '30200047-AZU-7-004-schedule',
          specialDayOpeningList: [],
          weekDayOpeningList: [
            {
              closingTime: {
                formattedHour: '0:30',
                hour: 0,
                minute: 30
              },
              openingTime: {
                formattedHour: '8:00',
                hour: 8,
                minute: 0
              },
              closed: false,
              weekDay: 'lunes'
            },
            {
              closingTime: {
                formattedHour: '0:30',
                hour: 0,
                minute: 30
              },
              openingTime: {
                formattedHour: '8:00',
                hour: 8,
                minute: 0
              },
              closed: false,
              weekDay: 'martes'
            },
            {
              closingTime: {
                formattedHour: '0:30',
                hour: 0,
                minute: 30
              },
              openingTime: {
                formattedHour: '8:00',
                hour: 8,
                minute: 0
              },
              closed: false,
              weekDay: 'miércoles'
            },
            {
              closingTime: {
                formattedHour: '0:30',
                hour: 0,
                minute: 30
              },
              openingTime: {
                formattedHour: '8:00',
                hour: 8,
                minute: 0
              },
              closed: false,
              weekDay: 'jueves'
            },
            {
              closingTime: {
                formattedHour: '0:30',
                hour: 0,
                minute: 30
              },
              openingTime: {
                formattedHour: '8:00',
                hour: 8,
                minute: 0
              },
              closed: false,
              weekDay: 'viernes'
            },
            {
              closingTime: {
                formattedHour: '13:00',
                hour: 1,
                minute: 0
              },
              openingTime: {
                formattedHour: '9:00',
                hour: 9,
                minute: 0
              },
              closed: false,
              weekDay: 'sábado'
            },
            {
              closed: true,
              weekDay: 'dom'
            }
          ]
        },
        storeImages: []
      },
      deliveryTimeRange: '10 días laborables',
      entryNumber: 0,
      giftPacking: false,
      pickup: false,
      product: {
        acceptGiftPacking: true,
        availableForPickup: false,
        averageRating: 3,
        baseOptions: [
          {
            selected: {
              code: '116020196701239001',
              priceData: {
                currencyIso: 'USD',
                formattedValue: '$3,04',
                priceType: 'BUY',
                value: 3.04
              },
              stock: {
                stockLevel: 185,
                stockLevelStatus: 'inStock'
              },
              url: '/camisa-ho-denim/p/116020196701239001',
              variantOptionQualifiers: []
            },
            variantType: 'GenericVariantProduct'
          }
        ],
        baseProduct: '000116020196701239',
        categories: [
          {
            code: 'T8009',
            name: 'S',
            parentCategoryName: 'Talla',
            url: '/s/c/T8009'
          },
          {
            code: 'C0003088',
            name: 'Ice',
            parentCategoryName: 'Color',
            url: '/ice/c/C0003088'
          }
        ],
        code: '116020196701239001',
        deliveryModes: [
          {
            code: 'standard'
          },
          {
            code: 'pickup'
          }
        ],
        ean: '14816200',
        images: [
          {
            format: 'zoom',
            imageType: 'PRIMARY',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h6a/hbb/8867296641054/14816200-0_product_515Wx772H'
          },
          {
            format: 'product',
            imageType: 'PRIMARY',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h29/hbf/8867296772126/14816200-0_product_300Wx450H'
          },
          {
            format: 'thumbnail',
            imageType: 'PRIMARY',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h27/hc2/8867296837662/14816200-0_product_96Wx144H'
          },
          {
            format: 'cartIcon',
            imageType: 'PRIMARY',
            url: 'https://imagestg.deprati.com.ec/sys-master/images/h38/hc5/8867296903198/14816200-0_product_65Wx97H'
          }
        ],
        isGiftProduct: false,
        isPromotionSpecialPrice: false,
        ivaCondition: '12%',
        name: 'Camisa H&O denim',
        purchasable: true,
        sizeChartImage: {
          url: 'https://imagestg.deprati.com.ec/sys-master/images/ha3/hea/8837610733598/cab_hotopcamisas.jpg'
        },
        stock: {
          stockLevel: 185,
          stockLevelStatus: 'inStock'
        },
        url: '/camisa-ho-denim/p/116020196701239001'
      },
      quantity: 1,
      subtotal: {
        currencyIso: 'USD',
        formattedValue: '$30,35',
        priceType: 'BUY',
        value: 30.35
      },
      totalDiscount: {
        currencyIso: 'USD',
        formattedValue: '$27,61',
        priceType: 'BUY',
        value: 27.614
      },
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$2,74',
        priceType: 'BUY',
        value: 2.74
      },
      totalPriceWithoutTaxes: {
        currencyIso: 'USD',
        formattedValue: '$2,74',
        priceType: 'BUY',
        value: 2.736
      },
      updateable: true,
      volume: 0,
      weight: 0
    }
  ],
  totalWeight: 0.34,
  appliedProductPromotions: [
    {
      consumedEntries: [
        {
          adjustedUnitPrice: 2.74,
          orderEntryNumber: 0,
          quantity: 1
        }
      ],
      description: '10% off adicional en rebaja permanente ',
      promotion: {
        code: '12112018_ACRP_HOME_A',
        description: 'Versión 2 Hybris ',
        endDate: '10000-01-01T04:59:59+0000',
        promotionType: 'Promoción basada en regla'
      }
    },
    {
      consumedEntries: [
        {
          adjustedUnitPrice: 3.04,
          orderEntryNumber: 0,
          quantity: 1
        }
      ],
      description: 'Envío Gratis',
      promotion: {
        code: '04022021_EGT_ENVIOGRATIS_A',
        description: 'Envío Gratis excepcion bodega proveedor',
        endDate: '2024-01-01T04:59:59+0000',
        promotionType: 'Promoción basada en regla'
      }
    }
  ],
  isGiftCardCart: false,
  hasAddressBilling: ' bound dispatchAction() ',
  addressBilling: true
};
