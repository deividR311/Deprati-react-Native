import { useAppDispatch, useAppSelector } from '../..';
import { pdpSelector, setCoordY, setIsErrorUnselected } from './pdp.slice';

export const useReduxPdp = (): InfoDataFilterPlpHook => {
  const dispatch = useAppDispatch();

  const { isErrorUnselected, coordY } = useAppSelector(pdpSelector);

  const onIsErrorUnselected = (isError: boolean) => {
    dispatch(setIsErrorUnselected(isError));
  };

  const onCoordY = (valueCoordY: number) => {
    dispatch(setCoordY(valueCoordY));
  };

  return {
    //
    onIsErrorUnselected,
    onCoordY,

    isErrorUnselected,
    coordY
  };
};

interface InfoDataFilterPlpHook {
  onIsErrorUnselected(isError: boolean): void;
  onCoordY(valueCoordY: number): void;
  isErrorUnselected: boolean;
  coordY: number;
}

export default useReduxPdp;
