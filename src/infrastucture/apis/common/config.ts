import Base64 from 'react-native-base64';
import { Platform } from 'react-native';
import Config from '../../../application/common/dotEnv';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

export const API_V1 = '/api/v1';
export const API_VERSION_HYBRIS = Config.API_URL_ECCOMMERCE;
export const API_VERSION_CMS_HYBRIS = `${API_VERSION_HYBRIS}/cms`;

export const ApiConfig = {
  sapUrl: Config.API_URL_SAP,
  hybrisUrl: Config.API_URL_HYBRIS,
  staticHeaders: {
    Authorization: Platform.select({
      ios:
        'Basic ' +
        Base64.encode(
          `${Config.HYBRIS_CLIENT_ID_IOS}:${Config.HYBRIS_CLIENT_SECRET}`
        ),
      android:
        'Basic ' +
        Base64.encode(
          `${Config.HYBRIS_CLIENT_ID_ANDROID}:${Config.HYBRIS_CLIENT_SECRET}`
        )
    })
  },
  endpoints: {
    user: {
      newUser: `${Config.API_URL_ECCOMMERCE}/users/`,
      forgottenpassword: (email: string) =>
        `${Config.API_URL_ECCOMMERCE}/forgottenpasswordtokens?userId=${email}`
    },
    countriesAndOthers: {
      countries: `${Config.API_URL_ECCOMMERCE}/countries`,
      regions: `${Config.API_URL_ECCOMMERCE}/regions`,
      cities: (region: string) =>
        `${Config.API_URL_ECCOMMERCE}/regions?fields=DEFAULT&parentRegionCode=${region}`
    },
    healthCheck: {
      verifySiteEnabled: `${Config.API_URL_ECCOMMERCE}/healthCheck?verifySiteEnabled=false`
    },
    auth: {
      token: '/authorizationserver/oauth/token',
      social: '/depraticommercewebservices/v2/deprati/social-login/token'
    },
    delivery: {
      thirdParty: {
        getProvinces: `${API_VERSION_HYBRIS}/thirdParty/getProvinces`,
        getCities: `${API_VERSION_HYBRIS}/thirdParty/getCities`,
        getThirdPartyAgenciesList: `${API_VERSION_HYBRIS}/thirdParty/getThirdPartyAgenciesList`,
        selectThirdPartyAgency: (cartId: string, posCode: string) =>
          `${API_VERSION_HYBRIS}/thirdParty/${cartId}/selectThirdPartyAgency?posCode=${posCode}`,
        updateThirdPartyAgency: (cartId: string) =>
          `${API_VERSION_HYBRIS}/thirdParty/${cartId}/selectThirdPartyAgency`
      },
      address: {
        setDeliveryAddress: (
          username: string,
          cartId: string,
          addressId: string
        ) =>
          `${API_VERSION_HYBRIS}/users/${username}/carts/${cartId}/addresses/delivery?addressId=${addressId}`,
        getDeliveryTimes: (username: string, cartId: string) =>
          `${API_VERSION_HYBRIS}/users/${username}/carts/${cartId}/deliveryTimes`,
        setDeliveryMode: (
          username: string,
          cartId: string,
          deliveryModeId: string
        ) =>
          `${API_VERSION_HYBRIS}/users/${username}/carts/${cartId}/deliverymode?deliveryModeId=${deliveryModeId}`
      },
      deliveryOptions: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/deliveryOptions?fields=FULL`,
      deliveryRemove: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/deliverymode`,
      addressRemoveCart: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/addresses/remove`
    },
    address: {
      addressDelivery: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/addresses?fields=FULL`,
      updateAddressDelivery: (username: string, id: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/addresses/${id}`,
      defaultAddressDelivery: (username: string, id: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/addresses/${id}/setDefault`,
      addressPayment: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/addresses/payment?fields=FULL`,
      updateAddresspayment: (username: string, id: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/addresses/${id}/payment`
    },
    notifications: {
      list: `${API_V1}/Notifications/List`,
      detail: `${API_V1}/Notifications/Detail`,
      delete: `${API_V1}/Notifications/DeleteById`
    },
    findedStores: `${API_V1}/Store`,
    preRelatedAccount: `${API_V1}/CreditAccountBonding`,
    product: {
      review: (productCode: string) =>
        `${API_VERSION_HYBRIS}/products/${productCode}/reviews`,
      product: (productCode: string) =>
        `${API_VERSION_HYBRIS}/products/${productCode}`,
      search: `${API_VERSION_HYBRIS}/products/search`,
      productNearbyStore: `${API_V1}/products/Article`
    },
    page: {
      page: `${API_VERSION_CMS_HYBRIS}/pages`,
      components: `${API_VERSION_CMS_HYBRIS}/components`
    },
    quotasRequest: {
      quotaConsultation: `${API_V1}/InstallmentsCalculation/Calculate`,
      quotasList: `${API_V1}/Installments/list`
    },
    creditLimit: {
      current: `${API_V1}/Quota/CurrentQuota`,
      increase: `${API_V1}/Quota/IncreaseQuotaRequest`
    },
    creditCertificate: {
      dcCertificate: `${API_V1}/DCCertificate`
    },
    creditStatus: {
      dcStateCredit: `${API_V1}/DCCreditState`
    },
    // creditStatus: {
    //   dcStateCredit: `${API_V1}/DCStateCredit`,
    // },
    mail: {
      checkMail: `${API_V1}/Email`
    },
    accountBalance: {
      identification: `${API_V1}/ConsultaSaldo/PorIdentificacion`,
      accountNumber: `${API_V1}/ConsultaSaldo/PorNumeroCuenta`
    },
    creditExpirationDate: {
      currentDate: `${API_V1}/ExpirationDate/Query`,
      changeDate: `${API_V1}/ExpirationDate/Request`
    },
    precancellation: {
      getTotalsPayment: `${API_V1}/Precancellation/GetTotalsPayment`,
      getDeferredPendings: `${API_V1}/Precancellation/GetDeferredPendings`,
      registerSelectedTicket: `${API_V1}/Precancellation/RegisterSelectedTicket`,
      confirmSelectedTickets: `${API_V1}/Precancellation/ConfirmSelectedTickets`
    },
    article: {
      article: `${API_V1}/Article`
    },
    directCreditAccount: {
      creditAccount: `${API_V1}/DirectCreditAccount`
    },
    appBackend: {
      services: `${API_V1}/AppBackend/Services`,
      content: `${API_V1}/AppBackend/Content`,
      messagesApp: `${API_V1}/AppBackend/Messages`
    },
    dcCard: {
      blockCard: `${API_V1}/DCCard/BlockCard`,
      blockReason: `${API_V1}/DCCard/BlockReason`
    },
    accountMovements: {
      movements: `${API_V1}/AccountMovements`,
      period: `${API_V1}/AccountMovements/Period`
    },
    contactlessPayment: {
      ticket: `${API_V1}/ContactlessPayment/Ticket`,
      tickets: `${API_V1}/ContactlessPayment/Tickets`,
      ticketById: `${API_V1}/ContactlessPayment/TicketById`,
      cancelPurchase: `${API_V1}/ContactlessPayment/CancelPurchase`,
      confirmPurchase: `${API_V1}/ContactlessPayment/ConfirmPurchase`,
      registeToken: `${API_V1}/ContactlessPayment/Register/Token`
    },
    customerOrders: {
      orders: (username: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/orders?fields=FULL`,
      orderDetails: (username: string, orderCode: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/orders/${orderCode}?fields=FULL`,
      productReview: (productId: string) =>
        `${Config.API_URL_ECCOMMERCE}/products/${productId}/reviews`
    },
    creditAccountBonding: {
      contactlesspayment: `/contactlesspayment`,
      getCreditAccountBonding: `${API_V1}/DirectCreditAccount`,
      accountVinculation: `${API_V1}/CreditAccountBonding`,
      unlinkCreditAccountBonding: `${API_V1}/CreditAccountBonding/UnlinkAccount`,
      linkedCreditAccountBonding: `${API_V1}/CreditAccountBonding/linkedAccount`,
      resendCode: `${API_V1}/CreditAccountBonding/ResendCode`,
      summary: `${API_V1}/CreditAccountBonding/Summary`
    },
    customerWishlist: {
      // wishlist: `${Config.API_URL_ECCOMMERCE}/users/`,
      wishlist: (userName: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${userName}/wishlist?fields=FULL`,
      wishlistEntry: (userName: string, productCode: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${userName}/wishlist?productCode=${productCode}`
    },
    pickupStore: {
      pointOfService: `${Config.API_URL_ECCOMMERCE}/pointOfService?fields=FULL`,
      selectPointOfService: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/pointOfService`
    },
    shoppingCart: {
      shoppingCart: (username: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts?fields=FULL`,
      getShoppingCart: (username: string, cartId?: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts${
          cartId ? '/' + cartId : ''
        }?fields=FULL`,
      createShoppingCart: (username: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts`,
      addToShoppingCart: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/entries`,
      mergeShoppingCarts: (
        username: string,
        oldCartId: string,
        toMergeCartGuid: string
      ) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts?oldCartId=${oldCartId}&toMergeCartGuid=${toMergeCartGuid}`,
      entryInShoppingCart: (
        username: string,
        cartId: string,
        entryNumber: string
      ) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/entries/${entryNumber}`,
      pickUpShoppingCart: (
        username: string,
        cartId: string,
        entryNumber: string,
        enablePickUp: boolean
      ) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/entries/${entryNumber}/pickup?pickup=${enablePickUp}`,
      giftPackingShoppingCart: (
        username: string,
        cartId: string,
        entryNumber: string,
        enableGiftPacking: boolean
      ) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/entries/${entryNumber}/giftPacking?giftPacking=${enableGiftPacking}`,
      coupon: {
        addCoupon: (username: string, cartId: string, voucherId: string) =>
          `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/vouchers?voucherId=${voucherId}`,
        removeCoupon: (username: string, cartId: string, voucherId: string) =>
          `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/vouchers/${voucherId}`
      }
    },
    paymentMethod: {
      getCashPayment: `${API_VERSION_CMS_HYBRIS}/components?fields=FULL&componentIds=DepratiPaymentMethodTextNetBankingComponent`,
      setCashPayment: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/select`,
      setPaymentAddress: (
        username: string,
        cartId: string,
        addressId: string
      ) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/addresses/payment?addressId=${addressId}`
    },
    payment: {
      paymentMethods: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/paymentmethods?fields=FULL`,
      selectPaymentMethod: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/select`,
      paymentez: `${Config.API_URL_ECCOMMERCE}/paymentez?fields=FULL`,
      paymentezOTPValidation: `${Config.API_URL_ECCOMMERCE}/paymentez/otpvalidation?fields=DEFAULT`,
      deletePaymentez: (cardId: string) =>
        `${Config.API_URL_ECCOMMERCE}/paymentez/${cardId}`,
      setDefaultBankCard: (cardId: string) =>
        `${Config.API_URL_ECCOMMERCE}/paymentez/setDefaultCard?cardId=${cardId}`,
      paymentMethodsGiftCard: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/select`,
      paymentezOTPVerify: (otpCode: string, orderCode: string) =>
        `${Config.API_URL_ECCOMMERCE}/paymentez/verify/paymentezPlaceOrder?otpCode=${otpCode}&orderCode=${orderCode}&fields=FULL`,
      paymentRemove: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/remove`,
      directCreditBalanceCustomer: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/directCreditBalanceCustomer?fields=FULL`
    },
    order: {
      paymentez: (username: string, cartId: string, cvc: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/orders?cartId=${cartId}&securityCode=${cvc}&fields=FULL`,
      paymentezByDiner: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/paymentez?fields=FULL`
    },
    directCredit: {
      directCredit: `${Config.API_URL_ECCOMMERCE}/directcredit`
    },
    placeOrder: {
      bankPayment: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/bankPayment?fields=FULL`,
      directCreditToken: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/directCredit/token`,
      directCreditAuthorize: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/directCredit?fields=FULL`,
      giftCardToken: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/giftCard/token`,
      giftCardAuthorize: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/giftCard?fields=FULL`,
      cashInDelivery: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/placeOrder/cashInDelivery?fields=FULL`
    },
    expressBuy: {
      balanceInquiryCheckOut: `${API_V1}/BalanceInquiryCheckOut`,
      showExpressBuyButton: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/showExpressBuyButtonWithoutRecalculation`,
      directCreditBalance: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/directCreditBalance?fields=FULL`,
      selectExpressDirectCredit: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/selectExpressDirectCredit`,
      refreshExpressBuyCart: (username: string, cartId: string) =>
        `${Config.API_URL_ECCOMMERCE}/users/${username}/carts/${cartId}/payment/refreshExpressBuyCart`
    },
    changePassword: {
      updatePassword: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/password`
    },
    myReturns: {
      getListMyReturns: (
        username: string,
        { currentPage = 0, pageSize = 1000 }
      ) =>
        `${API_VERSION_HYBRIS}/users/${username}/returns?fields=FULL&currentPage=${currentPage}&pageSize=${pageSize}`,
      getReturnableOrders: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/returns/returnableorders?fields=FULL`,
      getSearchOrder: (username: string, orderCode: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/returns/search?orderCode=${orderCode}&fields=FULL`,
      getDetailReturn: (username: string, returnCode: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/returns/${returnCode}?fields=FULL`,
      setEnterReturn: (username: string, orderCode: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/orders/${orderCode}/returns`
    },
    supportTickets: {
      tickets: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets?fields=FULL`,
      detail: (username: string, ticketId: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets/${ticketId}?fields=FULL`,
      orders: (username: string, { currentPage = 0, pageSize = 10 }) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets/orders?fields=FULL&currentPage=${currentPage}&pageSize=${pageSize}`,
      categories: (username: string, { currentPage = 0, pageSize = 100 }) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets/categories?fields=FULL&currentPage=${currentPage}&pageSize=${pageSize}`,
      find: (username: string, orderCode: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets/search?orderCode=${orderCode}&fields=FULL`,
      /** @description Use to create and update SupportTickets */
      ticket: (username: string) =>
        `${API_VERSION_HYBRIS}/users/${username}/supportTickets`
    }
  }
};

export type RequestRawResult<T> = {
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
};
