//Libs
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
//hooks
import useFavorite from './hook/useFavorite.hook';
//components
import { SafeAreCustom } from '../../../common-components/safe-area/SafeAreCustom';
import ComponentQuantityProducts from './components/quantity-product/ComponentQuantityProducts';
import SelectColorSize from './modals/SelectColorSize.modal';
import FavoritesEmpty from './FavoritesEmpty';
import ListFavorite from './View/ListFavorite';
import { SkeletonFavorite } from './View/SkeletonFavorite';
import ErrorPage from '../../ErrorPage';
import { useProductPage } from '../../dashboard/PDP/hook/useProductPage.hook';
import { loadIndicationsKeys } from '../../../../application/state-manager/services/indications/indications.slice';
import { useDispatch } from 'react-redux';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { FullLoadingComponent } from '../../../common-components/fullLoadingComponent/FullLoadingComponent';
import { ShoppingCartIcon } from '../../../common-components/shopping-cart';

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [productSelect, setProductSelect] = useState<string>();
  const { contentProduct, loading, error, handleSetProductCode } =
    useProductPage();

  const {
    showModal,
    setShowModal,
    handleClose,
    isLoadingAddToCart,
    handleConfirmAddToCart,
    handleModalFavorite,
    handleDelete,
    entryWishList,
    handleGetAllFavorites,

    loadingWishlist,
    isSuccessWishlist,
    isErrorWishlist,
    loadingDelete,

    disabledBtnAdd
  } = useFavorite();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: userEmail,
      [LocalStorageKey.IsLogin]: IS_LOGIN
    }
  } = useLocalStorage();

  const listFavorites = useMemo(
    () =>
      entryWishList?.filter(
        ({ product: { isGiftProduct, isPromotionSpecialPrice } = {} }) =>
          !isGiftProduct && !isPromotionSpecialPrice
      ) ?? [],
    [entryWishList, IS_LOGIN, loadingWishlist]
  );

  const handleAddToCart = async (_productCode: string) => {
    await handleSetProductCode(_productCode);
    setProductSelect(_productCode);
  };

  useEffect(() => {
    if (productSelect && contentProduct?.code === productSelect) {
      const selects = contentProduct?.variantSelectors?.length > 0;
      if (!selects) handleConfirmAddToCart(productSelect);
      setShowModal(selects);
      return;
    }
  }, [contentProduct, error]);

  useLayoutEffect(() => {
    if (listFavorites && listFavorites?.length) {
      dispatch(
        loadIndicationsKeys({
          favorities: listFavorites?.length ?? 0
        })
      );
    }
    navigation?.setOptions({
      headerTitle: handleTitle(),
      headerRight: () => <ShoppingCartIcon style={{ marginRight: 8 }} />
    });
  }, [listFavorites, IS_LOGIN, loadingWishlist]);

  useFocusEffect(
    useCallback(() => {
      if (userEmail) {
        const loadFavorites = async () => {
          handleGetAllFavorites();
        };
        loadFavorites();
      }
    }, [userEmail])
  );

  const handleTitle = () => {
    if (!listFavorites?.length) return 'Mi lista de deseos';
    return 'Mis favoritos';
  };

  // listFavorites = []
  if (isErrorWishlist) return <ErrorPage />;

  if (!listFavorites?.length) return <FavoritesEmpty />;

  return (
    <SafeAreCustom styleAndroid={{ paddingBottom: 22 }}>
      {listFavorites?.length > 0 && (
        <ComponentQuantityProducts quantity={listFavorites?.length} />
      )}
      {loadingWishlist || loadingDelete ? (
        <SkeletonFavorite />
      ) : (
        <ListFavorite
          testID="listFavorites"
          loading={loading}
          addToCart={handleAddToCart}
          deleteFavorite={x => handleDelete(x)}
          list={listFavorites}
          loadingDelete={loadingDelete}
          disabledBtnAdd={disabledBtnAdd}
        />
      )}
      <SelectColorSize
        handleSetProductCode={handleSetProductCode}
        contentProduct={contentProduct}
        visible={showModal}
        codeSelect={productSelect}
        onClose={() => {
          setShowModal(false);
          handleClose();
        }}
        onConfirm={(code: string) => code && handleConfirmAddToCart(code)}
        handleModal={handleModalFavorite}
        loading={loading}
      />
      <FullLoadingComponent visible={isLoadingAddToCart} />
    </SafeAreCustom>
  );
}
