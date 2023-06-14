import { useAppDispatch, useAppSelector } from '../..';
import {
  creditBalanceSelector,
  ICreditBalancePayload,
  setInfoCreditBalance
} from './creditBalance.redux';

export const useInfoCreditBalance = (): InfoCreditBalanceHook => {
  const dispatch = useAppDispatch();
  const { infoCreditBalance } = useAppSelector(creditBalanceSelector);

  const onSaveInfoCreditBalance = (
    dataInfoCreditBalance: ICreditBalancePayload
  ) => dispatch(setInfoCreditBalance(dataInfoCreditBalance));

  return { infoCreditBalance, onSaveInfoCreditBalance };
};

interface InfoCreditBalanceHook {
  onSaveInfoCreditBalance(x: ICreditBalancePayload): void;
  infoCreditBalance: ICreditBalancePayload;
}
