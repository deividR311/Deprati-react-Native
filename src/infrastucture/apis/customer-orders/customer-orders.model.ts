import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import {
  OrdersResponse,
  MyOrder as MyOrderResponse,
  FirstEntry as FirstEntryResponse,
  Total as TotalResponse,
  DeliveryMode as DeliveryModeResponse,
  Product as ProductResponse,
  Selected as SelectedResponse,
  Stock as StockResponse,
  Category as CategoryResponse,
  ImageMyOrder as ImageMyOrderResponse,
  BaseOption as BaseOptionResponse,
  Pagination as PaginationResponse,
  Sort as SortResponse
} from './customer-orders.type';
import {
  CustomerOrdersModel,
  IBaseOption,
  ICategory,
  IDeliveryMode,
  IFirstEntry,
  IImageMyOrder,
  IMyOrder,
  IProduct,
  ISelected,
  IStock,
  ITotal
} from './interfaces/customer-orders.model.interfaces';

export function mapOrdersModelfromDTO(
  rawData: OrdersResponse
): CustomerOrdersModel {
  const orders = rawData.orders.map(order => {
    const newTotal = new MapperDTO_To_Model<TotalResponse, ITotal>(
      order.firstEntry.basePrice,
      {
        currencyIso: 'currencyIso',
        formattedValue: 'formattedValue',
        priceType: 'priceType',
        value: 'value'
      }
    ).get();

    const newStock = new MapperDTO_To_Model<StockResponse, IStock>(
      order.firstEntry.product.stock,
      {
        stockLevel: 'stockLevel',
        stockLevelStatus: 'stockLevelStatus'
      }
    ).get();

    const newDeliveryMode = new MapperDTO_To_Model<
      DeliveryModeResponse,
      IDeliveryMode
    >(order.firstEntry?.deliveryMode ?? {}, {
      code: 'code'
    }).get();

    const newBaseOptions = order.firstEntry.product.baseOptions.map(base => {
      const auxBase = new MapperDTO_To_Model<BaseOptionResponse, IBaseOption>(
        base,
        {
          selected: 'selected',
          variantType: 'variantType'
        }
      ).get();

      const auxSelected = new MapperDTO_To_Model<SelectedResponse, ISelected>(
        base.selected,
        {
          code: 'code',
          priceData: 'priceData',
          stock: 'stock',
          url: 'url',
          variantOptionQualifiers: 'variantOptionQualifiers'
        }
      ).get();

      auxBase.selected = auxSelected;
      auxBase.selected.priceData = newTotal;
      auxBase.selected.stock = newStock;
      return auxBase;
    });

    const newCategories = order.firstEntry.product.categories.map(category =>
      new MapperDTO_To_Model<CategoryResponse, ICategory>(category, {
        code: 'code',
        url: 'url'
      }).get()
    );
    // if (!order.firstEntry.product.images) {
    //   console.log('newImageMyOrder', order.firstEntry.product.images)
    //   console.log(
    //     '++++++newImageMyOrder',
    //     order.firstEntry.product.images ? true : false,
    //     order.code,
    //     order.firstEntry.product.name,
    //   )
    // }
    const newImageMyOrder = order.firstEntry.product.images?.map(image =>
      new MapperDTO_To_Model<ImageMyOrderResponse, IImageMyOrder>(image, {
        format: 'format',
        imageType: 'imageType',
        url: 'url',
        altText: 'altText'
      }).get()
    );

    const newProduct = new MapperDTO_To_Model<ProductResponse, IProduct>(
      order.firstEntry.product,
      {
        availableForPickup: 'availableForPickup',
        baseOptions: 'baseOptions',
        baseProduct: 'baseProduct',
        categories: 'categories',
        code: 'code',
        images: 'images',
        name: 'name',
        purchasable: 'purchasable',
        stock: 'stock',
        url: 'url',
        averageRating: 'averageRating',
        description: 'description',
        isHomeAssemblyRequired: 'isHomeAssemblyRequired',
        technicalCharacteristics: 'technicalCharacteristics'
      }
    ).get();

    const newFisrEntry = new MapperDTO_To_Model<
      FirstEntryResponse,
      IFirstEntry
    >(order.firstEntry, {
      basePrice: 'basePrice',
      deliveryMode: 'deliveryMode',
      entryNumber: 'entryNumber',
      product: 'product',
      quantity: 'quantity',
      totalPrice: 'totalPrice',
      updateable: 'updateable'
    }).get();

    const newOrder = new MapperDTO_To_Model<MyOrderResponse, IMyOrder>(order, {
      code: 'code',
      deliveryStatusDisplay: 'deliveryStatusDisplay',
      month: 'month',
      firstEntry: 'firstEntry',
      guid: 'guid',
      paymentStatusDisplay: 'paymentStatusDisplay',
      placed: 'placed',
      status: 'status',
      statusDisplay: 'statusDisplay',
      total: 'total',
      totalUnitCount: 'totalUnitCount',
      created: 'created',
      paymentStatus: 'paymentStatus',
      totalItems: 'totalItems',
      totalPriceWithTax: 'totalPriceWithTax'
    }).get();

    newOrder.firstEntry = newFisrEntry;
    newOrder.total = newTotal;

    newOrder.firstEntry.basePrice = newTotal;
    newOrder.firstEntry.deliveryMode = newDeliveryMode;
    newOrder.firstEntry.product = newProduct;
    newOrder.firstEntry.totalPrice = newTotal;

    newOrder.firstEntry.product.baseOptions = newBaseOptions;
    newOrder.firstEntry.product.categories = newCategories;
    newOrder.firstEntry.product.images = newImageMyOrder;
    newOrder.firstEntry.product.stock = newStock;

    return newOrder;
  });

  return { orders };
}
