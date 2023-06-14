import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import DeliverySelect from '../../../../src/presentation/screens/Delivery/DeliverySelect/DeliverySelect';

describe('DeliverySelect', () => {
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
        screen={DeliverySelect}
        initialParams={mockInitParams}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
