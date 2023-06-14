import { useSelector } from 'react-redux';
import { useAppDispatch } from '../..';
import {
  InitialLocalStorage,
  LocalStorageHook,
  LocalStorageKey,
  LocalStorageParams,
  LocalStorageType
} from './interface';
import {
  localStorageStateSelector,
  readAndStorageInState as _readAndStorageInState,
  save as saveInStorageAndState
} from './localstorage.slice';

export const useLocalStorage = (): LocalStorageHook => {
  const dispatch = useAppDispatch();
  const localStorageData = useSelector(localStorageStateSelector);

  const save = async (values: Partial<LocalStorageType>) => {
    return await dispatch(saveInStorageAndState(values));
  };

  const remove = async (keys: LocalStorageKey[]) => {
    const values = keys.reduce(
      (acc, key) => ({ ...acc, [key]: InitialLocalStorage[key] }),
      {} as LocalStorageParams
    );
    return await dispatch(saveInStorageAndState(values));
  };

  const readAndStorageInState = async () => {
    return await dispatch(_readAndStorageInState());
  };

  const fullClean = async () => {
    return await dispatch(saveInStorageAndState(InitialLocalStorage));
  };

  return {
    localStorageData,
    save,
    remove,
    readAndStorageInState,
    fullClean
  };
};
