interface IErrorData {
  success: boolean;
  message: string;
  Message: string;
}

export interface IErrorCredit {
  status: number;
  data: IErrorData;
}
