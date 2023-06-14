export interface ResultProducts {
  data: DataGetProducts;
  status: number;
  config: any;
  request: any;
}

export interface DataGetProducts {
  type: string;
  breadcrumbs: Breadcrumb[];
  breadcrumbsHierarchy: BreadcrumbsHierarchy[];
  currentQuery: CurrentQueryClass;
  facets: Facet[];
  freeTextSearch: string;
  pagination: Pagination;
  products: Product[];
  sorts: Sort[];
  categoryCode?: string;
}
export interface DataGetProductsInitial {
  value: DataGetProducts;
  title: string;
}
export interface DataGetProductsCustom {
  breadcrumbsInitial: Breadcrumb[];
  currentQueryInitial: string;
  facetsInitial: Facet[];
  totalResultsInitial: number;
  productsInitial: Product[];
  sortsInitial: Sort[];
  initial: boolean;
}
export interface Product {
  averageRating: number;
  availableForPickup: boolean;
  baseProduct: string;
  code: string;
  description: string;
  images: ImageProduct[];
  installmentCreditoDirecto: string;
  name: string;
  previousPrice: PriceProduct;
  price: PriceProduct;
  priceRange: string;
  stock: Stock;
  tagUrl: string;
  url: string;
  variantColorAltTextImages?: string[];
  variantColorImages?: string[];
  volumePricesFlag: boolean;
  isFavorite?: boolean;
}

export interface ImageProduct {
  altText: string;
  format: string;
  imageType: string;
  url: string;
}

export interface Sort {
  code: string;
  name: string;
  selected: boolean;
}

export interface PriceProduct {
  currencyIso: string;
  value: number;
  formattedValue?: string;
  priceType?: string;
}
export interface Breadcrumb {
  facetCode: string;
  facetName: string;
  facetValueCode: string;
  facetValueName: string;
  removeQuery: CurrentQueryClass;
}

export interface BreadcrumbsHierarchy {
  linkClass: string;
  name: string;
  url: string;
}

export interface CurrentQueryClass {
  query: CurrentQueryQuery;
  url: string;
}

export interface CurrentQueryQuery {
  value: string;
}

export interface Facet {
  category: boolean;
  multiSelect: boolean;
  name: string;
  priority: number;
  values: ValueFacet[];
  visible: boolean;
}

export interface ValueFacet {
  count: number;
  name: string;
  query: CurrentQueryClass;
  selected: boolean;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
  totalResults: number;
}

export interface Stock {
  stockLevelStatus: StockLevelStatus;
  stockLevel?: number;
}

export enum StockLevelStatus {
  InStock = 'inStock',
  LowStock = 'lowStock'
}

export interface SortBy {
  title: string;
  code: string;
}

export interface ResultError {
  config: any;
  request: any;
  response: ResponseError;
}

export interface ResponseError {
  data: null;
  status: number;
  statusText: undefined;
}
export interface FiltrosPLP {
  valueFacet: Facet[];
  totalResults: number;
}
