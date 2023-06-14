import { COLORS } from '../../../../../../application/common/colors';

export enum OPTION_SELECTED {
  GRID = 'GRID',
  SQUARE = 'SQUARE',
  LIST = 'LIST'
}

export enum PARAMS_INITIAL {
  CODECATEGORY_EMPTY = '',
  ORDER_EMPTY = '',
  PAGE_INITIAL = 0
}

export const OPTION_COLOR = {
  ACTIVE: COLORS.DARK70,
  INACTIVE: COLORS.GRAYDARK60
};

export interface iGroupShowPlp {
  grid: string;
  square: string;
  list: string;
}

export interface iParamsPlp {
  codeCatergory: string;
  sortByCurrent: string;
  currentPage: number;
  pageSize: number;
}

export const GIFTCARD = 'giftCardCategory';
