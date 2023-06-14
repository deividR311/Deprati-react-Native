export var mockhookApi = [
  jest.fn().mockResolvedValue(),
  {
    data: {
      data: {}
    },
    isLoading: false,
    isSuccess: true,
    isError: false,
    reset: jest.fn()
  }
];

jest.mock('../src/infrastucture/apis/user/user.api', () => ({
  useForgottenpasswordRequest: () => [
    jest.fn().mockResolvedValue({ data: true })
  ],
  useGetLazyInfoUserRequest: () => [
    jest.fn().mockResolvedValue({ data: true })
  ],
  useGetInfoUserRequest: () => [jest.fn().mockResolvedValue({ data: true })],
  useUpdateProfileRequest: () => [jest.fn().mockResolvedValue({ data: true })],
  useNewUserRequest: () => [jest.fn().mockResolvedValue({ data: true })]
}));

jest.mock('../src/infrastucture/apis/contentPage/contentPage.hook.ts', () => {
  const mockFn = jest.fn().mockReturnValue({
    loading: false,
    pageContent: {},
    getDataContent: jest.fn(),
    error: false
  });
  return {
    __esModule: true,
    default: mockFn,
    usePageContent: mockFn
  };
});

jest.mock('../src/infrastucture/apis/wishlist/wishlist.api', () => ({
  useLazyCustomerWishlistRequest: () => mockhookApi,
  useAddWishlistMutationRequest: () => mockhookApi,
  useRemoveWishlistMutationRequest: () => mockhookApi
}));

jest.mock('../src/infrastucture/apis/product/product.api.tsx', () => ({
  useReviewMutationRequest: () => mockhookApi,
  useProductMutationRequest: () => mockhookApi,
  useSearchMutationRequest: () => mockhookApi,
  useGetProductsRequest: () => mockhookApi
}));

jest.mock(
  '../src/infrastucture/apis/customer-orders/customer-orders.api',
  () => ({
    useLazyCustomerOrdersRequest: () => mockhookApi,
    useOrderDetailsRequest: () => mockhookApi,
    useOrderProductReviewRequest: () => mockhookApi
  })
);

jest.mock('../src/infrastucture/apis/contactless-payment', () => ({
  useContactlessTicketByIdRequest: () => mockhookApi,
  useContactlessTicketRequest: () => mockhookApi,
  useContactlessTicketsRequest: () => mockhookApi,
  useContactlessPurchaseConfirmRequest: () => mockhookApi,
  useContactlessPurchaseCancelRequest: () => mockhookApi,
  useRegisteTokenTicketRequest: () => mockhookApi
}));

jest.mock('../src/infrastucture/apis/customer-orders', () => ({
  useLazyCustomerOrdersRequest: () => mockhookApi,
  useOrderDetailsRequest: () => mockhookApi,
  useOrderProductReviewRequest: () => mockhookApi
}));

jest.mock('../src/infrastucture/apis/delivery-address', () => ({
  useLazyGetDeliveryTimesQuery: () => mockhookApi,
  useSetDeliveryAddressMutation: () => mockhookApi,
  useSetDeliveryModeMutation: () => mockhookApi,
  useAddressRemoveCartRequest: () => mockhookApi,
  useDeliveryOptionsRequest: () => mockhookApi
}));

jest.mock('../src/infrastucture/apis/shopping-cart/shopping-cart.api', () => ({
  useLazyGetDeliveryTimesQuery: () => mockhookApi,
  useLazyGetShoppingCartRequest: () => mockhookApi,
  useGetShoppingCartRequest: () => mockhookApi,
  useCreateShoppingCartRequest: () => mockhookApi,
  useAddToShoppingCartRequest: () => mockhookApi,
  useUpdateShoppingCartRequest: () => mockhookApi,
  useDeleteShoppingCartRequest: () => mockhookApi,
  useAddCouponRequest: () => mockhookApi,
  useRemoveCouponRequest: () => mockhookApi,
  useGifPackageShoppingCartRequest: () => mockhookApi,
  usePickUpShoppingCartRequest: () => mockhookApi
}));

jest.mock(
  '../src/infrastucture/apis/delivery-thirdparty/delivery-thirdparty.api',
  () => ({
    useGetProvincesMutation: () => mockhookApi,
    useGetCitiesMutation: () => mockhookApi,
    useGetThirdPartyAgenciesListMutation: () => mockhookApi,
    useSelectThirdPartyAgencyMutation: () => mockhookApi,
    useUpdateThirdPartyAgencyMutation: () => mockhookApi
  })
);

jest.mock('../src/infrastucture/apis/creditStatus/creditStatus.tsx', () => ({
  useDcStateCreditMutationrquest: () => mockhookApi
}));
jest.mock('../src/infrastucture/apis/checkMail/checkMail.tsx', () => ({
  useCheckMailMutationRequest: () => mockhookApi
}));
// jest.mock(
//   '../src/infrastucture/apis/contentService/contentService.api.tsx',
//   () => ({
//     useContentServiceMutation: () => mockhookApi,
//   }),
// )
jest.mock(
  '../src/infrastucture/apis/creditMovement/credit-movement.api.tsx',
  () => ({
    useAccountMovementsMutationRequest: () => mockhookApi,
    useAccountMovementsPeriodsRequest: () => [
      jest.fn().mockResolvedValue(),
      {
        movementPeriods: {
          data: {}
        },
        isLoading: false,
        isSuccess: true,
        isError: false
      }
    ]
  })
);
jest.mock('../src/infrastucture/apis/myReturns/returns.api.tsx', () => ({
  useCheckMailMutationRequest: () => mockhookApi,
  useLazyReturnsListRequest: () => mockhookApi,
  useLazyReturnableOrdersRequest: () => mockhookApi,
  useLazySearchReturnsOrdersRequest: () => mockhookApi,
  useLazyDetailReturnRequest: () => mockhookApi,
  useEnterReturnRequest: () => mockhookApi
}));

jest.mock('../src/presentation/screens/Splash/hooks/useSplash.hook', () => ({
  useSplash: jest.fn().mockReturnValue({
    hasError: false
  })
}));
