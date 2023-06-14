import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from 'react';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  CartData,
  useLazyGetShoppingCartRequest
} from '../../../../infrastucture/apis/shopping-cart';

export const useDataCart = (code: string): CartData => {
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const [
    getShoppingCart,
    { data: shoppingCart, isLoading: isLoadingShoppingCart }
  ] = useLazyGetShoppingCartRequest();

  useLayoutEffect(() => {
    if (code && username) {
      getShoppingCart({ username: username });
    }
  }, [code, username]);

  const dataCart: CartData = useMemo(() => {
    if (shoppingCart?.code) {
      return {
        code: shoppingCart.code,
        products: shoppingCart.entries,
        detailOrder: {
          productsTotalValue: shoppingCart.totalPrice.formattedValue ?? '',
          subTotal: shoppingCart.subTotal.formattedValue ?? '',
          iva12: shoppingCart.totalTax.formattedValue ?? '',
          discount: shoppingCart.totalDiscounts.formattedValue ?? '',
          totalOrder: shoppingCart.totalPriceWithTax.formattedValue ?? '',
          totalUnit:
            shoppingCart.totalUnitCount ?? shoppingCart.entries?.length,
          sellWithTaxes: shoppingCart?.sellWithTaxes?.formattedValue ?? '',
          sellWithoutTaxes: shoppingCart?.sellWithoutTaxes?.formattedValue ?? ''
        },
        totalPriceWithTax: shoppingCart.totalPriceWithTax.value ?? 0
      };
    }

    return {
      code: code
    };
  }, [shoppingCart, isLoadingShoppingCart]);

  return dataCart;
};
