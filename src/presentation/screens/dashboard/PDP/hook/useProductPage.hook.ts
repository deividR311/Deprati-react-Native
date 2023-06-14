import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { useProductMutationRequest } from '../../../../../infrastucture/apis/product';
import usePageContent from '../../../../../infrastucture/apis/contentPage/contentPage.hook';
import { trackItemView } from '../../../../../infrastucture/native-modules/emarsys/emarsys';
import useErrorDescription from '../../../../../application/common/hooksCommons/useErrorDescription';
import { useFavoriteRequest } from '../../../favorite/Favorites/hook/useFavoriteRequest.hook';
import { useAppSelector } from '../../../../../application/state-manager';
import { favoriteSelector } from '../../../../../application/state-manager/services/favorite/favorite.redux';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';

export const useProductPage = (): InfoHook<any> => {
  const route = useRoute();

  const { productCode: productCodeParams, isFavorite } = route.params ?? {};
  const [productCode, setProductCode] = useState<string>(productCodeParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { handleGetWishlist } = useFavoriteRequest();
  const { allCodeFavorite } = useAppSelector(favoriteSelector);
  const {
    loading: loadingContent,
    error: errorContent,
    pageContent,
    getDataContent
  } = usePageContent();
  const { handleModalErrorService } = useErrorDescription();
  const {
    localStorageData: { [LocalStorageKey.IsLogin]: IsLogin }
  } = useLocalStorage();

  const handleSetProductCode = useCallback(
    (code: string, change?: boolean) => {
      if (code) {
        trackItemView(code);
        setProductCode(code);
        getData(code, change);
      }
    },
    [productCode]
  );

  const [
    _getProduct,
    {
      isLoading: loadingProduct,
      data: contentProduct,
      isError: isErrorProduct,
      error: errorProduct
    }
  ] = useProductMutationRequest();

  const getData = useCallback(
    async (code: string, change?: boolean) => {
      if (code) {
        await _getProduct({ productCode: code });

        if (!change) {
          getDataContent({
            pageType: 'ProductPage',
            code
          });
        }
      }
    },
    [productCode]
  );

  useEffect(() => {
    setLoading(loadingContent);
  }, [loadingContent]);

  useEffect(() => {
    setError(errorContent || isErrorProduct);
  }, [errorContent, isErrorProduct]);

  useEffect(() => {
    if (errorProduct) {
      // console.log('errorProduct', errorProduct)
      handleModalErrorService(errorProduct);
    }
  }, [errorProduct]);

  useEffect(() => {
    handleSetProductCode(productCodeParams, false);
    isFavorite === undefined && !allCodeFavorite.length && handleGetWishlist();
  }, []);

  const hasFavorite = useMemo(() => {
    if (IsLogin) {
      return isFavorite || allCodeFavorite.includes(productCodeParams);
    }
    return false;
  }, [isFavorite, allCodeFavorite, IsLogin]);

  return {
    contentProduct,
    pageContent,
    loading,
    error,
    handleSetProductCode,
    isFavorite: hasFavorite,
    loadingProduct
  };
};

export interface InfoHook<T> {
  loading: boolean;
  isFavorite?: boolean;
  error: boolean;
  contentProduct?: T;
  pageContent?: T;
  handleSetProductCode: (productCode: string) => void;
  loadingProduct: boolean;
}
