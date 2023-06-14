import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import {
  promotionsStyle,
  stylesComponentSizeColor,
  stylesImageProduct,
  stylesItem,
  stylesTitleDelete
} from './stylesItemProductCart';
import ComponentTitleDelete from './titleDelete/ComponentTitleDeleteCart';
import ComponentImageProduct from '../../../dashboard/PLP/components/imageProduct/ComponentImageProduct';
import ProductCategoryProperties from './sizeColor/ComponentSizeColor';
import ComponentIncreaseDecrease from './increaseDecrease/ComponentIncreaseDecrease';
import ComponentOptionsSelect from './OptionsSelect/ComponentOptionsSelect';
import {
  AppliedProductPromotions,
  Entry,
  useDeleteShoppingCartRequest,
  useGifPackageShoppingCartRequest,
  useLazyGetShoppingCartRequest,
  usePickUpShoppingCartRequest,
  useUpdateShoppingCartRequest
} from '../../../../../infrastucture/apis/shopping-cart';
import PriceCardPart from '../../../dashboard/PLP/components/price/prices-card-part';
import AvailableLabelCardPart from '../../../dashboard/PLP/components/price/available-label-card-part';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../../application/common';
import { EcommerceNavigationRoute } from '../../../../navigation/ecommerce';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../application/state-manager';
import {
  setCartInfo,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../application/state-manager/services/checkout';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import sleep from '../../../../../application/utils/sleep';
import layout from '../../../../../application/common/layout';
import { useDebounceFunction } from '../../../../../application/common/hooksCommons/useDebounce';

export type ItemCartProduct = Entry & {
  appliedProductPromotions: AppliedProductPromotions[];
};

export interface ItemCartProductProps {
  data: ItemCartProduct;
  testID: string;
}
const EMPLOYEE_DISCOUNT = 'Descuento Empleado';

export const ItemCartProduct: React.FC<ItemCartProductProps> = ({
  data,
  testID = ''
}) => {
  const {
    entryNumber,
    product,
    giftPacking,
    pickup,
    quantity,
    basePriceWithoutTaxes,
    totalPriceWithoutTaxes,
    updateable
  } = data;

  const [doUpdateShoppingCart] = useUpdateShoppingCartRequest();
  const [doTogglePickUpInStore] = usePickUpShoppingCartRequest();
  const [doToggleIsGift] = useGifPackageShoppingCartRequest();
  const [removeFromCart] = useDeleteShoppingCartRequest();
  const [getCart] = useLazyGetShoppingCartRequest();
  const { hideModal, showModal } = useGenericModal();
  const { code: cartId = '' } = useAppSelector(ShoppingCartStateSelector);
  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: username,
      [LocalStorageKey.Token]: TOKEN
    }
  } = useLocalStorage();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onPressItemCart = () => {
    navigation.push(
      NAV.ECOMMERCE as never,
      {
        screen: EcommerceNavigationRoute.ProductPage,
        params: {
          productCode: product.code,
          isFavorite: undefined
        }
      } as never
    );
  };

  const greaterThanStock = useMemo(() => {
    if (product.stock?.stockLevel === undefined) return false;
    return product.stock.stockLevel > 0 && product.stock.stockLevel < quantity;
  }, [product.stock?.stockLevel, quantity]);

  const withoutStock = useMemo(
    () => product.stock?.stockLevel === 0,
    [product.stock.stockLevel, quantity]
  );

  const onPressDeleteButton = () => {
    showModal(ModalsType.ToastDeleteProductCart, {
      delayHideToast: 2000,
      // button_toast_action_deleteProduct_item_cart_0
      identifier: layout.isIos ? `_deleteProduct_${testID}` : undefined,
      buttonAction: async () => {
        hideModal();
        await sleep(500);
        withRefreshCart(async () => {
          // @ts-ignore
          const { error: removeError } = await removeFromCart({
            token: TOKEN,
            username,
            cartId,
            entryNumber: entryNumber.toString()
          });
          if (removeError) throw _mapErrors(removeError);
        });
      },
      closeAction: hideModal
    });
  };

  const onPressModifyItemsAmount = useDebounceFunction((amount: string) => {
    withRefreshCart(async () => {
      const _quantity = greaterThanStock
        ? product.stock?.stockLevel.toString()
        : amount;
      // @ts-ignore
      const { error: updateError } = await doUpdateShoppingCart({
        token: TOKEN,
        username,
        cartId,
        entryNumber: entryNumber.toString(),
        quantity: _quantity
      });
      if (updateError) throw _mapErrors(updateError);
    });
  });

  const onCheckAsAGift = (giftPackaging: boolean) => {
    withRefreshCart(async () => {
      // @ts-ignore
      const { error: updateError } = await doToggleIsGift({
        token: TOKEN,
        username,
        cartId,
        entryNumber: entryNumber.toString(),
        enableGiftPackage: giftPackaging
      });
      if (updateError) throw _mapErrors(updateError);
    });
  };

  const onCheckAsAPickUpInStore = (pickUpInStore: boolean) => {
    withRefreshCart(async () => {
      // @ts-ignore
      const { error: updateError } = await doTogglePickUpInStore({
        token: TOKEN,
        username,
        cartId,
        entryNumber: entryNumber.toString(),
        enablePickUpInStore: pickUpInStore
      });
      if (updateError) throw _mapErrors(updateError);
    });
  };

  const withRefreshCart = async (
    callback: () => Promise<void>,
    updateCart = true
  ) => {
    dispatch(setShowLoadingScreen(true));
    try {
      await callback();

      if (updateCart) {
        // @ts-ignore
        const { data: cartInfo, error: cartError } = await getCart({
          username,
          cartId
        });
        cartInfo && dispatch(setCartInfo(cartInfo));
        if (cartError) throw _mapErrors(cartError);
      }
    } catch (error) {
      console.log('>>> Item Card Error', error);
    }

    dispatch(setShowLoadingScreen(false));
  };

  const _mapErrors = (error: any): Error => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    return new Error(text || error?.message || error);
  };

  return (
    <View style={stylesItem.container}>
      <View style={stylesItem.content}>
        <View style={stylesItem.leftColumn}>
          <ComponentImageProduct
            testId={`image_${product.name.replace(/ /g, '_')}`}
            style={stylesImageProduct.style}
            styleImage={stylesImageProduct.styleImage}
            styleContentImage={stylesImageProduct.styleContentImage}
            styleViewLabel={stylesImageProduct.styleViewLabel}
            styleLabel={stylesImageProduct.styleLabel}
            dataImages={{ images: product.images, labelNew: product?.tagUrl }}
            goToPdp={onPressItemCart}
          />
          <ComponentIncreaseDecrease
            amount={quantity}
            stock={product.stock.stockLevel}
            disableIncreaseButton={
              (product.stock?.stockLevel !== undefined &&
                product.stock.stockLevel <= quantity) ||
              !updateable ||
              product.isGiftProduct ||
              product.isPromotionSpecialPrice
            }
            disableDecreaseButton={
              !updateable ||
              product.isGiftProduct ||
              product.isPromotionSpecialPrice ||
              withoutStock
            }
            code={product.code}
            onModifyAmount={onPressModifyItemsAmount}
            onDelete={onPressDeleteButton}
          />
        </View>
        <View style={stylesItem.rightColumn}>
          <ComponentTitleDelete
            testID={`${testID}_delete`}
            style={stylesTitleDelete.style}
            styleText={stylesTitleDelete.styleText}
            styleViewDelete={stylesTitleDelete.styleViewDelete}
            title={product.name}
            disableDelete={!updateable}
            onDelete={onPressDeleteButton}
          />
          <PriceCardPart
            unitPrice={basePriceWithoutTaxes}
            price={totalPriceWithoutTaxes}
          />
          <ProductCategoryProperties
            style={stylesComponentSizeColor.style}
            styleText={stylesComponentSizeColor.styleText}
            category={product.categories}
          />
          <View
            style={{
              paddingRight: 12,
              alignItems: 'flex-start'
            }}>
            {data.appliedProductPromotions
              .reduce((acc, promotion) => {
                if (
                  !promotion.description ||
                  promotion.description
                    .toLowerCase()
                    .includes(EMPLOYEE_DISCOUNT.toLowerCase())
                )
                  return acc;
                if (
                  acc.some(
                    _promotion =>
                      _promotion.description.toLowerCase() ===
                      promotion.description.toLowerCase()
                  )
                )
                  return acc;
                return [...acc, promotion];
              }, [] as AppliedProductPromotions[])
              //?.slice(0, 2)
              .map((promotion, index) => (
                <Text
                  style={[
                    promotionsStyle.text,
                    index === 0
                      ? promotionsStyle.primary
                      : promotionsStyle.secondary
                  ]}
                  key={index}>
                  {promotion.description}
                </Text>
              ))}
          </View>
          {greaterThanStock && (
            <AvailableLabelCardPart
              text={`Supera la cantidad máxima de ${product.stock?.stockLevel} unidades disponibles`}
            />
          )}
          {product.stock?.stockLevel === 1 && !greaterThanStock && (
            <AvailableLabelCardPart text="Disponible 1 unidad" />
          )}
          {withoutStock && (
            <AvailableLabelCardPart text="Producto sin unidades disponibles" />
          )}
        </View>
      </View>
      <ComponentOptionsSelect
        pickUpInStore={pickup}
        isGift={giftPacking}
        acceptIsGift={product.acceptGiftPacking}
        acceptIsPickupStore={product.availableForPickup}
        handleInStore={onCheckAsAPickUpInStore}
        handleIsGift={onCheckAsAGift}
      />
    </View>
  );
};

export default ItemCartProduct;
