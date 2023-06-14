import { useAppDispatch, useAppSelector } from '../..';
import {
  servicesCreditSelector,
  setTitleService
} from './servicesCredit.slice';

export const useServicesCreditRedux = (): useServicesCreditReduxHook => {
  const dispatch = useAppDispatch();
  const { titleScreen } = useAppSelector(servicesCreditSelector);

  const onSetTitleScreenService = (_titleScreen: string) =>
    dispatch(setTitleService(_titleScreen));

  return { titleScreen, onSetTitleScreenService };
};

interface useServicesCreditReduxHook {
  onSetTitleScreenService(titleScreen: string): void;
  titleScreen: string;
}
