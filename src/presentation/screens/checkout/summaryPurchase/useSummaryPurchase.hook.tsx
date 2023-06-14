import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  Entry,
  useLazyGetShoppingCartRequest
} from '../../../../infrastucture/apis/shopping-cart';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';

import {
  BasicAddress,
  PaymentInfo
} from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import { NAV } from '../../../../application/common';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../application/state-manager';
import {
  isGiftCardCartShoppingCart,
  setCartInfo,
  setPreviousScreen,
  setShowLoadingScreen,
  setStackSummary
} from '../../../../application/state-manager/services/checkout';
import { CheckoutSteps } from '../../../navigation/checkout';

export const useSummaryPurchase = (): InfoHook => {
  const dispatch = useAppDispatch();
  const focused = useIsFocused();
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);
  const [checkSummary, setCheckSummary] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [addressBilling, hasAddressBilling] = useState<boolean>(true);
  const {
    params: { dataCart, enableContinueButton, setTitleContinueButton }
  } = route;

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const loadCart = async (cartId: string, username: string) => {
    dispatch(setShowLoadingScreen(true));
    try {
      const { data: _cartData, error: cartError } = await getShoppingCart({
        cartId: cartId,
        username: username
      });
      _cartData && dispatch(setCartInfo(_cartData));
    } catch (error) {}
    dispatch(setShowLoadingScreen(false));
  };

  useEffect(() => {
    if (dataCart.code && username) {
      loadCart(dataCart.code, username);
    }
  }, [dataCart.code, username, focused]);

  const [
    getShoppingCart,
    {
      data: shoppingCart,
      isLoading: isLoadingShoppingCart,
      isSuccess: isSuccessShoppingCart
    }
  ] = useLazyGetShoppingCartRequest();

  const deliveryMode = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      return shoppingCart?.deliveryMode?.code;
    }
    return '';
  }, [shoppingCart?.deliveryMode?.code, isLoadingShoppingCart]);

  const appliedProductPromotions = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      return shoppingCart?.appliedProductPromotions ?? [];
    }
    return [];
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const deliveryAddressSelect = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      if (shoppingCart?.deliveryAddress?.id) {
        return shoppingCart.deliveryAddress;
      }
    }
    return {};
  }, [deliveryMode, shoppingCart, isLoadingShoppingCart]);

  const pickupAddress = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      try {
        if (shoppingCart?.pickupOrderGroups?.length > 0) {
          const [dataPickup] = shoppingCart?.pickupOrderGroups;
          return {
            ...dataPickup?.deliveryPointOfService,
            pickupRetireId: shoppingCart?.pickupRetireId,
            pickupRetireName: shoppingCart?.pickupRetireName
          };
        }
      } catch (error) {}
    }
    return {};
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const paymentInfo: PaymentInfo = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      if (shoppingCart?.paymentInfo?.paymentMode) {
        return shoppingCart?.paymentInfo;
      }
    }
    return {};
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const paymentAddress: BasicAddress = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      if (shoppingCart?.paymentAddress) {
        return shoppingCart?.paymentAddress;
      }
    }
    return {};
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const addressCart = useMemo(() => {
    if (paymentInfo?.billingAddress?.id) {
      return paymentInfo?.billingAddress;
    }

    return {};
  }, [paymentInfo?.billingAddress]);

  const itemsCart: Entry[] = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      if (shoppingCart?.entries?.length > 0) {
        return shoppingCart?.entries;
      }
    }

    return [];
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const totalWeight = useMemo(() => {
    if (!isLoadingShoppingCart && isSuccessShoppingCart) {
      return shoppingCart?.totalWeight ?? 0;
    }

    return [];
  }, [isLoadingShoppingCart, isSuccessShoppingCart, shoppingCart]);

  const goBackDeveliveryAddress = () => {
    const stackNavigation = navigation.getState();
    const { index: current, routes } = stackNavigation;
    const navDelivery = routes?.filter(page => page.name === NAV.DELIVERY);
    if (navDelivery.length > 0) {
      const navLast = navDelivery?.pop() ?? {};
      dispatch(setPreviousScreen(CheckoutSteps.PurchaseConfirmation));
      dispatch(setStackSummary([...routes]));
      navigation.navigate(NAV.DELIVERY, {
        ...(navLast?.params ?? {})
      });
    } else if (navDelivery.length === 0) {
      navigation.replace(NAV.DELIVERY, {
        ...route.params
      });
    }
  };

  useEffect(() => {
    enableContinueButton(checkSummary && addressBilling);
    return () => {
      enableContinueButton(false);
    };
  }, [checkSummary, addressBilling]);

  useLayoutEffect(() => {
    if (focused) setTitleContinueButton('FINALIZAR COMPRA');
    return () => setTitleContinueButton('CONTINUAR COMPRA');
  }, [focused]);

  return {
    checkSummary,
    setCheckSummary,
    deliveryAddressSelect,
    goBackDeveliveryAddress,
    deliveryMode,
    pickupAddress,
    addressCart,
    paymentInfo,
    paymentAddress,
    itemsCart,
    totalWeight,
    appliedProductPromotions,
    isGiftCardCart,
    hasAddressBilling,
    addressBilling
  };
};

export interface InfoHook<T> {
  checkSummary: boolean;
  setCheckSummary: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryAddressSelect: T;
  goBackDeveliveryAddress: () => void;
  deliveryMode: string;
  pickupAddress: T;
  addressCart: T;
  paymentInfo: PaymentInfo;
  paymentAddress: BasicAddress;
  itemsCart: Entry[];
  totalWeight: number | string;
  isGiftCardCart: boolean;
  hasAddressBilling: React.Dispatch<React.SetStateAction<boolean>>;
  addressBilling: boolean;
}
