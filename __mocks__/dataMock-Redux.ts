export const DataMock_ContactlessPayment = {
  tabbar: {
    currentTab: '',
    disableNextButton: false,
    disablePreviousButton: false
  },
  bottomSheetState: {
    identityValidationIsOpen: false,
    successBuyIsOpen: false,
    successBuyText: '',
    successBuyTicketId: ''
  },
  enableConfirmPurchaseButton: false
};

enum BottomSheetType {
  IDENTITY_VALIDATION = 'IDENTITY_VALIDATION',
  SUCCESS_BUY = 'SUCCESS_BUY'
}

export const payloadCase1 = {
  bottomSheet: BottomSheetType.IDENTITY_VALIDATION,
  show: true,
  text: 'textoQwerty',
  ticketId: 'textTicketId'
};

export const payloadCase2 = {
  bottomSheet: BottomSheetType.SUCCESS_BUY,
  show: true,
  text: 'textoQwerty',
  ticketId: 'textTicketId'
};
