export interface DirectCreditResponse {
  [key: string]: any;
}

export interface DirectCreditRequest {
  directCredit: {
    directCreditCodeAdditional: string;
    directCreditCodeCustomer: string;
    directCreditCurrentDeviceId: string;
  };
}
