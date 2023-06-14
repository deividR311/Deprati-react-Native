import { IDeferredList } from '../../../../../infrastucture/apis/precancellation/precancellation.type';

export interface IDeferredListModify extends IDeferredList {
  option: ISelected;
}
export enum OPTION_SELECTED {
  P = 'P',
  X = 'X',
  EMPTY = ''
}

export interface ISelected {
  isSelected: boolean;
  isModify: boolean;
}
export interface IFooterPreCancel {
  totalSel: number;
  totalDeferred: number;
}
export interface IHandleGlobalPreCancel {
  isAllItems: boolean;
  isPressButtonAll: boolean;
  setIsPressButtonAll(buttonAll: boolean): void;
  handleIsAllItems(): void;
  handleItemsSelected(item: IDeferredList, sel: boolean): void;
}

export interface ILoadingsPreCancel {
  isLoadingDeferredList: boolean;
  isLoadingRegisterTicket: boolean;
}

export interface IErrorsPreCancel {
  isErrorDeferredList: boolean;
}
