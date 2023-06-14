import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useAddWishlistMutationRequest,
  useLazyCustomerWishlistRequest,
  useRemoveWishlistMutationRequest,
  ErrorWishlistResponse,
  TypeErrorWishlist,
  Entry,
  MyWishlist
} from '../../../../../infrastucture/apis/wishlist';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { setAllCodeFavorite } from '../../../../../application/state-manager/services/favorite/favorite.redux';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { loadIndicationsKeys } from '../../../../../application/state-manager/services/indications/indications.slice';
import { setReloadingPlp } from '../../../../../application/state-manager/services/plp';
import { NAV } from '../../../../../application/common';
import { EcommerceNavigationRoute } from '../../../../navigation/ecommerce';

//const TEXT_GETLIST = 'Error al obtener la lista de favoritos'
const TEXT_DELETE = 'Error al eliminar de la lista de favoritos';
const TEXT_ADD = 'Error al añadir a la lista de favoritos';

interface FavoriteProps {
  showPopUpSuccess?: boolean;
}

export const useFavoriteRequest = (props?: FavoriteProps): WishlistsHook => {
  const { showPopUpSuccess = true } = props ?? {};
  // const { localStorageData } = useLocalStorage()
  const route = useRoute();
  const isFocused = useIsFocused();
  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.Token]: TOKEN
    }
  } = useLocalStorage();
  const dispatch = useDispatch();

  const [listFavoriteCodes, setListFavoriteCodes] = useState<string[]>([]);
  const { hideModal, showModal } = useGenericModal();
  const [
    _getWishlistProducts,
    {
      //isLoading: loadingWishlist,
      data: dataWishlist,
      isSuccess: isSuccessWishlist,
      isError: isErrorWishlist,
      isFetching: loadingWishlist,
      error
    }
  ] = useLazyCustomerWishlistRequest();

  const [
    _addWishlistProducts,
    {
      isLoading: loadingAdd,
      data: resultAdd,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
      error: errorAdd
    }
  ] = useAddWishlistMutationRequest();

  const [
    _deleteWishlistProducts,
    {
      isLoading: loadingDelete,
      data: resDelete,
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete
    }
  ] = useRemoveWishlistMutationRequest();

  const handleGetWishlist = () => {
    serviceGetWishlist();
  };

  const serviceGetWishlist = async () => {
    if (USER_EMAIL) {
      return await _getWishlistProducts({
        user: USER_EMAIL
      });
    }
  };

  const handleAddWishlist = async (code: string) => {
    const response = await _addWishlistProducts({
      user: USER_EMAIL,
      productCode: code
    });
    await handleGetWishlist();
    return response;
  };

  const handleRemoveWishlist = async (code: string) => {
    await _deleteWishlistProducts({
      user: USER_EMAIL,
      productCode: code
    });
    await handleGetWishlist();
    return isSuccessDelete;
  };

  const handleEntries = (
    auxWishlists: MyWishlist[] | undefined
  ): Entry[] | [] => {
    if (auxWishlists && auxWishlists.length) return auxWishlists[0].entries;
    return [];
  };

  const handleGetCodesWishlist = async (): Promise<string[] | []> => {
    const tempGetList = await serviceGetWishlist();
    return handleListCodes(handleEntries(tempGetList?.data?.wishlists));
    // return handleListCodes(tempGetList.data.wishlists[0]?.entries )
  };

  useEffect(() => {
    if (!loadingWishlist && isSuccessWishlist) {
      dispatch(
        loadIndicationsKeys({
          favorities: handleEntries(dataWishlist?.wishlists).length ?? 0
        })
      );
      dispatch(
        setAllCodeFavorite(
          handleListCodes(handleEntries(dataWishlist?.wishlists))
        )
      );
    }
  }, [dataWishlist]);

  const handleListCodes = (list: Entry[] | undefined) => {
    let favoriteCodes: string[] = [];
    if (list && list.length)
      list.forEach(x => favoriteCodes.push(x.product.code));
    else favoriteCodes.push('');

    setListFavoriteCodes(favoriteCodes);

    return favoriteCodes;
  };

  useEffect(() => {
    if (isSuccessAdd) {
      if (
        (route?.name === NAV.PLP ||
          route?.name === EcommerceNavigationRoute.ProductPage) &&
        !dataWishlist
      )
        serviceGetWishlist();
    }
  }, [isSuccessAdd]);

  useEffect(() => {
    if (showPopUpSuccess) {
      //if (isErrorAdd) handleShowModalError(TEXT_ADD, errorAdd)
      if (isFocused && route?.name !== NAV.PLP) {
        // if (isErrorWishlist) return handleShowModalError(TEXT_GETLIST)
        if (isErrorDelete) handleShowModalError(TEXT_DELETE);
      }
    }
  }, [isErrorWishlist, isErrorAdd, isErrorDelete]);

  const handleShowModalError = (
    textError: string,
    Errormessage?: ErrorWishlistResponse
  ) => {
    let text = textError;
    let typeError = false;
    if (Errormessage) {
      const errors = Errormessage.data.errors;
      const result = errors.find(
        x => x.type === TypeErrorWishlist.DUPLICATE_UID_ERROR
      );
      typeError = errors.some(
        x => x.type === TypeErrorWishlist.DUPLICATE_UID_ERROR
      );
      // text = result ? `${text}\n${result.message}` : text
      text = result ? `${result.message}` : text;
    }

    showModal(ModalsType.ErrorSignUp, {
      textContent: text,
      textContentStyle: {
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20
      },
      closeAction: () => closeActionError(typeError)
    });
  };

  const closeActionError = (isUidError: boolean) => {
    if (isUidError) {
      dispatch(setReloadingPlp(true));
    }
    hideModal();
  };

  return {
    // entryWishList: dataWishlist?.wishlists[0]?.entries ?? [],
    entryWishList: handleEntries(dataWishlist?.wishlists),
    loadingWishlist,
    handleGetWishlist,
    // entryWishList,
    isSuccessWishlist,
    isErrorWishlist,
    //Delete
    handleRemoveWishlist,
    loadingDelete: loadingDelete || loadingWishlist,
    isSuccessDelete,
    isErrorDelete,
    errorDelete,

    //Add
    handleAddWishlist,
    loadingAdd: loadingAdd || loadingWishlist,
    isSuccessAdd,
    isErrorAdd,
    errorAdd,

    //listCodes
    listFavoriteCodes,
    handleGetCodesWishlist
  };
};

interface WishlistsHook {
  // dataWishlist: IEntry[] | undefined
  loadingWishlist: boolean;
  isSuccessWishlist: boolean;
  isErrorWishlist: boolean;
  listFavoriteCodes: string[];
  //Delete
  loadingDelete: boolean;
  isSuccessDelete: boolean;
  isErrorDelete: boolean;
  errorDelete?: any;

  //Add
  loadingAdd: boolean;
  isSuccessAdd: boolean;
  isErrorAdd: boolean;
  errorAdd?: any;

  entryWishList: Entry[] | [] | undefined;
  handleGetWishlist(): void;
  handleAddWishlist(productCode: string): void;
  handleRemoveWishlist(productCode: string): void;
  handleGetCodesWishlist(): Promise<string[] | []>;
}
