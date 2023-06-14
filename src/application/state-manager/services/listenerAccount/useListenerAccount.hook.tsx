import { useAppDispatch, useAppSelector } from '../..';
import {
  listenerAccountSelector,
  setIsComesFromPaying
} from './listenerAccount.redux';

export const useListenerAccount = (): IListenerAccountHook => {
  const dispatch = useAppDispatch();
  const { isComesFromPaying } = useAppSelector(listenerAccountSelector);

  const onIsComesFromPaying = (flag: boolean) =>
    dispatch(setIsComesFromPaying(flag));

  return { onIsComesFromPaying, isComesFromPaying };
};

interface IListenerAccountHook {
  onIsComesFromPaying(x: boolean): void;
  isComesFromPaying: boolean;
}
