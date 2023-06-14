import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import BottomSheetFilter from '../../../../../src/presentation/screens/dashboard/PLP/Filter/BottomSheetFilter';
import { useFilterPLP } from '../../../../../src/presentation/screens/dashboard/PLP/hook/useFilterPLP';
import { DataMock_PLP } from '../../../../../__mocks__/dataMock-Plp';

jest.mock(
  '../../../../../src/presentation/screens/dashboard/PLP/hook/useFilterPLP'
);
let screenTest: any;
describe('BottomSheetFilter PLP', () => {
  it('renders correctly in Snapshot', () => {
    useFilterPLP.mockImplementation(() => ({
      dataFacet: {
        valueFacet: DataMock_PLP.facets,
        totalResults: DataMock_PLP.pagination.totalResults
      },
      loadingFacet: false,
      checkFilter: {
        XS: true,
        Nuevo: true,
        '$0-$21': true
      },
      isExpanded: {
        talla: true,
        Nuevo: true,
        Precio: true
      },
      dataResult: DataMock_PLP,
      breadcrumbs: DataMock_PLP.breadcrumbs,
      disabledClear: false,
      handleExpanded: jest.fn(),
      handleClose: jest.fn(),
      handleGetProductsService: jest.fn(),
      handleClearFilters: jest.fn(),
      handleShowResults: jest.fn()
    }));

    screenTest = render(<NavigationWrapper screen={BottomSheetFilter} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
