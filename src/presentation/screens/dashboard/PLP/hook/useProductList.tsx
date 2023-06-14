import { useEffect, useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useComponentContent from '../../../../../application/common/hooksCommons/useComponentContent';
import {
  DataGetProducts,
  Product,
  ResultProducts,
  Sort,
  SortBy,
  PLPScreenProps
} from '../interfaces';
import { GIFTCARD, iParamsPlp, PARAMS_INITIAL } from '../components/utils/';
import { PAGE_SIZE, capitalize } from '../../../../../application/utils';
import {
  mapCategoryViewEmarsys,
  trackCategoryViewEmarsys
} from '../../../../../infrastucture/native-modules/emarsys/emarsys';
import useFavorite from '../../../favorite/Favorites/hook/useFavorite.hook';
import { favoriteSelector } from '../../../../../application/state-manager/services/favorite/favorite.redux';
import { trackEventView } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import {
  useReduxPlp,
  IHistoryFilter
} from '../../../../../application/state-manager/services/plp';
import { useSearchMutationRequest } from '../../../../../infrastucture/apis/product';

export const useProductList = (props?: PLPScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    onSaveFacets,
    onSaveBreadcrumbs,
    onSaveFacetsInitial,
    onSaveHasCategoryGiftCard,
    onSaveInitialHistory,
    //
    reloading,
    onReloadingPlp
  } = useReduxPlp();
  const { allCodeFavorite } = useSelector(favoriteSelector);

  const [headerTitle, setHeaderTitle] = useState<string>(
    capitalize(route?.params?.title || props?.title || '')
  );
  const [listProducts, setListProducts] = useState<Product[]>([] as Product[]);
  const [codeCategory, setCodeCategory] = useState<string>();
  const [queryFilter, setQueryFilter] = useState<string>();
  const [searchText, setSearchText] = useState<string>();
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [queryFromFilter, setQueryFromFilter] = useState<string>('');
  const [paramsQuery, setParamsQuery] = useState<iParamsPlp>({
    sortByCurrent: PARAMS_INITIAL.ORDER_EMPTY,
    currentPage: PARAMS_INITIAL.PAGE_INITIAL,
    pageSize: PAGE_SIZE
  });
  const [sorts, setSorts] = useState<SortBy[]>([]);
  const [historyFilter, setHistoryFilter] = useState<IHistoryFilter[]>([]);
  const [isValuesInitial, setIsValuesInitial] = useState<boolean>(true);
  const [isClearFilter, setIsClearFilter] = useState<boolean>(false);
  // params route
  const {
    linkElemnt,
    categoryID = props?.categoryID,
    queryID,
    searchID
  } = route.params ?? {};

  //TO DO
  const {
    loading: loadingLink,
    error,
    componentContent
  } = useComponentContent(linkElemnt?.itemId ?? '');

  const [_getSearchProduct] = useSearchMutationRequest();

  const showElementCategory: boolean = useMemo(() => {
    if (codeCategory) {
      if (codeCategory === GIFTCARD) return false;
    }
    return true;
  }, [codeCategory]);

  const isCategoryGiftCard: boolean = useMemo(() => {
    onSaveHasCategoryGiftCard(codeCategory === GIFTCARD);
    return codeCategory === GIFTCARD;
  }, [codeCategory]);

  useEffect(() => {
    if (!loadingLink && componentContent?.categoryCode) {
      const { categoryCode } = componentContent;
      setCodeCategory(categoryCode);
    }
  }, [loadingLink]);

  useEffect(() => {
    if (categoryID?.length > 0) {
      setCodeCategory(categoryID);
    } else if (queryID) {
      setQueryFilter(queryID);
    } else if (searchID?.length > 0) {
      setSearchText(searchID);
    }
  }, [categoryID, queryID, searchID]);

  const handleOrder = async () => {
    setParamsQuery({ ...paramsQuery, currentPage: 0 });

    const newList: DataGetProducts = await handleGetProductsService(true);
    const products = newList.products?.filter(product => {
      return product?.images?.length > 0;
    });
    setListProducts(products);
  };

  useEffect(() => {
    if (paramsQuery?.sortByCurrent?.length > 0) handleOrder();
  }, [paramsQuery?.sortByCurrent]);

  useEffect(() => {
    if (
      (codeCategory?.length > 0 ||
        searchText?.length > 0 ||
        queryFilter?.length > 0) &&
      isRefresh
    ) {
      handleGetProducts();
    }
  }, [codeCategory, searchText, queryFilter]);

  //loading skeleton and nextpage
  const handleLoading = (isSkeleton: boolean, value: boolean) => {
    if (isSkeleton) {
      setLoadingProduct(value);
    } else {
      setLoadingNextPage(value);
    }
  };

  //data
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [loadingFavorite, setLoadingFavorite] = useState<boolean>(false);
  const [errorProduct, setErrorProduct] = useState<boolean>(false);
  const [firstCall, setFirstCall] = useState<boolean>(true);
  const {
    handleVerifiyFavorite,
    handleIsLogin,
    handleCompareCodes,
    loadingAdd,
    loadingDelete
  } = useFavorite({ showPopUpSuccess: false });

  useEffect(() => {
    if (loadingAdd || loadingDelete) {
      setLoadingFavorite(true);
    } else {
      setLoadingFavorite(false);
    }
  }, [loadingAdd, loadingDelete]);

  useEffect(() => {
    if (allCodeFavorite?.length && !firstCall) {
      setListProducts(handleCompareCodes(listProducts, allCodeFavorite));
      setLoadingFavorite(false);
    }
  }, [allCodeFavorite]);

  //ReloadingPLP
  useEffect(() => {
    async function handleReloading() {
      if (reloading) {
        setListProducts(await handleVerifiyFavorite(listProducts));
        onReloadingPlp(false);
      }
    }
    handleReloading();
  }, [reloading]);

  const vallidateOrder = () => {
    const arraySort = [
      'relevance',
      'topRated',
      'name-asc',
      'name-desc',
      'price-asc',
      'price-desc'
    ];
    let newQuery = queryFromFilter;
    if (queryFromFilter.length) {
      for (const sort of arraySort) {
        if (queryFromFilter.indexOf(sort) !== -1) {
          newQuery = newQuery.replace(sort, paramsQuery?.sortByCurrent);
          break;
        }
      }
    }
    newQuery = newQuery.split('%24').join('$');

    setQueryFromFilter(newQuery);
    return newQuery;
  };

  const returnQuery = (): string => {
    if (queryFromFilter.length) return vallidateOrder();

    if (codeCategory) {
      const orderBy = paramsQuery?.sortByCurrent || 'relevance';
      //return `:${orderBy}:category:${codeCategory}`
      return `:${orderBy}`;
    }
    if (searchID) {
      const orderBy = paramsQuery?.sortByCurrent || 'relevance';
      return `${searchID}:${orderBy}`;
    }
    if (queryFilter) return queryFilter;

    console.log('returnQuery empty');
    return '';
  };

  // TO DO:
  const handleGetProductsService = async (isSkeleton: boolean) => {
    handleLoading(isSkeleton, true);

    try {
      const query = returnQuery();
      let result: ResultProducts;
      if (query) {
        result = await _getSearchProduct({
          query: query,
          currentPage: 0,
          pageSize: paramsQuery.pageSize,
          categoryCode: codeCategory
        });
        let tempProducts = await handleVerifiyFavorite(result.data.products);
        result = JSON.parse(JSON.stringify(result));
        result.data.products = tempProducts;
        setFirstCall(false);
        handleLoading(isSkeleton, false);
        onSaveFacets(result.data.facets, result.data.pagination.totalResults);
        handleInitialValues(result.data);
        onSaveBreadcrumbs(result.data.breadcrumbs);
        setBlockNextPage(
          !(paramsQuery.currentPage + 1 < result.data?.pagination?.totalPages)
        );
        handleEmarsysCategory(result.data?.breadcrumbsHierarchy);
        handletrackEventPlp(result.data?.breadcrumbsHierarchy);
        return result.data;
      }
    } catch (e) {
      setErrorProduct(true);
      console.log('[error] -> GetProductsService', e.message);
    }
    handleLoading(isSkeleton, false);
    return { products: [], sorts: [] };
  };

  function handleInitialValues(resData: DataGetProducts) {
    if (isValuesInitial) {
      handleInitialHistory(resData);
      onSaveFacetsInitial(resData, headerTitle);
      setIsValuesInitial(false);
    }
  }

  function handleInitialHistory(resData: DataGetProducts) {
    const history: IHistoryFilter = {
      listProducts: resData.products,
      codeCategory: codeCategory ?? '',
      title: handleAssignTitle(resData?.breadcrumbs),
      currentQuery: returnQuery(),
      paramsQuery: paramsQuery,
      sorts: resData.sorts,
      facets: resData.facets,
      totalResults: resData.pagination.totalResults
    };
    onSaveInitialHistory([history]);
  }

  const handleEmarsysCategory = (breadcrumbsHierarchy: any[]) => {
    if (breadcrumbsHierarchy?.length > 0) {
      const categoryPath = mapCategoryViewEmarsys(breadcrumbsHierarchy, 'name');
      if (categoryPath?.length > 0)
        trackCategoryViewEmarsys(categoryPath, false);
    }
  };

  const handletrackEventPlp = (breadcrumbsHierarchy: any[]) => {
    if (breadcrumbsHierarchy?.length > 0) {
      try {
        if (route?.name) {
          const [_, categoryN1, categoryN2, categoryN3] =
            breadcrumbsHierarchy ?? [];
          trackEventView(route?.name, {
            CategoriaNivel1: categoryN1?.name ?? '',
            CategoriaNivel2: categoryN2?.name ?? '',
            CategoriaNivel3: categoryN3?.name ?? ''
          });
        }
      } catch (error) {}
    }
  };

  const handleGetProducts = async () => {
    const result: DataGetProducts = await handleGetProductsService(true);
    const products =
      result?.products?.filter(product => {
        return product?.images?.length > 0;
      }) ?? [];
    setListProducts(products);
    handleSortBy(result.sorts, products);

    if (result?.products?.length === 0) {
      setErrorProduct(true);
    }
    setHeaderTitle(handleAssignTitle(result.breadcrumbs));
  };

  const handleAssignTitle = (breadcrumbs: any[]) => {
    let _title = '';
    try {
      if (route?.params?.title) _title = route?.params?.title;
      else if (props?.title) _title = props?.title;
      else if (breadcrumbs?.length > 0) {
        const facet = breadcrumbs?.find(
          bread => bread?.categoryCode === codeCategory
        );
        _title = facet?.name ?? '';
      }
      return _title !== '' ? capitalize(_title) : headerTitle;
    } catch (error) {}

    return _title;
  };

  //sortby
  const handleSortBy = (_sorts: Sort[], _products: Product[]) => {
    let tempSorts = _sorts.map(x => {
      return { title: x.name, code: x.code };
    });

    let tempListOrder = {};
    _sorts.forEach(x => {
      tempListOrder = {
        ...tempListOrder,
        [x.code]: x.selected ? _products : null
      };
    });

    setSorts(tempSorts);
  };

  // pagination
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
  const [blockNextPage, setBlockNextPage] = useState<boolean>(false);

  const handleNextPage = async () => {
    if (!blockNextPage && listProducts?.length >= PAGE_SIZE) {
      setBlockNextPage(true);
      setParamsQuery(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
        pageSize: prev.pageSize + PAGE_SIZE
      }));
    }
  };

  useEffect(() => {
    if (paramsQuery.currentPage > 0) {
      handleGetProductsService(false).then((listNextPage: DataGetProducts) => {
        if (
          listNextPage?.products?.length > 0 &&
          listNextPage?.products?.length !== listProducts.length
        ) {
          setBlockNextPage(false);
          // const newList = [...listProducts, ...listNextPage?.products]
          // setListProducts(newList)
          setListProducts(listNextPage?.products);
        } else {
          setBlockNextPage(true);
        }
      });
    }
  }, [paramsQuery.currentPage]);

  const onPressBack = () => {
    // console.log('+++++historyFilter', historyFilter)
    if (historyFilter.length <= 1) return true;
    let _history = historyFilter;
    const prevHistory = historyFilter[historyFilter.length - 2];
    setListProducts(prevHistory.listProducts);
    setHeaderTitle(prevHistory.title);
    setCodeCategory(prevHistory.codeCategory);
    handleSortBy(prevHistory.sorts, prevHistory.listProducts);
    setParamsQuery(prevHistory.paramsQuery);
    onSaveFacets(prevHistory.facets, prevHistory.totalResults);
    _history.pop();
    // console.log('++++2+NewcurrentHistory', _history)
    setHistoryFilter(_history);
    return false;
  };

  function handleCompareCodesAux(currentListProducts: Product[]) {
    return handleCompareCodes(currentListProducts, allCodeFavorite);
  }

  return {
    navigation,
    headerTitle,
    //data
    loadingProduct,
    reloading,
    errorProduct,
    listProducts,
    sorts,
    paramsQuery,
    setParamsQuery,
    // pagination
    loadingNextPage,
    handleNextPage,
    // show/hide elements
    showElementCategory,
    isCategoryGiftCard,

    //favorite
    handleIsLogin,
    loadingFavorite: {
      loadingAdd: loadingAdd || loadingFavorite,
      loadingDelete: loadingDelete || loadingFavorite
    },
    ///
    onPressBack,
    ///
    handlePlp: {
      setListProducts,
      handleSortBy,
      setCodeCategory,
      headerTitle,
      setHeaderTitle,
      setQueryFromFilter,
      setIsRefresh,
      setParamsQuery,
      paramsQuery,
      historyFilter,
      setHistoryFilter,
      setLoadingProduct,
      setIsClearFilter,
      isClearFilter,
      handleCompareCodesAux,
      setBlockNextPage
    }
  };
};
