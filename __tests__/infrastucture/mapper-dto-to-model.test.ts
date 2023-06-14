import { MapperDTO_To_Model } from '../../src/infrastucture/apis/common/mapper-dto-to-model';
import { ITotal } from '../../src/infrastucture/apis/customer-orders';

export interface TotalRes {
  monedaIso: string;
  valorFormateado: string;
  tipoPrecio: string;
  valor: number;
}

const basePrice = {
  monedaIso: 'USD',
  valorFormateado: '$177,68',
  tipoPrecio: 'BUY',
  valor: 177.68
};

const dtoMap: Record<keyof TotalRes, keyof ITotal> = {
  monedaIso: 'currencyIso',
  valorFormateado: 'formattedValue',
  tipoPrecio: 'priceType',
  valor: 'value'
};

describe('MapperDTO_To_Model', () => {
  it('should map DTO fields to Model fields correctly', () => {
    const model = new MapperDTO_To_Model<TotalRes, ITotal>(
      basePrice,
      dtoMap
    ).get();

    expect(model.formattedValue).toBe(basePrice.valorFormateado);
    expect(model.currencyIso).toBe(basePrice.monedaIso);
    expect(model.priceType).toBe(basePrice.tipoPrecio);
    expect(model.value).toBe(basePrice.valor);
  });
});
