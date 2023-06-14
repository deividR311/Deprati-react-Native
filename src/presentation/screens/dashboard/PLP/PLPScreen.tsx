import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback
} from 'react';
//hooks
import { useProductList } from './hook/useProductList';
//Libs
import { useNavigation } from '@react-navigation/native';
//components
import Grid from './views/option-grid/Grid';
import BigPhoto from './views/option-bigPhoto/BigPhoto';
import List from './views/option-list/List';
import SkeletonsPLP from './components/skeletons/SkeletonsPLP';
import ButtonsHeader from './components/Buttons/ButtonsHeader';
import { OPTION_SELECTED } from './components/utils/optionsPlp';
import TemplatePage from '../../../common-components/template-page';
import { PLPScreenProps, Product } from './interfaces';
import ComponentSubHeader from './components/subHeader/ComponentSubHeader';
import BottomSheetFilter from './Filter/BottomSheetFilter';
import { useAppDispatch } from '../../../../application/state-manager';
import { setShowLoadingScreen } from '../../../../application/state-manager/services/checkout';

export default function PLPScreen(props?: PLPScreenProps) {
  const [listProductData, setListProductData] = useState<Product[] | null>(
    null
  );
  const {
    headerTitle,
    //data
    loadingProduct,
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
    //favorite
    handleIsLogin,
    loadingFavorite,
    ///
    onPressBack,
    ///
    handlePlp
  } = useProductList(props);
  const navigation = useNavigation();
  const [viewSelect, setViewSelect] = useState<string>(OPTION_SELECTED.GRID);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [hideSearch, setHideSearch] = useState<boolean>(true);

  const headerRight = useCallback(() => {
    return (
      <ButtonsHeader
        onSearch={() => setHideSearch(prev => !prev)}
        onPress={() => setShowFilters(true)}
      />
    );
  }, []);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      headerRight: headerRight,
      headerTitle: headerTitle,
      headerTitleAlign: 'left'
    });
  }, [navigation, headerTitle, handlePlp.historyFilter]);

  useEffect(() => {
    setListProductData(listProducts);
  }, [listProducts]);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      _onPressBack(e);
    });

    return () => {
      navigation.removeListener('beforeRemove', () => {});
    };
  }, [handlePlp.historyFilter]);

  const _onPressBack = (e: any) => {
    if (handlePlp.isClearFilter) return navigation.dispatch(e.data.action);
    if (!onPressBack()) e.preventDefault();
  };

  return (
    <TemplatePage loading={false} noFoundPage={errorProduct}>
      <SkeletonsPLP loading={loadingProduct} selectOp={viewSelect} />

      {!loadingProduct && viewSelect === OPTION_SELECTED.GRID && (
        <Grid
          loading={loadingNextPage}
          nextPage={handleNextPage}
          listProducts={listProductData}
          onAddFavorite={handleIsLogin}
          loadingFavorite={loadingFavorite}
          ListHeader={
            <ComponentSubHeader
              showElementCategory={showElementCategory}
              OnCurrentSort={x =>
                setParamsQuery({ ...paramsQuery, sortByCurrent: x })
              }
              sortByCurrent={paramsQuery.sortByCurrent}
              viewSelect={viewSelect}
              onChange={x => setViewSelect(x)}
              sorts={sorts}
              pageContent={props?.contentPage}
              hideSearch={hideSearch}
            />
          }
        />
      )}
      {!loadingProduct && viewSelect === OPTION_SELECTED.SQUARE && (
        <BigPhoto
          loading={loadingNextPage}
          nextPage={handleNextPage}
          listProducts={listProductData}
          onAddFavorite={handleIsLogin}
          loadingFavorite={loadingFavorite}
          ListHeader={
            <ComponentSubHeader
              showElementCategory={showElementCategory}
              OnCurrentSort={x =>
                setParamsQuery({ ...paramsQuery, sortByCurrent: x })
              }
              sortByCurrent={paramsQuery.sortByCurrent}
              viewSelect={viewSelect}
              onChange={x => setViewSelect(x)}
              sorts={sorts}
              pageContent={props?.contentPage}
              hideSearch={hideSearch}
            />
          }
        />
      )}
      {!loadingProduct && viewSelect === OPTION_SELECTED.LIST && (
        <List
          loading={loadingNextPage}
          nextPage={handleNextPage}
          listProducts={listProductData}
          onAddFavorite={handleIsLogin}
          loadingFavorite={loadingFavorite}
          ListHeader={
            <ComponentSubHeader
              showElementCategory={showElementCategory}
              OnCurrentSort={x =>
                setParamsQuery({ ...paramsQuery, sortByCurrent: x })
              }
              sortByCurrent={paramsQuery.sortByCurrent}
              viewSelect={viewSelect}
              onChange={x => setViewSelect(x)}
              sorts={sorts}
              pageContent={props?.contentPage}
              hideSearch={hideSearch}
            />
          }
        />
      )}
      <BottomSheetFilter
        show={showFilters}
        onCloseRequest={() => setShowFilters(false)}
        handlePlp={handlePlp}
      />
    </TemplatePage>
  );
}
