import { FormikErrors, FormikTouched } from 'formik';

export interface ICertificateCreditHook {
  isLoadingMail: boolean;
  padding: number;
  changeOption: (key: string) => void;
  checkboxs: TypeCheckboxs;
  errors: FormikErrors<IValuesInputs>;
  touched: FormikTouched<IValuesInputs>;
  globalError: boolean;
  values: IValuesInputs;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IValuesInputs>>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  dataCheckMail: any;
  handleOpenWhatsapp: () => void;
  openUrl: (urlLink?: string) => Promise<boolean>;
  handleAceptTerms(valueCheck: boolean): void;
  checkDefault: boolean;
  activeAction: boolean | string;
  onPressGenerate: () => Promise<void>;
  isLoadingSend: boolean;

  errorMail: any;
  closeModaError: () => void;

  dataSend: any;
  showSuccesPopUp: boolean;
  closeSuccessPopUp: () => void;

  showModaErrorCrediCertificate: boolean;
  errorSend: any;
  closeModaErrorCrediCertificate: () => void;
  showModaError: boolean;

  textCertificate: ITextCertificate;
  COMMERCIAL_REFERENCE: string;
  CREDIT_PER_DAY: string;
  onCloseModalConfirm: () => void;
  showModalConfirm: boolean;
  onOpenModalConfirm: () => void;
  colorsButton: IColorsButton;
  showModalWhatsApp: boolean;
}

export interface IValuesInputs {
  email: string;
  reference: string;
}

export type TypeCheckboxs = {
  commercialReference: boolean;
  creditPerDay: boolean;
};

export interface IColorsButton {
  backgroundColor: string;
  textColor: string;
  color: string;
}
export interface ITextCertificate {
  confirm: string[];
  textCost: string;
  textAlert: string;
  cost: string;
}
