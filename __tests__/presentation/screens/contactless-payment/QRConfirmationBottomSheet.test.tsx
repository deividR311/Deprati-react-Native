import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { QRShareScreen } from '../../../../src/presentation/screens/contactless-payment/qr-confirmation';

let screenTest: any;

describe('QRConfirmationBottomSheet', () => {
  it('renders correctly in Snapshot', () => {
    screenTest = render(<NavigationWrapper screen={QRShareScreen} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
