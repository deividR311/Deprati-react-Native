import { ReturnEntryRequest } from '../../../../../infrastucture/apis/myReturns/myReturnsEnter.type';

export interface IHandleGlobal {
  isDisabledAll: boolean;
  sumGlobal: number;
  setSumGlobal(s: number): void;
  isAllItems: boolean;
  setIsAllItems(flag: boolean): void;
  isPressButtonAll: boolean;
  setIsPressButtonAll(flag: boolean): void;
  handleChangeValue(entryNumber: number, value: number): void;
}

export interface IHandleBottomSheet {
  show: boolean;
  ticketNumber: string;
  handleClose(): void;
  handleGoSeeDetails(): void;
  percentage?: number;
}

export interface IValueForItem extends ReturnEntryRequest {
  code?: string;
}

export interface SuccessEnterReturnProps extends IHandleBottomSheet {}
