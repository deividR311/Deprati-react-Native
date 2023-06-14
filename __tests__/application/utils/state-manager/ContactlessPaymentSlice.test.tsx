import {
  DataMock_ContactlessPayment,
  payloadCase1,
  payloadCase2
} from '../../../../__mocks__/dataMock-Redux';
import store from '../../../../src/application/state-manager';
import contactlessPaymentSlice, {
  showBottomSheet
} from '../../../../src/application/state-manager/services/contactless-payment/contactless-payment.slice';

describe('contactlessPaymentSlice redux', () => {
  it('Should initially set contactlessPaymentSlice with initial data', () => {
    const state = store.getState().contactlessPaymentSlice;
    expect(state.bottomSheetState).toEqual({
      identityValidationIsOpen: false,
      successBuyIsOpen: false,
      successBuyText: '',
      successBuyTicketId: ''
    });
  });

  it('Should return showBottomSheet case 1 output', () => {
    const action = showBottomSheet(payloadCase1);
    const result = contactlessPaymentSlice(undefined, action);
    expect(result).toEqual({
      ...DataMock_ContactlessPayment,
      bottomSheetState: {
        identityValidationIsOpen: true,
        successBuyIsOpen: false,
        successBuyText: '',
        successBuyTicketId: ''
      }
    });
  });

  it('Should return showBottomSheet case 2 output', () => {
    const action = showBottomSheet(payloadCase2);
    const result = contactlessPaymentSlice(undefined, action);
    expect(result).toEqual({
      ...DataMock_ContactlessPayment,
      bottomSheetState: {
        identityValidationIsOpen: false,
        successBuyIsOpen: true,
        successBuyText: 'textoQwerty',
        successBuyTicketId: 'textTicketId'
      }
    });
  });
});
