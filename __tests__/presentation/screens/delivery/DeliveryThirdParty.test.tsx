import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import DeliveryThirdParty from '../../../../src/presentation/screens/Delivery/DeliveryThirdParty/DeliveryThirdParty';

jest.mock('react-native-select-dropdown', () => {
  const { View } = require('react-native');
  const MockSelectDropdown = (props: any) => {
    return <View>{props.children}</View>;
  };

  return MockSelectDropdown;
});

describe('DeliveryThirdParty', () => {
  const mockInitParams = {
    dataCart: {},
    setTitleContinueButton: jest.fn(),
    enableContinueButton: jest.fn(),
    showActivityIndicatorContinueButton: jest.fn(),
    showTotalsBand: jest.fn(),
    setCurrentStep: jest.fn()
  };

  it('renders correctly in Snapshot Loading', () => {
    const screenTest = render(
      <NavigationWrapper
        screen={DeliveryThirdParty}
        initialParams={mockInitParams}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot', () => {
    const hookApi = require('../../../../src/infrastucture/apis/delivery-thirdparty/delivery-thirdparty.api');
    jest.spyOn(hookApi, 'useGetProvincesMutation').mockReturnValueOnce([
      jest.fn(),
      {
        isLoading: false,
        isSuccess: true,
        data: {
          regions: [
            {
              isocode: 'EC-AZU',
              name: 'Azuay'
            }
          ]
        }
      }
    ]);
    jest
      .spyOn(hookApi, 'useUpdateThirdPartyAgencyMutation')
      .mockReturnValueOnce([
        jest.fn(),
        {
          isLoading: false,
          isSuccess: false,
          data: {}
        }
      ]);

    const screenTest = render(
      <NavigationWrapper
        screen={DeliveryThirdParty}
        initialParams={mockInitParams}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
