import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import MyOrdersScreen from '../../../../src/presentation/screens/account/MyOrders/MyOrdersScreen';
import NoOrders from '../../../../src/presentation/screens/account/MyOrders/components/NoOrders';
import OrderContactless from '../../../../src/presentation/screens/account/MyOrders/components/OrderContactless';
import OrderOnline from '../../../../src/presentation/screens/account/MyOrders/components/OrderOnline';
const dirMockHookOnline =
  '../../../../src/presentation/screens/account/MyOrders/hooks/useCustomerOrders.hook';
const dirMockContactlessTickets =
  '../../../../src/infrastucture/apis/contactless-payment';
const dirMockCustomerOrders =
  '../../../../src/infrastucture/apis/customer-orders';

jest.mock('react-native-select-dropdown', () => {
  const { View } = require('react-native');
  const MockSelectDropdown = (props: any) => {
    return <View>{props.children}</View>;
  };

  return MockSelectDropdown;
});

const mockReturnHook = {
  handleGetCustomerOrders: jest.fn(),
  isErrorResult: false,
  isLoading: false,
  isSuccess: true,
  enableValidation: true,
  VALUE_INITIAL: 0,
  MAXORDER_ACTIVE: 2,
  MAXORDER_MADE: 1,
  ordersActive: [
    {
      paymentStatusDisplay: 'Pagado',
      placed: '2023-02-24T19:24:18+0000',
      status: 'PAYMENT_CAPTURED',
      statusDisplay: 'processing',
      totalUnitCount: 1,
      code: '4775012',
      total: {
        formattedValue: '$20,00'
      }
    }
  ],
  ordersMade: [],
  filteredOrdersMade: () => [],
  nextPage: jest.fn(),
  prevPage: jest.fn(),
  changePage: jest.fn(),
  handleMaxPage: jest.fn(),
  currentPage: 0,
  sizeDataActive: 2,
  setSizeDataActive: jest.fn(),
  handleShow: {
    handleShowMoreLess: jest.fn(),
    handleTitleMoreLess: jest.fn()
  }
};

describe('MyOrdersScreen', () => {
  it('renders correctly in Snapshot Order Online', () => {
    jest
      .spyOn(require(dirMockHookOnline), 'useCustomerOrders')
      .mockReturnValueOnce({
        ...mockReturnHook,

        ordersMade: [
          {
            paymentStatusDisplay: 'Pagado',
            placed: '2023-02-24T19:24:18+0000',
            status: 'PAYMENT_CAPTURED',
            statusDisplay: 'processing',
            totalUnitCount: 1,
            code: '4775012',
            total: {
              formattedValue: '$20,00'
            },
            asmAgent: 'agente'
          },
          {
            paymentStatusDisplay: 'Pagado',
            placed: '2023-02-24T19:24:18+0000',
            status: 'PAYMENT_CAPTURED',
            statusDisplay: 'processing',
            totalUnitCount: 1,
            code: '49595959',
            total: {
              formattedValue: '$20,00'
            }
          }
        ],
        filteredOrdersMade: () => [
          {
            paymentStatusDisplay: 'Pagado',
            placed: '2023-02-24T19:24:18+0000',
            status: 'PAYMENT_CAPTURED',
            statusDisplay: 'processing',
            totalUnitCount: 1,
            code: '4775012',
            total: {
              formattedValue: '$20,00'
            },
            asmAgent: 'agente'
          }
        ]
      });
    const screenTest = render(<NavigationWrapper screen={MyOrdersScreen} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Order Online Skeleton', () => {
    jest
      .spyOn(require(dirMockCustomerOrders), 'useLazyCustomerOrdersRequest')
      .mockReturnValueOnce([
        jest.fn(),
        {
          data: {
            orders: [],
            pagination: {},
            sorts: []
          },
          isLoading: true,
          isSuccess: false
        }
      ]);
    const screenTest = render(<OrderOnline />, { wrapper: NavigationWrapper });
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Order Online No Order', () => {
    const screenTest = render(<NoOrders />, { wrapper: NavigationWrapper });
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Order Contactless status Empty ', () => {
    const screenTest = render(<OrderContactless />, {
      wrapper: NavigationWrapper
    });
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Order Contactless ', () => {
    jest
      .spyOn(require(dirMockContactlessTickets), 'useContactlessTicketsRequest')
      .mockReturnValueOnce([
        jest.fn(),
        {
          data: {
            data: [
              {
                fechaCadena: '07/03/2023 - 13:57',
                tienda: 'LUQUE MODA',
                totalConIva: 6.81
              }
            ]
          },
          isLoading: false,
          isSuccess: true
        }
      ]);
    const screenTest = render(<OrderContactless />, {
      wrapper: NavigationWrapper
    });
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Order Contactless Skeleton ', () => {
    jest
      .spyOn(require(dirMockContactlessTickets), 'useContactlessTicketsRequest')
      .mockReturnValueOnce([
        jest.fn(),
        {
          data: {
            data: []
          },
          isLoading: true
        }
      ]);
    const screenTest = render(<OrderContactless />, {
      wrapper: NavigationWrapper
    });
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
