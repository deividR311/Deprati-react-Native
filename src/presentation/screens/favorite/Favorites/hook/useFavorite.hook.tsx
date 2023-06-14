import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../application/state-manager';
import {
  setCartInfo,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../application/state-manager/services/checkout';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import sleep from '../../../../../application/utils/sleep';
import {
  Cart,
  useAddToShoppingCartRequest,
  useLazyGetShoppingCartRequest
} from '../../../../../infrastucture/apis/shopping-cart';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { Product } from '../../../dashboard/PLP/interfaces/iProducts';
import { useFavoriteRequest } from './useFavoriteRequest.hook';
import { keyEvents } from '../../../../../infrastucture/native-modules/emma/clickEventMap';
import { trackEventclick } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';

const VALUE_INITIAL = -1;
export const MAX_PRODUCTS_FAVORITES = 30;

interface FavoriteProps {
  onList?(data: Product | []): void;
  showPopUpSuccess?: boolean;
}

export default function useFavorite(props?: FavoriteProps) {
  const { showPopUpSuccess = true } = props ?? {};
  const dispatch = useAppDispatch();

  const {
    localStorageData: {
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.Token]: TOKEN
    }
  } = useLocalStorage();

  const { hideModal, showModal: globalShowModal } = useGenericModal();
  const {
    //Get
    handleGetWishlist,
    entryWishList,
    listFavoriteCodes,
    handleGetCodesWishlist,
    loadingWishlist,
    isSuccessWishlist,
    isErrorWishlist,
    //Delete
    handleRemoveWishlist,
    isSuccessDelete,
    loadingDelete,
    //Add
    handleAddWishlist,
    isSuccessAdd,
    loadingAdd
  } = useFavoriteRequest({ showPopUpSuccess: false });
  // console.log('>>>>>>>>>> entry', entryWishList)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<number>(VALUE_INITIAL);
  const [currentSize, setCurrentSize] = useState<number>(VALUE_INITIAL);
  const [select, setSelect] = useState<boolean>(false);
  const [pressLogin, setPressLogin] = useState<boolean>(false);
  const [disabledBtnAdd, setDisabledBtnAdd] = useState<boolean>(false);
  const [valuesCF, setValuesCF] = useState({ code: '', isFavorite: false });
  const [getCart] = useLazyGetShoppingCartRequest();
  const [doAddToShoppingCart] = useAddToShoppingCartRequest();
  const shoppingCart = useAppSelector(ShoppingCartStateSelector);

  useEffect(() => {
    if (IS_LOGIN && pressLogin) {
      addFavorite(valuesCF.code, valuesCF.isFavorite);
      setPressLogin(false);
    }
  }, [IS_LOGIN, pressLogin]);

  const _mapErrors = (error: any): any => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    console.log('text', text);
    return { message: text };
    // return new Error(text || error?.message || error)
  };
  const handleLoading = () => {
    dispatch(setShowLoadingScreen(false));
  };

  const handleConfirmAddToCart = async (productCode?: string) => {
    if (!productCode) return;
    onClose();
    await sleep(500);
    const { code: CART_ID = '' } = shoppingCart;
    dispatch(setShowLoadingScreen(true));

    // @ts-ignore
    const { data, error } = await doAddToShoppingCart({
      token: TOKEN,
      username: USER_EMAIL,
      cartId: CART_ID,
      productCode,
      quantity: '1'
    });

    if (error) {
      let _addingToCartError = _mapErrors(error);
      if (typeof _addingToCartError.message !== 'string') return;
      handleLoading();
      if (
        _addingToCartError.message.includes('se agotó') ||
        _addingToCartError.message.includes('stock 0')
      ) {
        globalShowModal(ModalsType.OutStock, {
          buttonAction: () => handleDeleteFromModal(productCode)
        });
      } else {
        globalShowModal(ModalsType.ErrorService, {
          title: _addingToCartError.message
        });
      }
      return;
    }

    const { data: _cartData, error: cartError } = await getCart({
      username: USER_EMAIL
    });
    _cartData && dispatch(setCartInfo(_cartData));
    if (cartError) console.log('>>>  Get Shopping Cart Error:', cartError);

    handleLoading();

    await sleep(500);
    if (data) {
      globalShowModal(ModalsType.ToastAddCart);
      await sleep(500);
    }
  };

  function handleDeleteFromModal(productCode: string) {
    hideModal();
    handleRemoveWishlist(productCode);
  }

  const handleGetAllFavorites = () => {
    handleGetWishlist();
  };

  const onClose = () => {
    setCurrentColor(VALUE_INITIAL);
    setCurrentSize(VALUE_INITIAL);
    setShowModal(false);
  };

  const handleSelectColor = (value: number) => {
    if (currentColor === value) return true;
    return false;
  };

  const activeButton = (): boolean => {
    if (currentColor !== VALUE_INITIAL && currentSize !== VALUE_INITIAL)
      return false;
    return true;
  };

  useEffect(() => {
    if (!isSuccessDelete || !showPopUpSuccess) return;
    async function handleSucces() {
      await sleep(500);
      handleModalDelete();
    }
    handleSucces();
  }, [isSuccessDelete]);

  useEffect(() => {
    if (isSuccessAdd && showPopUpSuccess) {
      handleModalAddFavorite();
    }
  }, [isSuccessAdd]);

  const handleDelete = (_code: string) => {
    return handleRemoveWishlist(_code);
  };

  const handleModalDelete = () => {
    globalShowModal(ModalsType.ToastDeleteFavorite, {
      buttonAction: () => {
        // handleDelete()
        hideModal();
      }
    });
  };
  const handleAddFavorite = (code: string) => {
    return handleAddWishlist(code);
  };

  const handleModalAddFavorite = () => {
    globalShowModal(ModalsType.ToastAddFavorite);
  };
  ///funcion mostrar modalLogin
  const handleShowLogin = () => {
    globalShowModal(ModalsType.LoginModal, {
      buttonAction: () => {
        console.log('buttonAction', IS_LOGIN);
        setPressLogin(true);
        hideModal();
      }
    });
  };
  const handleVerifiyFavorite = async (list: Product[]) => {
    if (IS_LOGIN) {
      // if (!entryWishList) {
      const resultCodes = await handleGetCodesWishlist();
      //console.log('result', resultCodes)
      return handleCompareCodes(list, resultCodes);
      // }
    }
    return list;
    // return []
  };

  const handleCompareCodes = (
    listPlp: Product[],
    _listFavoriteCodes: string[]
  ): Product[] => {
    let _listeNewPLP = listPlp.map(itemPlp => {
      let itemFav = _listFavoriteCodes?.find(x => x === itemPlp.code);
      if (itemFav && itemFav === itemPlp.code) {
        return { ...itemPlp, isFavorite: true };
      } else {
        return { ...itemPlp, isFavorite: false };
      }
    });
    return _listeNewPLP;
  };
  // ButtonFavorite
  const handleIsLogin = (code: string, isFavorite: boolean) => {
    // setValueCode(code)
    setValuesCF({ code: code, isFavorite: isFavorite });
    if (!IS_LOGIN) {
      handleShowLogin();
    } else {
      addFavorite(code, isFavorite);
    }
  };

  const addFavorite = async (code: string, isFavorite: boolean) => {
    setSelect(!isFavorite);
    if (isFavorite === false) {
      trackEventclick(keyEvents.ecommerce_favoritos);
      return handleAddFavorite(code);
    } else {
      return handleDelete(code);
    }
  };

  return {
    handleGetAllFavorites,
    loadingWishlist,
    isSuccessWishlist,
    isErrorWishlist,
    showModal,
    setShowModal,
    handleClose: onClose,
    handleConfirmAddToCart,
    isLoadingAddToCart,
    handleModalFavorite: {
      handleSelectColor,
      activeButton,
      setCurrentColor,
      setCurrentSize
    },
    handleDelete,
    // listProducts,
    entryWishList,
    //selectAdd favorite
    setSelect,
    select,
    handleIsLogin,
    //ModalLogin
    handleShowLogin,

    handleVerifiyFavorite,
    handleCompareCodes,

    ///add-deletefavorite
    loadingDelete,
    loadingAdd,
    ////
    disabledBtnAdd,

    addFavorite
  };
}
