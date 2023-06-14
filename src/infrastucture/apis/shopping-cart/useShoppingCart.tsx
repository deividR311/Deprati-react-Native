import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useErrorDescription from '../../../application/common/hooksCommons/useErrorDescription';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { HYBRISS_API_SELECTOR } from '../common/hybriss.api';
import {
  useAddCouponRequest,
  useAddToShoppingCartRequest,
  useCreateShoppingCartRequest,
  useDeleteShoppingCartRequest,
  useRemoveCouponRequest,
  useUpdateShoppingCartRequest,
  useGifPackageShoppingCartRequest,
  usePickUpShoppingCartRequest,
  useLazyGetShoppingCartRequest
} from './shopping-cart.api';
import {
  AddToCartResponse,
  CreateShoppingCartResponse,
  UpdateToCartResponse,
  StatusCode,
  Cart
} from './types';

const TEXT_NO_STOCK =
  'Tienes un excelente gusto\nEl producto que agregaste a tus favoritos ya se terminó';

export const useShoppingCart = (): ShoppingCartRequestHook => {
  const {
    localStorageData: {
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.UserEmail]: USER_EMAIL
    }
  } = useLocalStorage();

  const cartKeyFromRedux = `getShoppingCart({"username":"${USER_EMAIL}"})`;
  const { [cartKeyFromRedux]: CartInfoFromRedux } =
    useSelector(HYBRISS_API_SELECTOR);
  const { code: CART_ID = null } = (CartInfoFromRedux as unknown as Cart) || {};

  const { handleModalErrorService } = useErrorDescription();

  const [
    getShoppingCart,
    {
      isLoading: isLoadingByGetShoppingCart,
      isFetching: isFetchingByGetShoppingCart,
      error: hasErrorByGetShoppingCart,
      isError: isErrorByGetShoppingCart,
      data: shoppingCartData
    }
  ] = useLazyGetShoppingCartRequest();

  const [
    doCreateShoppingCart,
    {
      isLoading: isLoadingByCreateShoppingCart,
      error: hasErrorByCreateShoppingCart,
      data: createShoppingCartData
    }
  ] = useCreateShoppingCartRequest();

  const [
    doAddToShoppingCart,
    {
      isLoading: isLoadingByAddToShoppingCart,
      error: hasErrorByAddToShoppingCart,
      data: addToShoppingCartData
    }
  ] = useAddToShoppingCartRequest();

  const [
    doUpdateShoppingCart,
    {
      isLoading: isLoadingByUpdateShoppingCart,
      error: hasErrorByUpdateShoppingCart,
      data: updateShoppingCartData
    }
  ] = useUpdateShoppingCartRequest();

  const [
    doTogglePickUpInStore,
    {
      isLoading: isLoadingByTogglePickUpInStore,
      isSuccess: isSuccessByTogglePickUpInStore,
      error: hasErrorTogglePickUpInStore,
      data: togglePickUpInStoreData
    }
  ] = usePickUpShoppingCartRequest();

  const [
    doToggleIsGift,
    {
      isLoading: isLoadingByToggleIsGift,
      isSuccess: isSuccessByToggleIsGift,
      error: hasErrorToggleIsGift,
      data: toggleIsGiftData
    }
  ] = useGifPackageShoppingCartRequest();

  const [
    doDeleteShoppingCart,
    {
      isLoading: isLoadingByDeleteShoppingCart,
      error: hasErrorByDeleteShoppingCart,
      data: deleteShoppingCartData
    }
  ] = useDeleteShoppingCartRequest();

  const [
    doAddCoupon,
    {
      isLoading: isLoadingByAddCoupon,
      error: hasErrorByAddCoupon,
      data: addCouponData
    }
  ] = useAddCouponRequest();

  const [
    doRemoveCoupon,
    {
      isLoading: isLoadingByRemoveCoupon,
      error: hasErrorByRemoveCoupon,
      data: removeCouponData
    }
  ] = useRemoveCouponRequest();

  const _mapErrors = (error: any): Error => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    return new Error(text || error?.message || error);
  };

  const getCart = async () => {
    const { data } = await getShoppingCart({
      username: USER_EMAIL
    });
    return data;
  };

  const createCart = () => {
    doCreateShoppingCart({
      token: TOKEN,
      username: USER_EMAIL
    });
  };

  const addToCart = async (item: { productCode: string; quantity: string }) => {
    if (CART_ID) {
      const { error: _addingToCartError } = (await doAddToShoppingCart({
        token: TOKEN,
        username: USER_EMAIL,
        cartId: CART_ID,
        ...item
      })) as any;
      if (_addingToCartError) throw _mapErrors(_addingToCartError);
      return;
    }

    const { data: _cart, error: _cartError } = await getShoppingCart({
      username: USER_EMAIL
    });

    if (_cartError) {
      console.log('>>> Cart error: ', _cartError);
      if (_cartError) throw _mapErrors(_cartError as any);
      return;
    }

    const cartId = _cart?.code ?? '';

    const { error: _addingToCartError } = (await doAddToShoppingCart({
      token: TOKEN,
      username: USER_EMAIL,
      cartId,
      ...item
    })) as any;

    if (_addingToCartError) throw _mapErrors(_addingToCartError);
  };

  const removeFromCart = (item: { cartId: string; entryNumber: string }) => {
    doDeleteShoppingCart({
      token: TOKEN,
      username: USER_EMAIL,
      ...item
    });
  };

  const updateCart = (item: {
    cartId: string;
    entryNumber: string;
    quantity: string;
  }) => {
    doUpdateShoppingCart({
      token: TOKEN,
      username: USER_EMAIL,
      ...item
    });
  };

  const toggleIsGift = (item: {
    cartId: string;
    entryNumber: string;
    enableGiftPackage: boolean;
  }) => {
    doToggleIsGift({
      token: TOKEN,
      username: USER_EMAIL,
      ...item
    });
  };

  const togglePickUpInStore = (item: {
    cartId: string;
    entryNumber: string;
    enablePickUpInStore: boolean;
  }) => {
    doTogglePickUpInStore({
      token: TOKEN,
      username: USER_EMAIL,
      ...item
    });
  };

  const applyCoupon = (args: { cartId: string; voucherId: string }) => {
    doAddCoupon({
      token: TOKEN,
      username: USER_EMAIL,
      ...args
    });
  };

  const removeCoupon = (args: { cartId: string; voucherId: string }) => {
    doRemoveCoupon({
      token: TOKEN,
      username: USER_EMAIL,
      ...args
    });
  };

  useEffect(() => {
    if (hasErrorByCreateShoppingCart)
      return handleModalErrorService(hasErrorByCreateShoppingCart);

    if (hasErrorByUpdateShoppingCart)
      return handleModalErrorService(hasErrorByUpdateShoppingCart);

    if (hasErrorTogglePickUpInStore)
      return handleModalErrorService(hasErrorTogglePickUpInStore);

    if (hasErrorToggleIsGift)
      return handleModalErrorService(hasErrorToggleIsGift);

    if (hasErrorByDeleteShoppingCart)
      return handleModalErrorService(hasErrorByDeleteShoppingCart);

    if (hasErrorByRemoveCoupon)
      return handleModalErrorService(hasErrorByRemoveCoupon);
  }, [
    hasErrorByCreateShoppingCart,
    hasErrorByUpdateShoppingCart,
    hasErrorTogglePickUpInStore,
    hasErrorToggleIsGift,
    hasErrorByDeleteShoppingCart,
    hasErrorByRemoveCoupon
  ]);

  useEffect(() => {
    /**
     * @todo: Put this message in a modal and recover the title the same way
     */
    const { message = TEXT_NO_STOCK, reason } =
      hasErrorByAddToShoppingCart?.data.errors?.[0] ?? {};

    const { statusCode } = updateShoppingCartData ?? {};

    if (statusCode === StatusCode.NO_STOCK || reason === StatusCode.NO_STOCK) {
      const [title, content] = TEXT_NO_STOCK.split('\n');
      const resNoStock = {
        data: {
          errors: [
            {
              message: content
            }
          ]
        }
      };
      return handleModalErrorService(
        resNoStock,
        undefined,
        title
        // true,
      );
    }
  }, [updateShoppingCartData, hasErrorByAddToShoppingCart]);

  return {
    getCart,
    createCart,
    addToCart,
    updateCart,
    toggleIsGift,
    togglePickUpInStore,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    data: {
      CartInfoFromRedux: CartInfoFromRedux?.data,
      shoppingCart: shoppingCartData,
      createShoppingCart: createShoppingCartData,
      addToShoppingCart: addToShoppingCartData,
      updateShoppingCart: updateShoppingCartData,
      isGift: toggleIsGiftData,
      pickUpInStore: togglePickUpInStoreData,
      deleteShoppingCart: deleteShoppingCartData,
      addCoupon: addCouponData,
      removeCoupon: removeCouponData
    },
    isLoading: {
      CartStatusFromRedux: CartInfoFromRedux?.status,
      getCart: isLoadingByGetShoppingCart || isFetchingByGetShoppingCart,
      createCart: isLoadingByCreateShoppingCart,
      addToCart: isLoadingByAddToShoppingCart,
      updateCart: isLoadingByUpdateShoppingCart,
      remoteFromCart: isLoadingByRemoveCoupon,
      isGift: isLoadingByToggleIsGift,
      pickUpInStore: isLoadingByTogglePickUpInStore,
      applyCoupon: isLoadingByAddCoupon,
      removeCoupon: isLoadingByRemoveCoupon,
      removeProduct: isLoadingByDeleteShoppingCart
    },
    hasError: {
      getCart: hasErrorByGetShoppingCart,
      createCart: hasErrorByCreateShoppingCart,
      addToCart: hasErrorByAddToShoppingCart,
      updateCart: hasErrorByUpdateShoppingCart,
      remoteFromCart: hasErrorByRemoveCoupon,
      applyCoupon: hasErrorByAddCoupon,
      removeCoupon: hasErrorByRemoveCoupon,
      isGift: hasErrorToggleIsGift,
      pickUpInStore: hasErrorTogglePickUpInStore
    },
    isErrors: {
      isErrorGetCart: isErrorByGetShoppingCart
    },
    isSuccess: {
      pickUpInStore: isSuccessByTogglePickUpInStore,
      isGift: isSuccessByToggleIsGift
    }
  };
};

interface ShoppingCartRequestHook {
  getCart: () => Promise<Cart | undefined>;
  createCart: () => void;
  addToCart: (item: { productCode: string; quantity: string }) => Promise<void>;
  updateCart: (item: {
    cartId: string;
    entryNumber: string;
    quantity: string;
  }) => void;
  toggleIsGift: (item: {
    cartId: string;
    entryNumber: string;
    enableGiftPackage: boolean;
  }) => void;
  togglePickUpInStore: (item: {
    cartId: string;
    entryNumber: string;
    enablePickUpInStore: boolean;
  }) => void;
  removeFromCart: (item: { cartId: string; entryNumber: string }) => void;
  applyCoupon: (args: { cartId: string; voucherId: string }) => void;
  removeCoupon: (args: { cartId: string; voucherId: string }) => void;
  data: {
    CartInfoFromRedux?: Cart;
    shoppingCart?: Cart;
    createShoppingCart: CreateShoppingCartResponse | undefined;
    addToShoppingCart: AddToCartResponse | undefined;
    updateShoppingCart: UpdateToCartResponse | undefined;
    deleteShoppingCart: any | undefined;
    addCoupon: any | undefined;
    removeCoupon: any | undefined;
    pickUpInStore: any | undefined;
    isGift: any | undefined;
  };
  isLoading: {
    getCart: boolean;
    CartStatusFromRedux?: QueryStatus;
    createCart: boolean;
    addToCart: boolean;
    updateCart: boolean;
    remoteFromCart: boolean;
    applyCoupon: boolean;
    removeCoupon: boolean;
    pickUpInStore: boolean;
    isGift: boolean;
    removeProduct: boolean;
  };
  hasError: {
    getCart: any;
    createCart: any;
    addToCart: any;
    updateCart: any;
    remoteFromCart: any;
    applyCoupon: any;
    removeCoupon: any;
    pickUpInStore: any;
    isGift: any;
  };
  isErrors: {
    isErrorGetCart: boolean;
  };
  isSuccess: {
    pickUpInStore: boolean;
    isGift: boolean;
  };
}

export default useShoppingCart;
