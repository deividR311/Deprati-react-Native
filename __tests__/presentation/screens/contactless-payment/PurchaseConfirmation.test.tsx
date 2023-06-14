import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { PurchaseConfirmation } from '../../../../src/presentation/screens';

const dirMockHook =
  '../../../../src/presentation/screens/contactless-payment/hooks/usePurchaseConfirmation.hook';
jest.mock(dirMockHook, () => ({
  usePurchaseConfirmation: jest.fn().mockReturnValue({
    isLoadingByAccept: false,
    isLoadingByReject: false,
    isLoadingByTicket: false,
    hasError: false,
    ticket: {},
    doAcceptPurchase: jest.fn(),
    doRejectPurchase: jest.fn()
  })
}));

describe('PurchaseConfirmation', () => {
  beforeEach(() => {});
  it('renders correctly in Snapshot', () => {
    jest
      .spyOn(require(dirMockHook), 'usePurchaseConfirmation')
      .mockReturnValueOnce({
        isLoadingByAccept: false,
        isLoadingByReject: false,
        isLoadingByTicket: false,
        ticket: {}
      });
    const screenTest = render(
      <NavigationWrapper screen={PurchaseConfirmation} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot has error', () => {
    jest
      .spyOn(require(dirMockHook), 'usePurchaseConfirmation')
      .mockReturnValueOnce({
        hasError: true
      });
    const screenTest = render(
      <NavigationWrapper screen={PurchaseConfirmation} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
