import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import StorePickupScreen from '../../../../src/presentation/screens/Delivery/DeliveryStorePickup/StorePickupScreen';

const hookApi =
  '../../../../src/infrastucture/apis/checkout/pickupStore/pointOfService.api';
jest.mock(hookApi, () => ({
  useLazyPickupStoreRequest: () => [
    jest.fn(),
    {
      data: {
        posGroups: []
      },
      isLoading: true,
      isSuccess: false,
      isError: false
    }
  ],
  useSelectPOSRequest: () => [
    jest.fn(),
    {
      data: {
        data: {}
      },
      isLoading: false,
      isSuccess: false,
      isError: false
    }
  ]
}));

describe('DeliveryStorePickup', () => {
  const mockInitParams = {
    dataCart: {},
    setTitleContinueButton: jest.fn(),
    enableContinueButton: jest.fn(),
    showActivityIndicatorContinueButton: jest.fn(),
    showTotalsBand: jest.fn(),
    setCurrentStep: jest.fn()
  };

  it('renders correctly in Snapshot Loaging', () => {
    const screenTest = render(
      <NavigationWrapper
        screen={StorePickupScreen}
        initialParams={mockInitParams}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  /*  it('renders correctly in Snapshot', () => {
    jest
      .spyOn(require(hookApi), 'useLazyPickupStoreRequest')
      .mockReturnValueOnce([
        jest.fn(),
        {
          isLoading: false,
          isSuccess: true,
          isError: false,
          data: {
            posGroups: [{ code: 'cali', name: 'cali', postList: [] }],
          },
        },
      ])
    const screenTest = render(
      <NavigationWrapper
        screen={StorePickupScreen}
        initialParams={mockInitParams}
      />,
    )
    expect(screenTest?.toJSON()).toMatchSnapshot()
  }) */
});
