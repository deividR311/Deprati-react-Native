import React, { useEffect, useMemo, useState } from 'react';
//Libs
import { View } from 'react-native';

//Styles
import {
  stylesComponentDeferred,
  stylesComponentPrice,
  stylesImageProduct,
  stylesItem,
  stylesMainButton,
  stylesTitleDelete
} from './stylesItemFavorite';
import ComponentImageProduct from '../../../dashboard/PLP/components/imageProduct/ComponentImageProduct';
import ComponentPrice from '../../../dashboard/PLP/components/price/ComponentPrice';
import ComponentDeferred from '../../../dashboard/PLP/components/deferred/ComponentDeferred';
import { MainButton } from '../../../../common-components/buttons/Button';
import CartAddSvg from '../../../../../../assets/icons/CartAddSvg';
import ComponentTitleDelete from '../components/title-delete/ComponentTitleDelete';
import { IProduct } from '../../../../../infrastucture/apis/wishlist';
import { COLORS } from '../../../../../application/common';
import { VariantType } from '../../../../../infrastucture/apis/customer-orders';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { useAppSelector } from '../../../../../application/state-manager';
import { ShoppingCartStateSelector } from '../../../../../application/state-manager/services/checkout';

const textButton = 'AÑADIR';
export default function ItemFavorite({
  data,
  onPress,
  onDelete,
  loading,
  loadingDelete,
  disabledBtnAdd,
  testID
}: {
  data: IProduct;
  onPress(): void;
  onDelete(x: string): void;
  loading: boolean;
  loadingDelete: boolean;
  disabledBtnAdd: boolean;
  testID?: string;
}) {
  const { hideModal: hidePopPup, showModal: showPopUp } = useGenericModal();
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const { entries } = useAppSelector(ShoppingCartStateSelector);
  const [disabledAdd, setDisabledAdd] = useState<boolean>(false);

  useEffect(() => {
    if (loadingItem && !loading) setLoadingItem(false);
  }, [loading]);

  useEffect(() => {
    if (disabledAdd && !disabledBtnAdd) setDisabledAdd(false);
  }, [disabledBtnAdd]);

  const handleLoadingBtnAddCart = (_product: IProduct) => {
    const baseProduct = _product.baseOptions.find(
      item => item.selected.code === _product.code
    );
    const stock = baseProduct?.selected.stock.stockLevel;
    if (stock === undefined || stock > 0) {
      if (_product.code === data.code) setLoadingItem(true);
      onPress();
      return;
    }
    showPopUp(ModalsType.OutStock, {
      buttonAction: () => onDelete(_product.code)
    });
  };

  const isTypeGiftCard = useMemo(() => {
    return data.baseOptions.some(
      base => base.variantType === VariantType?.GIFT_CARD_VARIANT_PRODUCT
    );
  }, [data.code]);

  return (
    <View testID={testID} style={stylesItem.container}>
      <ComponentImageProduct
        style={stylesImageProduct.style}
        styleImage={stylesImageProduct.styleImage}
        styleViewLabel={stylesImageProduct.styleViewLabel}
        styleLabel={stylesImageProduct.styleLabel}
        dataImages={{ images: data.images }}
        disabled={true}
        resizeMode={isTypeGiftCard ? 'contain' : 'stretch'}
      />

      <ComponentTitleDelete
        style={stylesTitleDelete.style}
        styleText={stylesTitleDelete.styleText}
        styleViewText={stylesTitleDelete.styleViewText}
        styleViewDelete={stylesTitleDelete.styleViewDelete}
        title={data.name}
        onDelete={() => onDelete(data.code)}
        loadingDelete={loadingDelete}
        isItemFavorite={true}
      />

      <ComponentPrice
        style={stylesComponentPrice.style}
        prevPrice={data.previousPrice}
        price={data.price}
      />

      {/* <ComponentDeferred
        style={stylesComponentDeferred.style}
        styleContentCuotas={stylesComponentDeferred.styleContentCuotas}
        styleCuotas={stylesComponentDeferred.styleCuotas}
        styleDescribe={stylesComponentDeferred.styleDescribe}
        deferred={data.installmentCreditoDirecto}
      /> */}

      <MainButton
        testID={`add-${testID}`}
        title={textButton}
        style={stylesMainButton.style}
        icon={<CartAddSvg />}
        disabled={
          disabledAdd ||
          loadingItem ||
          data?.isGiftProduct ||
          (data?.isPromotionSpecialPrice &&
            entries?.some(p => p.product.code === data?.code))
        }
        onPress={() => handleLoadingBtnAddCart(data)}
        // showActivityIndicator={loadingItem}
        activityIndicator={{ color: COLORS.WHITE }}
      />
    </View>
  );
}
