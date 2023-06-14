import { ApiConfig } from '../../../../src/infrastucture/apis/common/config';

const { endpoints } = ApiConfig;

describe('config test', () => {
  it(' config user api endpoint', () => {
    let url = 'undefined/forgottenpasswordtokens?userId=email';

    expect(endpoints.user.forgottenpassword('email')).not.toBeNull();
    expect(endpoints.user.forgottenpassword('email')).toEqual(url);
  });

  it(' config cities api endpoint', () => {
    let url = 'undefined/regions?fields=DEFAULT&parentRegionCode=test';

    expect(endpoints.countriesAndOthers.cities('test')).not.toBeNull();
    expect(endpoints.countriesAndOthers.cities('test')).toEqual(url);
  });

  it(' config selectThirdPartyAgency api endpoint', () => {
    let url =
      'undefined/thirdParty/cartId/selectThirdPartyAgency?posCode=posCode';

    expect(
      endpoints.delivery.thirdParty.selectThirdPartyAgency('cartId', 'posCode')
    ).not.toBeNull();
    expect(
      endpoints.delivery.thirdParty.selectThirdPartyAgency('cartId', 'posCode')
    ).toEqual(url);
  });

  it(' config updateThirdPartyAgency api endpoint', () => {
    let url = 'undefined/thirdParty/cartId/selectThirdPartyAgency';

    expect(
      endpoints.delivery.thirdParty.updateThirdPartyAgency('cartId')
    ).not.toBeNull();
    expect(
      endpoints.delivery.thirdParty.updateThirdPartyAgency('cartId')
    ).toEqual(url);
  });

  it(' config setDeliveryAddress api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/addresses/delivery?addressId=addressId';

    expect(
      endpoints.delivery.address.setDeliveryAddress(
        'username',
        'cartId',
        'addressId'
      )
    ).not.toBeNull();
    expect(
      endpoints.delivery.address.setDeliveryAddress(
        'username',
        'cartId',
        'addressId'
      )
    ).toEqual(url);
  });

  it(' config getDeliveryTimes api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/deliveryTimes';

    expect(
      endpoints.delivery.address.getDeliveryTimes('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.delivery.address.getDeliveryTimes('username', 'cartId')
    ).toEqual(url);
  });

  it(' config setDeliveryMode api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/deliverymode?deliveryModeId=deliveryModeId';

    expect(
      endpoints.delivery.address.setDeliveryMode(
        'username',
        'cartId',
        'deliveryModeId'
      )
    ).not.toBeNull();
    expect(
      endpoints.delivery.address.setDeliveryMode(
        'username',
        'cartId',
        'deliveryModeId'
      )
    ).toEqual(url);
  });

  it(' config deliveryOptions api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/deliveryOptions?fields=FULL';

    expect(
      endpoints.delivery.deliveryOptions('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.delivery.deliveryOptions('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config deliveryRemove api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/deliverymode';

    expect(
      endpoints.delivery.deliveryRemove('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.delivery.deliveryRemove('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config addressRemoveCart api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/addresses/remove';

    expect(
      endpoints.delivery.addressRemoveCart('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.delivery.addressRemoveCart('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config updateAddressDelivery api endpoint', () => {
    let url = 'undefined/users/username/addresses/id';

    expect(
      endpoints.address.updateAddressDelivery('username', 'id')
    ).not.toBeNull();
    expect(endpoints.address.updateAddressDelivery('username', 'id')).toEqual(
      url
    );
  });

  it(' config defaultAddressDelivery api endpoint', () => {
    let url = 'undefined/users/username/addresses/id/setDefault';

    expect(
      endpoints.address.defaultAddressDelivery('username', 'id')
    ).not.toBeNull();
    expect(endpoints.address.defaultAddressDelivery('username', 'id')).toEqual(
      url
    );
  });

  it(' config addressPayment api endpoint', () => {
    let url = 'undefined/users/username/addresses/payment?fields=FULL';

    expect(endpoints.address.addressPayment('username')).not.toBeNull();
    expect(endpoints.address.addressPayment('username')).toEqual(url);
  });

  it(' config updateAddresspayment api endpoint', () => {
    let url = 'undefined/users/username/addresses/id/payment';

    expect(
      endpoints.address.updateAddresspayment('username', 'id')
    ).not.toBeNull();
    expect(endpoints.address.updateAddresspayment('username', 'id')).toEqual(
      url
    );
  });

  it(' config review api endpoint', () => {
    let url = 'undefined/products/productCode/reviews';

    expect(endpoints.product.review('productCode')).not.toBeNull();
    expect(endpoints.product.review('productCode')).toEqual(url);
  });

  it(' config product api endpoint', () => {
    let url = 'undefined/products/productCode';

    expect(endpoints.product.product('productCode')).not.toBeNull();
    expect(endpoints.product.product('productCode')).toEqual(url);
  });

  it(' config customerOrders api endpoint', () => {
    let url = 'undefined/users/username/orders?fields=FULL';

    expect(endpoints.customerOrders.orders('username')).not.toBeNull();
    expect(endpoints.customerOrders.orders('username')).toEqual(url);
  });

  it(' config orderDetails api endpoint', () => {
    let url = 'undefined/users/username/orders/orderCode?fields=FULL';

    expect(
      endpoints.customerOrders.orderDetails('username', 'orderCode')
    ).not.toBeNull();
    expect(
      endpoints.customerOrders.orderDetails('username', 'orderCode')
    ).toEqual(url);
  });

  it(' config productReview api endpoint', () => {
    let url = 'undefined/products/productId/reviews';

    expect(endpoints.customerOrders.productReview('productId')).not.toBeNull();
    expect(endpoints.customerOrders.productReview('productId')).toEqual(url);
  });

  it(' config customerWishlist api endpoint', () => {
    let url = 'undefined/users/userName/wishlist?fields=FULL';

    expect(endpoints.customerWishlist.wishlist('userName')).not.toBeNull();
    expect(endpoints.customerWishlist.wishlist('userName')).toEqual(url);
  });

  it(' config wishlistEntry api endpoint', () => {
    let url = 'undefined/users/userName/wishlist?productCode=productCode';

    expect(
      endpoints.customerWishlist.wishlistEntry('userName', 'productCode')
    ).not.toBeNull();
    expect(
      endpoints.customerWishlist.wishlistEntry('userName', 'productCode')
    ).toEqual(url);
  });

  it(' config pickupStore api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/pointOfService';

    expect(
      endpoints.pickupStore.selectPointOfService('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.pickupStore.selectPointOfService('username', 'cartId')
    ).toEqual(url);
  });

  it(' config shoppingCart api endpoint', () => {
    let url = 'undefined/users/username/carts?fields=FULL';

    expect(endpoints.shoppingCart.shoppingCart('username')).not.toBeNull();
    expect(endpoints.shoppingCart.shoppingCart('username')).toEqual(url);
  });

  it(' config getShoppingCart api endpoint', () => {
    let url = `undefined/users/username/carts/cartId?fields=FULL`;

    expect(
      endpoints.shoppingCart.getShoppingCart('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.getShoppingCart('username', 'cartId')
    ).toEqual(url);
  });

  it(' config createShoppingCart api endpoint', () => {
    let url = 'undefined/users/username/carts';

    expect(
      endpoints.shoppingCart.createShoppingCart('username')
    ).not.toBeNull();
    expect(endpoints.shoppingCart.createShoppingCart('username')).toEqual(url);
  });

  it(' config addToShoppingCart api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/entries';

    expect(
      endpoints.shoppingCart.addToShoppingCart('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.addToShoppingCart('username', 'cartId')
    ).toEqual(url);
  });

  it(' config mergeShoppingCarts api endpoint', () => {
    let url =
      'undefined/users/username/carts?oldCartId=oldCartId&toMergeCartGuid=toMergeCartGuid';

    expect(
      endpoints.shoppingCart.mergeShoppingCarts(
        'username',
        'oldCartId',
        'toMergeCartGuid'
      )
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.mergeShoppingCarts(
        'username',
        'oldCartId',
        'toMergeCartGuid'
      )
    ).toEqual(url);
  });

  it(' config entryInShoppingCart api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/entries/entryNumber';

    expect(
      endpoints.shoppingCart.entryInShoppingCart(
        'username',
        'cartId',
        'entryNumber'
      )
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.entryInShoppingCart(
        'username',
        'cartId',
        'entryNumber'
      )
    ).toEqual(url);
  });

  it(' config pickUpShoppingCart api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/entries/entryNumber/pickup?pickup=true';

    expect(
      endpoints.shoppingCart.pickUpShoppingCart(
        'username',
        'cartId',
        'entryNumber',
        true
      )
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.pickUpShoppingCart(
        'username',
        'cartId',
        'entryNumber',
        true
      )
    ).toEqual(url);
  });

  it(' config giftPackingShoppingCart api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/entries/entryNumber/giftPacking?giftPacking=true';

    expect(
      endpoints.shoppingCart.giftPackingShoppingCart(
        'username',
        'cartId',
        'entryNumber',
        true
      )
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.giftPackingShoppingCart(
        'username',
        'cartId',
        'entryNumber',
        true
      )
    ).toEqual(url);
  });

  it(' config coupon api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/vouchers?voucherId=voucherId';

    expect(
      endpoints.shoppingCart.coupon.addCoupon('username', 'cartId', 'voucherId')
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.coupon.addCoupon('username', 'cartId', 'voucherId')
    ).toEqual(url);
  });

  it(' config removeCoupon api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/vouchers/voucherId';

    expect(
      endpoints.shoppingCart.coupon.removeCoupon(
        'username',
        'cartId',
        'voucherId'
      )
    ).not.toBeNull();
    expect(
      endpoints.shoppingCart.coupon.removeCoupon(
        'username',
        'cartId',
        'voucherId'
      )
    ).toEqual(url);
  });

  it(' config setCashPayment api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/payment/select';

    expect(
      endpoints.paymentMethod.setCashPayment('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.paymentMethod.setCashPayment('username', 'cartId')
    ).toEqual(url);
  });

  it(' config setPaymentAddress api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/addresses/payment?addressId=addressId';

    expect(
      endpoints.paymentMethod.setPaymentAddress(
        'username',
        'cartId',
        'addressId'
      )
    ).not.toBeNull();
    expect(
      endpoints.paymentMethod.setPaymentAddress(
        'username',
        'cartId',
        'addressId'
      )
    ).toEqual(url);
  });

  it(' config paymentMethods api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/paymentmethods?fields=FULL';

    expect(
      endpoints.payment.paymentMethods('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.payment.paymentMethods('username', 'cartId')).toEqual(url);
  });

  it(' config selectPaymentMethod api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/payment/select';

    expect(
      endpoints.payment.selectPaymentMethod('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.payment.selectPaymentMethod('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config deletePaymentez api endpoint', () => {
    let url = 'undefined/paymentez/cardId';

    expect(endpoints.payment.deletePaymentez('cardId')).not.toBeNull();
    expect(endpoints.payment.deletePaymentez('cardId')).toEqual(url);
  });

  it(' config setDefaultBankCard api endpoint', () => {
    let url = 'undefined/paymentez/setDefaultCard?cardId=cardId';

    expect(endpoints.payment.setDefaultBankCard('cardId')).not.toBeNull();
    expect(endpoints.payment.setDefaultBankCard('cardId')).toEqual(url);
  });

  it(' config paymentMethodsGiftCard api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/payment/select';

    expect(
      endpoints.payment.paymentMethodsGiftCard('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.payment.paymentMethodsGiftCard('username', 'cartId')
    ).toEqual(url);
  });

  it(' config paymentezOTPVerify api endpoint', () => {
    let url =
      'undefined/paymentez/verify/paymentezPlaceOrder?otpCode=otpCode&orderCode=orderCode&fields=FULL';

    expect(
      endpoints.payment.paymentezOTPVerify('otpCode', 'orderCode')
    ).not.toBeNull();
    expect(
      endpoints.payment.paymentezOTPVerify('otpCode', 'orderCode')
    ).toEqual(url);
  });

  it(' config paymentRemove api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/payment/remove';

    expect(
      endpoints.payment.paymentRemove('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.payment.paymentRemove('username', 'cartId')).toEqual(url);
  });

  it(' config directCreditBalanceCustomer api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/payment/directCreditBalanceCustomer?fields=FULL';

    expect(
      endpoints.payment.directCreditBalanceCustomer('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.payment.directCreditBalanceCustomer('username', 'cartId')
    ).toEqual(url);
  });

  it(' config paymentez api endpoint', () => {
    let url =
      'undefined/users/username/orders?cartId=cartId&securityCode=cvc&fields=FULL';

    expect(
      endpoints.order.paymentez('username', 'cartId', 'cvc')
    ).not.toBeNull();
    expect(endpoints.order.paymentez('username', 'cartId', 'cvc')).toEqual(url);
  });

  it(' config paymentezByDiner api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/paymentez?fields=FULL';

    expect(
      endpoints.order.paymentezByDiner('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.order.paymentezByDiner('username', 'cartId')).toEqual(url);
  });

  it(' config bankPayment api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/bankPayment?fields=FULL';

    expect(
      endpoints.placeOrder.bankPayment('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.placeOrder.bankPayment('username', 'cartId')).toEqual(url);
  });

  it(' config directCreditToken api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/directCredit/token';

    expect(
      endpoints.placeOrder.directCreditToken('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.placeOrder.directCreditToken('username', 'cartId')
    ).toEqual(url);
  });

  it(' config directCreditAuthorize api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/directCredit?fields=FULL';

    expect(
      endpoints.placeOrder.directCreditAuthorize('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.placeOrder.directCreditAuthorize('username', 'cartId')
    ).toEqual(url);
  });

  it(' config giftCardToken api endpoint', () => {
    let url = 'undefined/users/username/carts/cartId/placeOrder/giftCard/token';

    expect(
      endpoints.placeOrder.giftCardToken('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.placeOrder.giftCardToken('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config giftCardAuthorize api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/giftCard?fields=FULL';

    expect(
      endpoints.placeOrder.giftCardAuthorize('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.placeOrder.giftCardAuthorize('username', 'cartId')
    ).toEqual(url);
  });

  it(' config cashInDelivery api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/placeOrder/cashInDelivery?fields=FULL';

    expect(
      endpoints.placeOrder.cashInDelivery('username', 'cartId')
    ).not.toBeNull();
    expect(endpoints.placeOrder.cashInDelivery('username', 'cartId')).toEqual(
      url
    );
  });

  it(' config directCreditBalance api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/payment/directCreditBalance?fields=FULL';

    expect(
      endpoints.expressBuy.directCreditBalance('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.expressBuy.directCreditBalance('username', 'cartId')
    ).toEqual(url);
  });

  it(' config selectExpressDirectCredit api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/payment/selectExpressDirectCredit';

    expect(
      endpoints.expressBuy.selectExpressDirectCredit('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.expressBuy.selectExpressDirectCredit('username', 'cartId')
    ).toEqual(url);
  });

  it(' config refreshExpressBuyCart api endpoint', () => {
    let url =
      'undefined/users/username/carts/cartId/payment/refreshExpressBuyCart';

    expect(
      endpoints.expressBuy.refreshExpressBuyCart('username', 'cartId')
    ).not.toBeNull();
    expect(
      endpoints.expressBuy.refreshExpressBuyCart('username', 'cartId')
    ).toEqual(url);
  });

  it(' config updatePassword api endpoint', () => {
    let url = 'undefined/users/username/password';

    expect(endpoints.changePassword.updatePassword('username')).not.toBeNull();
    expect(endpoints.changePassword.updatePassword('username')).toEqual(url);
  });

  it(' config getReturnableOrders api endpoint', () => {
    let url = 'undefined/users/username/returns/returnableorders?fields=FULL';

    expect(endpoints.myReturns.getReturnableOrders('username')).not.toBeNull();
    expect(endpoints.myReturns.getReturnableOrders('username')).toEqual(url);
  });

  it(' config getSearchOrder api endpoint', () => {
    let url =
      'undefined/users/username/returns/search?orderCode=orderCode&fields=FULL';

    expect(
      endpoints.myReturns.getSearchOrder('username', 'orderCode')
    ).not.toBeNull();
    expect(endpoints.myReturns.getSearchOrder('username', 'orderCode')).toEqual(
      url
    );
  });

  it(' config getDetailReturn api endpoint', () => {
    let url = 'undefined/users/username/returns/returnCode?fields=FULL';

    expect(
      endpoints.myReturns.getDetailReturn('username', 'returnCode')
    ).not.toBeNull();
    expect(
      endpoints.myReturns.getDetailReturn('username', 'returnCode')
    ).toEqual(url);
  });

  it(' config setEnterReturn api endpoint', () => {
    let url = 'undefined/users/username/orders/orderCode/returns';

    expect(
      endpoints.myReturns.setEnterReturn('username', 'orderCode')
    ).not.toBeNull();
    expect(endpoints.myReturns.setEnterReturn('username', 'orderCode')).toEqual(
      url
    );
  });

  it(' config find api endpoint', () => {
    let url =
      'undefined/users/username/supportTickets/search?orderCode=orderCode&fields=FULL';

    expect(
      endpoints.supportTickets.find('username', 'orderCode')
    ).not.toBeNull();
    expect(endpoints.supportTickets.find('username', 'orderCode')).toEqual(url);
  });

  it(' config ticket api endpoint', () => {
    let url = 'undefined/users/username/supportTickets';

    expect(endpoints.supportTickets.ticket('username')).not.toBeNull();
    expect(endpoints.supportTickets.ticket('username')).toEqual(url);
  });
});
