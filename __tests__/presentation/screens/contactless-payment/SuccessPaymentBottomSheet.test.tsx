import React from 'react';
import { render } from '@testing-library/react-native';
import { SuccessPaymentBottomSheet } from '../../../../src/presentation/screens/contactless-payment/bottomsheets/success-payment';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';

describe('SuccessPaymentBottomSheet', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(
      <SuccessPaymentBottomSheet
        onCloseRequest={jest.fn()}
        show={true}
        text={'Número de ticket #477987'}
      />,
      { wrapper: NavigationWrapper }
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
