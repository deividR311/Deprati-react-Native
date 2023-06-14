export interface LoginBottomSheetProps {
  onRequestClose(success?: boolean): void;
  show: boolean;
}

export type LoginMechanism = 'biometric' | 'credentials';
