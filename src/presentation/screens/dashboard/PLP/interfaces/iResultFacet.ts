import { IHistoryFilter } from '../../../../../application/state-manager/services/plp/IFilterPlp.slice.interface';
import { iParamsPlp } from './../components/utils/optionsPlp';
import { Breadcrumb, Facet, Product, Sort } from './iProducts';

export interface ResultFacet {
  facets: Facet[];
  products: Product[];
  sorts: Sort[];
  currentQuery: string;
  totalProducts: number;
  breadcrumbs: Breadcrumb[];
}

export interface InitalFacet {
  valueFacetInitial: Facet[];
  totalResultsInitial: number;
  initital: boolean;
}

export interface PropsModalFilter {
  onCloseRequest(): void;
  show: boolean;
  handlePlp: {
    setListProducts(list: Product[]): void;
    handleSortBy(_sorts: Sort[], _products: Product[]): void;
    setCodeCategory(codeCategory?: string): void;
    headerTitle: string;
    setHeaderTitle(title: string): void;
    setQueryFromFilter(query: string): void;
    setIsRefresh(query: boolean): void;
    paramsQuery: iParamsPlp;
    setParamsQuery(x: iParamsPlp): void;
    historyFilter: IHistoryFilter[];
    setHistoryFilter(histoy: IHistoryFilter[]): void;
    setLoadingProduct(loading: boolean): void;
    setIsClearFilter(isClear: boolean): void;
    handleCompareCodesAux(list: Product[]): Product[];
    setBlockNextPage(isblock: boolean): void;
  };
}
