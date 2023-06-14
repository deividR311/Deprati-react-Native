import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import DeliveryAddress from '../../../../src/presentation/screens/Delivery/DeliveryAddress/DeliveryAddress';

describe('DeliveryAddress', () => {
  const mockInitParams = {
    dataCart: {},
    setTitleContinueButton: jest.fn(),
    enableContinueButton: jest.fn(),
    showActivityIndicatorContinueButton: jest.fn(),
    showTotalsBand: jest.fn(),
    setCurrentStep: jest.fn()
  };

  it('renders correctly in Snapshot', () => {
    const screenTest = render(
      <NavigationWrapper
        screen={DeliveryAddress}
        initialParams={mockInitParams}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
