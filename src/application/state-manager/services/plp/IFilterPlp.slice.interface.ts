import {
  Breadcrumb,
  DataGetProducts,
  Facet,
  Product,
  Sort
} from '../../../../presentation/screens/dashboard/PLP/interfaces/iProducts';
import { iParamsPlp } from '../../../../presentation/screens/dashboard/PLP/components/utils/optionsPlp';

interface IValueInitial {
  value: DataGetProducts;
  title: string;
}
interface IValueInitialHistory {
  value: IHistoryFilter[];
}
export interface FilterState {
  valueFacet: Facet[];
  totalResults: number;
  valueInitial: IValueInitial;
  breadcrumbs: Breadcrumb[];
  isCategoryGiftCard: boolean;
  initialHistory: IValueInitialHistory;
}

export interface IHistoryFilter {
  listProducts: Product[];
  codeCategory?: string;
  title: string;
  currentQuery: string;
  paramsQuery: iParamsPlp;
  sorts: Sort[];
  facets: Facet[];
  totalResults: number;
}
