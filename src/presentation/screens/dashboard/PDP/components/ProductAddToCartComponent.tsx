import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo
} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  COLORS,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../../../application/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useLocalStorage,
  LocalStorageKey
} from '../../../../../application/state-manager/services/localstorage';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import {
  IInitialModal,
  ModalsType
} from '../../../../common-components/modal/modal.interfaces';
import {
  useAddToShoppingCartRequest,
  useAnonymousCart,
  useLazyGetShoppingCartRequest,
  useShoppingCart
} from '../../../../../infrastucture/apis/shopping-cart';
import { productResponse } from '../../../../../infrastucture/apis/product';
import { MainButton } from '../../../../common-components/buttons/Button';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../application/state-manager';
import {
  CheckoutScreenStateSelector,
  setCartInfo,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../application/state-manager/services/checkout';
import { trackEventclick } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../../infrastucture/native-modules/emma/clickEventMap';
import { Popup } from '../../../../common-components/poppup';

interface Props {
  contentProduct: productResponse;
  useSizeSelected: [boolean, Dispatch<SetStateAction<boolean>>];
  onScrollToSelected(): void;
}

export const ProductAddToCartComponent = ({
  contentProduct,
  useSizeSelected,
  onScrollToSelected
}: Props) => {
  const {
    localStorageData: {
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.Token]: TOKEN
    }
  } = useLocalStorage();
  const dispatch = useAppDispatch();

  const {
    addToAnonymousCart,
    loading: { byAdd: isLodingByAddInAnonymousCart }
  } = useAnonymousCart();
  const { variantSelectors } = contentProduct ?? {};
  const [sizeSelected] = useSizeSelected;
  const [cant, setCant] = useState<number>(1);
  const [pressLogin, setPressLogin] = useState<boolean>(false);
  const [modalError, setModalError] = useState<IInitialModal>({
    show: false,
    title: 'Ha ocurrido un error.'
  });
  const [getCart] = useLazyGetShoppingCartRequest();
  const [doAddToShoppingCart] = useAddToShoppingCartRequest();
  const shoppingCart = useAppSelector(ShoppingCartStateSelector);
  const { loading: showLoadingScreen } = useAppSelector(
    CheckoutScreenStateSelector
  );
  const hasStock = useMemo(() => {
    return contentProduct?.stock?.stockLevel === 0 && sizeSelected
      ? false
      : true;
  }, [contentProduct]);

  const { hideModal, showModal } = useGenericModal();
  const {
    addToCart,
    isLoading: { addToCart: isLoadingAddToCart }
  } = useShoppingCart();

  useEffect(() => {
    if (IS_LOGIN && pressLogin) {
      hideModal();
      actionAddCart();
      setPressLogin(false);
    }
  }, [IS_LOGIN, pressLogin]);

  const handledCantPlus = () => {
    setCant(previous => previous + 1);
  };

  const handledCantMinus = () => {
    setCant(previous => {
      const result = previous - 1;
      return result <= 1 ? 1 : result;
    });
  };
  const _mapErrors = (error: any): any => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    console.log('text', text);
    return { message: text };
    // return new Error(text || error?.message || error)
  };

  const actionAddCart = async () => {
    const { code: CART_ID = '' } = shoppingCart;
    dispatch(setShowLoadingScreen(true));

    // @ts-ignore
    const { data, error } = await doAddToShoppingCart({
      token: TOKEN,
      username: USER_EMAIL,
      cartId: CART_ID,
      productCode: contentProduct.code,
      quantity: cant.toString()
    });
    if (error) {
      console.log('>>>  addtoCart Error:', error);
      let _addingToCartError = _mapErrors(error);
      if (typeof _addingToCartError.message !== 'string') return;
      setModalError({
        show: true,
        title: _addingToCartError.message
      });
      dispatch(setShowLoadingScreen(false));
      return;
    }

    const { data: _cartData, error: cartError } = await getCart({
      username: USER_EMAIL
    });
    _cartData && dispatch(setCartInfo(_cartData));
    if (cartError) console.log('>>>  Get Shopping Cart Error:', cartError);

    dispatch(setShowLoadingScreen(false));

    if (data) showModal(ModalsType.ToastAddCart, { isToastBottom: true });
  };

  const handleBeforeAddCart = () => {
    if (!sizeSelected ?? false) onScrollToSelected();
    else handleAddCart();
  };

  const handleAddCart = () => {
    trackEventclick(keyEvents.ecommerce_fichadeproducto_carrito);
    if (IS_LOGIN) {
      actionAddCart();
    } else {
      addToAnonymousCart({
        productId: contentProduct.code,
        quantity: cant
      })
        .then(() => {
          showModal(ModalsType.ToastAddCart, { isToastBottom: true });
        })
        .catch(errors => {
          setModalError({
            show: true,
            title: errors.message
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cant}>
        <TouchableOpacity
          disabled={
            contentProduct?.isGiftProduct ||
            contentProduct?.isPromotionSpecialPrice
          }
          style={styles.cant_action}
          onPress={handledCantMinus}>
          <Icon
            name="minus"
            size={24}
            color={
              contentProduct?.isGiftProduct ||
              contentProduct?.isPromotionSpecialPrice
                ? COLORS.DARKDISABLED
                : COLORS.DARKBRAND
            }
          />
        </TouchableOpacity>
        <Text style={styles.cant_number}>{cant}</Text>
        <TouchableOpacity
          disabled={
            contentProduct?.isGiftProduct ||
            contentProduct?.isPromotionSpecialPrice
          }
          style={styles.cant_action}
          onPress={handledCantPlus}>
          <Icon
            name="plus"
            size={24}
            color={
              contentProduct?.isGiftProduct ||
              contentProduct?.isPromotionSpecialPrice
                ? COLORS.DARKDISABLED
                : COLORS.DARKBRAND
            }
          />
        </TouchableOpacity>
      </View>
      <MainButton
        testID={'pdp_anadir'}
        icon={
          hasStock && <Icon name="cart-plus" size={24} color={COLORS.WHITE} />
        }
        title={hasStock ? 'AÑADIR' : 'SIN STOCK'}
        disabled={
          !hasStock ||
          contentProduct?.isGiftProduct ||
          (contentProduct?.isPromotionSpecialPrice &&
            shoppingCart.entries?.some(
              p => p.product.code === contentProduct.code
            )) ||
          showLoadingScreen
        }
        style={[
          styles.add,
          !hasStock && {
            backgroundColor: COLORS.LIGHTGRAY
          }
        ]}
        styleText={{
          color: hasStock ? COLORS.WHITE : COLORS.GRAYDARK60
        }}
        showActivityIndicator={
          isLoadingAddToCart || isLodingByAddInAnonymousCart ? true : false
        }
        activityIndicator={{
          color: COLORS.WHITE
        }}
        onPress={
          contentProduct?.stock?.stockLevel === 0 ||
          isLoadingAddToCart ||
          isLodingByAddInAnonymousCart
            ? undefined
            : handleBeforeAddCart
        }
      />
      <Popup
        visible={modalError.show}
        icon="error"
        hideButton={true}
        iconColor={COLORS.BRAND}
        showCloseButton={true}
        textContentStyle={styles.textContentPopup}
        title={modalError.title}
        closeAction={() => setModalError({ ...modalError, show: false })}
        buttonAction={() => setModalError({ ...modalError, show: false })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.DARK70,
    height: 64,
    width: '100%',
    paddingHorizontal: MARING_HORIZONTAL
  },
  cant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '48%',
    height: '65%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE
  },
  cant_action: {
    backgroundColor: COLORS.DEPRATYGRAY,
    height: '100%',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 2
  },
  cant_number: {
    alignSelf: 'center',
    ...FontStyles.Body_1,
    backgroundColor: COLORS.WHITE,
    width: '50%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 7,
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  add: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: '65%',
    borderRadius: 5,
    overflow: 'hidden'
  },
  add_text: {
    ...FontStyles.Button,
    color: COLORS.WHITE,
    paddingLeft: 8
  },
  textContentPopup: {
    marginBottom: 10,
    textAlign: 'justify'
  }
});
