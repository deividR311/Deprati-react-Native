export const DataMock_ChangeExpirationDate = {
  TEXT_NEWDATE: 'Selecciona el día',
  infoCreditBalance: {
    clientName: 'PATRICIA L. DE UGALDE',
    cardNumber: '1xxxxx6',
    affiliateDate: '2000',
    totalAmount: '5.500,00',
    amountSpent: '724,35',
    aditional: '00',
    availableAmount: '4.775,65',
    pastDueDays: 0,
    nextPayDay: 'Abril 14 de 2023',
    nextAmountToPay: '105,08',
    numeroTarjetaAdicionalDisplay: '14XXX86 00',
    clientFirstName: 'Prueba'
  },
  dataCurrentDate: {
    cuttingDay: 14,
    dueDate: '20230514',
    day: '14'
  },
  dataChangeDate: null,
  selectedDay: '2',
  isAcceptTerms: false,
  showWarning: false,
  isLoadingChangeDate: false,
  isLoadingCurrentDate: false,
  showSucces: false,
  showErrorSucces: false,
  expirationDateContent: {
    legend:
      'No puedes cambiar tu fecha máxima de pago si tienes una deuda pendiente y <b>este cambio se hará efectivo a partir del próximo mes.</b>',
    popup_title:
      '¿Estás seguro de cambiar la fecha máxima de pago de tu crédito De Prati?',
    popup_paragraphs: [
      'Ten en cuenta:',
      '1. Esta acción no se puede deshacer y el cambio se hará efectivo a partir de tu próximo mes.',
      '2. Si haces el cambio de fecha <b>deberás pagar la cuota del mes en curso</b> y este cambio se hará efectivo a partir del próximo mes.'
    ],
    popup_accept_action: 'SI, ESTOY DE ACUERDO',
    popup_cancel_action: 'NO, CANCELAR'
  },
  selectRef: {
    current: {
      reset: jest.fn(),
      openDropdown: jest.fn(),
      closeDropdown: jest.fn()
    }
  },
  setSelectedDay: jest.fn(),
  setIsAcceptTerms: jest.fn(),
  handleChangeDate: jest.fn(),
  setShowWarning: jest.fn(),
  handleCloseSuccess: jest.fn(),
  handleCloseError: jest.fn(),
  handleCloseWarning: jest.fn()
};
