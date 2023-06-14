import { useAppDispatch, useAppSelector } from '../..';
import {
  Breadcrumb,
  DataGetProducts,
  Facet
} from '../../../../presentation/screens/dashboard/PLP/interfaces';
import {
  setFacetPlp,
  setFacetInitalPlp,
  setBreadcrumbs,
  hasCategoryGiftCard,
  filterPlpSelector,
  setInitialHistory
} from './filterPlp.slice';
import { FilterState, IHistoryFilter } from './IFilterPlp.slice.interface';
import { loadingPlpSelector, setReloadingPlp } from './loadingPlp.slice';

export const useReduxPlp = (): InfoDataFilterPlpHook => {
  const dispatch = useAppDispatch();

  const { reloading } = useAppSelector(loadingPlpSelector);
  const dataFilterPlp = useAppSelector(filterPlpSelector);
  // const filterPlpSelector = (state: RootState) => state.filterPlpSlice

  const onSaveFacets = (facets: Facet[], total: number) => {
    dispatch(
      setFacetPlp({
        valueFacet: facets,
        totalResults: total
      })
    );
  };

  const onSaveFacetsInitial = (value: DataGetProducts, title: string) => {
    dispatch(
      setFacetInitalPlp({
        valueInitial: value,
        title
      })
    );
  };

  const onSaveBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
    dispatch(setBreadcrumbs(breadcrumbs));
  };

  const onSaveHasCategoryGiftCard = (value: boolean) => {
    dispatch(
      hasCategoryGiftCard({
        isCategoryGiftCard: value
      })
    );
  };

  const onReloadingPlp = (value: boolean) => {
    dispatch(setReloadingPlp(value));
  };

  const onSaveInitialHistory = (initialHistory: IHistoryFilter[]) => {
    dispatch(setInitialHistory({ valueInitial: initialHistory }));
  };

  return {
    //
    onSaveFacets,
    onSaveFacetsInitial,
    onSaveBreadcrumbs,
    onSaveHasCategoryGiftCard,
    onSaveInitialHistory,
    //
    reloading,
    onReloadingPlp,
    //
    dataFilterPlp,
    isCategoryGiftCard: dataFilterPlp.isCategoryGiftCard
  };
};

interface InfoDataFilterPlpHook {
  onSaveFacets(facets: Facet[], total: number): void;
  onSaveFacetsInitial(value: DataGetProducts, title: string): void;
  onSaveBreadcrumbs(breadcrumbs: Breadcrumb[]): void;
  onSaveHasCategoryGiftCard(value: boolean): void;
  onSaveInitialHistory(initialHistory: IHistoryFilter[]): void;
  //
  reloading: boolean;
  onReloadingPlp(value: boolean): void;
  dataFilterPlp: FilterState;
  isCategoryGiftCard: boolean;
}

export default useReduxPlp;
