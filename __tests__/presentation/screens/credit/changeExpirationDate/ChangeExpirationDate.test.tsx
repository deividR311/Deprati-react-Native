import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { ChangeExpirationDateScreen } from '../../../../../src/presentation/screens/Credit/ChangeExpirationDate/ChangeExpirationDateScreen';
import { useChangeExpirationDate } from '../../../../../src/presentation/screens/Credit/ChangeExpirationDate/hook/useChangeExpirationDate.hook';
import { DataMock_ChangeExpirationDate } from '../../../../../__mocks__/dataMock-ChangeExpirationDate';

jest.mock(
  '../../../../../src/presentation/screens/Credit/ChangeExpirationDate/hook/useChangeExpirationDate.hook'
);

jest.mock('react-native-select-dropdown', () => {
  const { View } = require('react-native');
  const MockSelectDropdown = (props: any) => {
    return <View>{props.children}</View>;
  };

  return MockSelectDropdown;
});

describe('ChangeExpirationDate', () => {
  it('renders correctly in Snapshot', () => {
    useChangeExpirationDate.mockImplementation(
      () => DataMock_ChangeExpirationDate
    );

    const screenTest = render(
      <NavigationWrapper screen={ChangeExpirationDateScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
