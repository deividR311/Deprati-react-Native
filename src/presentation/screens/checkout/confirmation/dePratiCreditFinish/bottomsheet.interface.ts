import { UseConfirmationHook } from '../confirmation.hook';

export interface Props {
  infoUserCredit?: any;
  show: boolean;
  hook: UseConfirmationHook;
  onCloseRequest: () => void;
}
