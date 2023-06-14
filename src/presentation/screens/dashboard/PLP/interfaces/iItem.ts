import { Product } from './iProducts';

export interface ItemPlpProps {
  data: Product;
  onAddFavorite(code: string, fav?: boolean): void;
  loadingFavorite: ILoadingFavorite;
  testId: string;
}

export interface ILoadingFavorite {
  loadingAdd: boolean;
  loadingDelete: boolean;
}
export interface PLPScreenProps {
  categoryID?: string;
  title?: string;
  contentPage?: any;
  linkElemnt?: string;
  queryID?: string;
  searchID?: string;
}
