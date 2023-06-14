import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { TicketDetail } from '../../../../src/presentation/screens/contactless-payment/ticket-detail';
import {
  TicketDetailItems,
  TicketPromotions
} from '../../../../src/presentation/screens/contactless-payment/components';
const dirMockHook =
  '../../../../src/presentation/screens/contactless-payment/ticket-detail/ticket-detail.hook';

describe('TicketDetail', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={TicketDetail} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot Loadind Skeleton', () => {
    jest.spyOn(require(dirMockHook), 'useTicketDetail').mockReturnValueOnce({
      isLoading: true
    });
    const screenTest = render(<NavigationWrapper screen={TicketDetail} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('should render promotions and total when provided', () => {
    const ticket = {
      arregloPromocion: [
        { descripcion: 'Promo 1', valorDisplay: -10 },
        { descripcion: 'Promo 2', valorDisplay: 20 },
        { descripcion: 'Total', valorDisplay: 30 }
      ]
    };
    const { getByText, toJSON } = render(<TicketPromotions ticket={ticket} />);
    expect(getByText('Promociones aplicadas a tu compra')).toBeTruthy();
    expect(getByText('Promo 1')).toBeTruthy();
    expect(getByText('Promo 2')).toBeTruthy();
    expect(getByText('Total:')).toBeTruthy();
    expect(getByText('-$10,00')).toBeTruthy();
    expect(getByText('$20,00')).toBeTruthy();
    expect(getByText('$30,00')).toBeTruthy();
  });

  it('should render promotions and no total', () => {
    const ticket = {
      arregloPromocion: [
        { descripcion: 'Promo 1', valorDisplay: null },
        { descripcion: 'Promo 2', valorDisplay: null }
      ]
    };
    const { getByText, toJSON } = render(<TicketPromotions ticket={ticket} />);
    expect(getByText('Promociones aplicadas a tu compra')).toBeTruthy();
    expect(getByText('Promo 1')).toBeTruthy();
    expect(getByText('Promo 2')).toBeTruthy();
  });

  it('renders the component with the correct props', () => {
    const ticket = {
      arregloDetalle: [
        {
          codigo: 123,
          nombreItem: 'Test item',
          cantidad: 1,
          precioUnitario: 10.0,
          subtotal: 10.0,
          porcDescuentoDisplay: '0%',
          descuento: 0.0,
          descDePrati: 0.0,
          totalSinIva: 10.0
        }
      ]
    };
    const { getByText } = render(<TicketDetailItems ticket={ticket} />);
    expect(getByText('Test item')).toBeTruthy();
    expect(getByText('Cantidad:')).toBeTruthy();
    expect(getByText('Precio Unitario:')).toBeTruthy();
    expect(getByText('Subtotal:')).toBeTruthy();
    expect(getByText('% Descuento:')).toBeTruthy();
    expect(getByText('Descuento:')).toBeTruthy();
    expect(getByText('Descuento De Prati:')).toBeTruthy();
    expect(getByText('Total sin IVA:')).toBeTruthy();
  });
});
