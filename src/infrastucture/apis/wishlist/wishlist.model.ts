import { MapperDTO_To_Model as MapperDTO } from '../common/mapper-dto-to-model';
import {
  WishlistsResponse,
  MyWishlist,
  Entry as EntryResponse,
  Priority as PriorityResponse,
  Product as ProductResponse,
  BaseOption as BaseOptionResponse,
  Selected as SelectedResponse,
  PriceData as PriceDataResponse,
  StockWishlist as StockWishlistResponse,
  ImageWishlist as ImageWishlistResponse
} from './wishlist.type';

import {
  WishlistsModel,
  IMyWishlist,
  IEntry,
  IPriority,
  IProduct,
  IBaseOption,
  ISelected,
  IPriceData,
  IStockWishlist,
  IImageWishlist
} from './interfaces/wishlist.model.interfaces';

export function mapOrdersModelfromDTO(
  rawData: WishlistsResponse
): WishlistsModel {
  const wishlists = rawData.wishlists.map(wishlist => {
    const newEntries = wishlist.entries.map(entry => {
      const newBaseOptions = entry.product.baseOptions.map(base => {
        const auxStock = new MapperDTO<StockWishlistResponse, IStockWishlist>(
          base.selected.stock,
          {
            stockLevel: 'stockLevel',
            stockLevelStatus: 'stockLevelStatus'
          }
        ).get();

        const auxBasePriceData = new MapperDTO<PriceDataResponse, IPriceData>(
          base.selected.price,
          {
            currencyIso: 'currencyIso',
            formattedValue: 'formattedValue',
            priceType: 'priceType',
            value: 'value'
          }
        ).get();

        const auxSelected = new MapperDTO<SelectedResponse, ISelected>(
          base.selected,
          {
            code: 'code',
            price: 'priceData',
            previousPrice: 'previousPrice',
            stock: 'stock',
            url: 'url',
            variantOptionQualifiers: 'variantOptionQualifiers'
          }
        ).get();

        const auxBase = new MapperDTO<BaseOptionResponse, IBaseOption>(base, {
          selected: 'selected',
          variantType: 'variantType'
        }).get();

        auxBase.selected = auxSelected;
        auxBase.selected.priceData = auxBasePriceData;
        auxBase.selected.previousPrice = auxBasePriceData;
        auxBase.selected.stock = auxStock;
        return auxBase;
      });

      const newImageWishlist = entry.product.images.map(image => {
        const auxImage = new MapperDTO<ImageWishlistResponse, IImageWishlist>(
          image,
          {
            format: 'format',
            imageType: 'imageType',
            url: 'url',
            altText: 'altText'
          }
        ).get();

        return auxImage;
      });

      const newPriority = new MapperDTO<PriorityResponse, IPriority>(
        entry.priority,
        {
          code: 'code',
          name: 'name'
        }
      ).get();

      const auxPreviousPrice = new MapperDTO<PriceDataResponse, IPriceData>(
        entry.product.previousPrice,
        {
          currencyIso: 'currencyIso',
          formattedValue: 'formattedValue',
          priceType: 'priceType',
          value: 'value'
        }
      ).get();

      const auxPrice = new MapperDTO<PriceDataResponse, IPriceData>(
        entry.product.price,
        {
          currencyIso: 'currencyIso',
          formattedValue: 'formattedValue',
          priceType: 'priceType',
          value: 'value'
        }
      ).get();

      const newProduct = new MapperDTO<ProductResponse, IProduct>(
        entry.product,
        {
          availableForPickup: 'availableForPickup',
          averageRating: 'averageRating',
          baseOptions: 'baseOptions',
          baseProduct: 'baseProduct',
          code: 'code',
          ean: 'ean',
          images: 'images',
          name: 'name',
          purchasable: 'purchasable',
          url: 'url',
          previousPrice: 'previousPrice',
          price: 'price'
        }
      ).get();

      const auxEntry = new MapperDTO<EntryResponse, IEntry>(entry, {
        addedDate: 'addedDate',
        comment: 'comment',
        desired: 'desired',
        priority: 'priority',
        product: 'product'
      }).get();

      auxEntry.product = newProduct;
      auxEntry.product.previousPrice = auxPreviousPrice;
      auxEntry.product.price = auxPrice;
      auxEntry.product.baseOptions = newBaseOptions;
      auxEntry.product.images = newImageWishlist;
      auxEntry.priority = newPriority;
      return auxEntry;
    });

    const newWishlist = new MapperDTO<MyWishlist, IMyWishlist>(wishlist, {
      description: 'description',
      entries: 'entries',
      isDefault: 'isDefault',
      name: 'name'
    }).get();

    newWishlist.entries = newEntries;

    return newWishlist;
  });

  return { wishlists };
}
