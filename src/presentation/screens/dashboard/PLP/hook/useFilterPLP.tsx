import { useEffect, useMemo, useState } from 'react';
import { handleDecodeTitle } from '../components/utils/functionModalFIlter';
import {
  DataGetProducts,
  DataGetProductsInitial,
  FiltrosPLP,
  PropsModalFilter,
  ResultProducts
} from '../interfaces';
import useReduxPlp from '../../../../../application/state-manager/services/plp/useReduxPlp.hook';
import sleep from '../../../../../application/utils/sleep';
import { capitalize } from '../../../../../application/utils/string-formater';
import { IHistoryFilter } from '../../../../../application/state-manager/services/plp/IFilterPlp.slice.interface';
import { useSearchMutationRequest } from '../../../../../infrastucture/apis/product';
import { useRoute } from '@react-navigation/native';

export const useFilterPLP = (props: PropsModalFilter) => {
  const { handlePlp } = props;
  const {
    onSaveFacets,
    onSaveBreadcrumbs,
    //
    dataFilterPlp: {
      valueInitial,
      breadcrumbs,
      valueFacet: valueFacetRedux,
      totalResults,
      initialHistory
    }
  } = useReduxPlp();
  const route = useRoute();
  const [dataFacet, setDataFacet] = useState<FiltrosPLP>({
    valueFacet: [],
    totalResults: 0
  });
  const [dataResult, setDataResult] = useState<DataGetProducts>();
  const [checkFilter, setCheckFilter] = useState<any>({});
  const [loadingFacet, setLoadingFacet] = useState(false);
  const [isExpanded, setIsExpanded] = useState<any>({});
  const [disabledClear, setDisabledClear] = useState(true);

  const [_getSearchProduct] = useSearchMutationRequest();

  const initialFacet: DataGetProductsInitial = useMemo(() => {
    return valueInitial;
  }, [valueInitial]);

  const orderFacets = (valueFacet: any[]) => {
    const listFacets = [
      'discounts',
      'exclusiveWeb',
      'baseCategory',
      'new',
      'availableInStores'
    ];
    const filterOrder1 = valueFacet?.filter(
      value => !listFacets?.includes(value?.code)
    );
    const filterOrder2 = valueFacet?.filter(value =>
      ['discounts', 'exclusiveWeb', 'new']?.includes(value?.code)
    );
    return [...filterOrder1, ...filterOrder2];
  };
  const { category, categoryID } = route.params ?? {};

  useEffect(() => {
    if (!valueFacetRedux.length) return;

    setDataFacet({
      valueFacet: orderFacets(valueFacetRedux),
      totalResults: totalResults
    });
    const _valueFacet = valueFacetRedux;

    _valueFacet?.forEach(xList =>
      xList?.values.forEach(x => {
        if (x.selected === true) {
          setCheckFilter({ ...checkFilter, [x.name]: true });
          setDisabledClear(false);
        }
      })
    );
  }, [valueFacetRedux]);

  const handleGetProductsService = async (
    valueQuery: string,
    nameItem: any,
    valueItem: boolean
  ) => {
    setLoadingFacet(true);

    setCheckFilter({
      ...checkFilter,
      [nameItem]: !valueItem
    });
    const _valueQuery = valueQuery.split(' ').join('+');

    try {
      //console.log('route', route.params)
      const result: ResultProducts = await _getSearchProduct({
        query: _valueQuery,
        categoryCode: category ?? categoryID
      });
      //console.log('resultQuery', result.data)
      setDataResult(result.data);

      setDataFacet({
        valueFacet: orderFacets(result.data.facets),
        totalResults: result.data.pagination.totalResults
      });
      setLoadingFacet(false);
      setDisabledClear(false);
    } catch (e) {
      setLoadingFacet(false);
    }
  };

  const handleClearFilters = () => {
    setDataFacet({
      valueFacet: orderFacets(initialFacet.value.facets),
      totalResults: initialFacet.value.pagination.totalResults
    });
    setDataResult(initialFacet.value);

    for (const key in checkFilter) {
      setCheckFilter({ ...checkFilter, [key]: false });
    }

    setDisabledClear(true);
    handlePlp.setQueryFromFilter('');
    //handlePlp.setHeaderTitle(initialFacet.title)
    handlePlp.setListProducts(initialFacet.value.products);
    handlePlp.setHistoryFilter(initialHistory.value);
    onSaveFacets(
      initialFacet.value.facets,
      initialFacet.value.pagination.totalResults
    );
    handlePlp.setIsClearFilter(true);
    handleClose();
  };

  const handleTitleBreadcrumbs = () => {
    let _title = handleDecodeTitle(dataResult?.breadcrumbs, categoryID);
    if (_title === '') {
      _title = dataResult?.breadcrumbsHierarchy.length
        ? dataResult?.breadcrumbsHierarchy[0]?.name
        : '';
    }
    return _title === '' ? handlePlp.headerTitle : capitalize(_title);
  };

  const handlecategoryID = () => {
    if (dataResult?.categoryCode) return dataResult?.categoryCode;
    if (dataResult?.breadcrumbs.length) {
      if (dataResult?.breadcrumbs[0].facetValueCode?.includes('$'))
        return undefined;
      return dataResult?.breadcrumbs[0].facetValueCode;
    }
    return '';
  };

  const handleSaveHistory = () => {
    let arrayHistory: IHistoryFilter[] = handlePlp.historyFilter;
    if (arrayHistory.length === 0) {
      arrayHistory = initialHistory.value;
    }

    const history: IHistoryFilter = {
      listProducts: dataResult?.products ?? [],
      codeCategory: handlecategoryID(),
      title: handleTitleBreadcrumbs(),
      currentQuery: dataResult?.currentQuery.query.value ?? '',
      paramsQuery: handlePlp.paramsQuery ?? {},
      sorts: dataResult?.sorts ?? [],
      facets: dataResult?.facets ?? [],
      totalResults: dataResult?.pagination.totalResults ?? 0
    };
    arrayHistory = arrayHistory.concat([history]);
    handlePlp.setHistoryFilter(arrayHistory);
  };

  const handleShowResults = async () => {
    if (dataResult) {
      handlePlp.setIsClearFilter(false);
      handlePlp.setBlockNextPage(false);
      handlePlp.setIsRefresh(false);
      handlePlp.setHeaderTitle(handleTitleBreadcrumbs());
      handlePlp.setCodeCategory(handlecategoryID());
      handlePlp.setListProducts(
        handlePlp.handleCompareCodesAux(dataResult.products)
      );
      handlePlp.handleSortBy(dataResult?.sorts, dataResult?.products);
      handlePlp.setQueryFromFilter(dataResult?.currentQuery.query.value);

      onSaveFacets(dataResult?.facets, dataResult?.pagination.totalResults);
      onSaveBreadcrumbs(dataResult?.breadcrumbs);
      handlePlp.setLoadingProduct(true);
      handleSaveHistory();
      handleClose();
      await sleep(600);
      handlePlp.setLoadingProduct(false);
    } else {
      handlePlp.setQueryFromFilter('');
      handleClose();
    }
  };

  const handleExpanded = (value: any) => {
    setIsExpanded({
      ...isExpanded,
      [value]: !isExpanded[value]
    });
  };
  const handleCloseExpanded = () => {
    for (const key in isExpanded) {
      setIsExpanded({ ...isExpanded, [key]: false });
    }
  };

  const handleClose = () => {
    props.onCloseRequest();
    handleCloseExpanded();
  };

  return {
    dataFacet,
    loadingFacet,
    isExpanded,
    handleExpanded,
    handleClose,
    checkFilter,
    dataResult,
    breadcrumbs,
    handleGetProductsService,
    disabledClear,
    handleClearFilters,
    handleShowResults
  };
};
