import { PriceProduct } from '../../../infrastucture/apis/product/product.type';
import { ExtensionComponentProps } from '../extension-component';

export interface Props {
  customProps: customProp;
}

export interface customProp extends ExtensionComponentProps {}

export interface IResponseProductsCarousel {
  data: Data;
}

export interface Data {
  type: string;
  breadcrumbsHierarchy: BreadcrumbsHierarchy[];
  freeTextSearch: string;
  pagination: Pagination;
  products: IProductsCarousel[];
}

export interface BreadcrumbsHierarchy {
  linkClass: string;
  name: string;
  url: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
  totalResults: number;
}

export interface IProductsCarousel {
  code: string;
  ean: string;
  images: Image[];
  name: string;
  url: string;
  variantColorImages: string[];
  price: PriceProduct;
}

export interface Image {
  altText: string;
  format: string;
  imageType: string;
  url: string;
}
