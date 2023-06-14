import React from 'react';
import { render } from '@testing-library/react-native';
import { DataMock_PLP_Params } from '../../../../../__mocks__/dataMock-Plp';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import PLPScreen from '../../../../../src/presentation/screens/dashboard/PLP/PLPScreen';

const { pageContent } = DataMock_PLP_Params;
const ReturnPLPScreen = () => {
  return <PLPScreen contentPage={pageContent} />;
};

let screenTest: any;
describe('PLPScreen', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        initialParams={DataMock_PLP_Params}
        screen={ReturnPLPScreen}
      />
    );
  });

  // it('renders correctly in Snapshot', () => {
  //   screenTest = render(<NavigationWrapper screen={PLPScreen} />)
  //   expect(screenTest.toJSON()).toMatchSnapshot()
  // })

  it('select OrderBy', async () => {
    const { getByText } = screenTest;
    expect(getByText('Ordenar por')).toBeDefined();
  });

  it('SearchInput', async () => {
    const { getByText } = screenTest;
    expect(getByText(/busca aquí/i)).toBeDefined();
  });

  it('Simple Banner', async () => {
    const { getAllByTestId } = screenTest;
    expect(getAllByTestId('simple-banner')).toBeDefined();
  });
});
