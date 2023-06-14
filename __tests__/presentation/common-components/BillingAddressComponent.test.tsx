import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import {
  BillingAddressComponent,
  useBillingAddress
} from '../../../src/presentation/common-components/billingAddress';
import {
  DataMock_BillingAddressComponent,
  DataMock_useBillingAddress
} from '../../../__mocks__/dataMock-CommonComponents';

jest.mock(
  '../../../src/presentation/common-components/billingAddress/useBillingAddress.hook'
);

let screenTest: any;

describe('BillingAddressComponent', () => {
  beforeEach(() => {
    //@ts-ignore
    useBillingAddress.mockImplementation(() => ({
      ...DataMock_useBillingAddress
    }));
  });
  it('renders correctly BillingAddressComponent in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <BillingAddressComponent {...DataMock_BillingAddressComponent} />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});

describe('', () => {
  beforeEach(() => {
    //@ts-ignore
    useBillingAddress.mockImplementation(() => ({
      ...DataMock_useBillingAddress,
      addressPaymentList: {
        default: null,
        others: [],
        existsAddress: true,
        loading: true
      }
    }));
  });
  it('renders with default valules', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <BillingAddressComponent styleSecundaryButton />}
      />
    );
    fireEvent.press(screenTest.getByText('Agregar dirección de facturación'));
  });
});
