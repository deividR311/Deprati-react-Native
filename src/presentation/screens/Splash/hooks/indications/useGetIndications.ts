import { useEffect } from 'react';
import {
  Cart,
  useLazyGetShoppingCartRequest
} from '../../../../../infrastucture/apis/shopping-cart';
import useNotifications from '../../../Notifications/hooks/useNotifications';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import {
  indicationsSelector,
  loadIndications
} from '../../../../../application/state-manager/services/indications/indications.slice';
import { Indications } from '../../../../../application/state-manager/services/indications/indications.interface';
import { useLazyCustomerWishlistRequest } from '../../../../../infrastucture/apis/wishlist';
import {
  setCartInfo,
  setPendingToRefreshCart,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../application/state-manager/services/checkout';
import { useAppSelector } from '../../../../../application/state-manager';
import { useGetAnonymousShoppingCartDetailRequest } from '../../../../../infrastucture/apis/shopping-cart/anonymous-shopping-cart.api';

export default function useGetIndications() {
  const indicatorState = useSelector(indicationsSelector);
  const dispatch = useDispatch();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.AnonymousCartGuid]: ANONYMOUS_CART_GUID
    }
  } = useLocalStorage();
  const { totalUnitCount = 0 } = useAppSelector(ShoppingCartStateSelector);

  const [getShoppingCart] = useLazyGetShoppingCartRequest();
  const [getAnonymousShoppingCart, { data: anonymousCartData }] =
    useGetAnonymousShoppingCartDetailRequest();

  const { unreadCont, isError: ErrorNoti } = useNotifications();

  const [getWishList, { data: entryWishList, isError: Errorfav }] =
    useLazyCustomerWishlistRequest();

  useEffect(() => {
    if (USER_EMAIL) {
      dispatch(setShowLoadingScreen(true));
      Promise.all([
        getShoppingCart({
          username: USER_EMAIL
        }),
        getWishList({
          user: USER_EMAIL
        })
      ])
        .then(([shoppingCart, wishList]) => {
          const cart = shoppingCart.data ?? ({} as Partial<Cart>);
          dispatch(setCartInfo(cart));
        })
        .finally(() => {
          dispatch(setShowLoadingScreen(false));
          dispatch(setPendingToRefreshCart(false));
        });
    } else if (ANONYMOUS_CART_GUID) {
      getAnonymousShoppingCart({
        cartGuid: ANONYMOUS_CART_GUID
      }).then(response => console.log('>>> Anonymous Response: ', response));
    }
  }, []);

  useEffect(() => {
    try {
      const favorites =
        entryWishList?.wishlists[0]?.entries?.filter(
          ({ product: { isGiftProduct, isPromotionSpecialPrice } = {} }) =>
            !isGiftProduct && !isPromotionSpecialPrice
        ) ?? [];
      const indications = {
        notifications: ErrorNoti ? 0 : unreadCont,
        cart: totalUnitCount || anonymousCartData?.totalUnitCount || 0,
        favorities: Errorfav ? 0 : favorites.length
      };

      dispatch(loadIndications(indications));
    } catch (error) {
      console.log('error loading indications', error.message);
    }
  }, [totalUnitCount, unreadCont, entryWishList, anonymousCartData]);

  return indicatorState as Indications;
}
