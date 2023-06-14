import React from 'react';
//Libs
import { View } from 'react-native';
import ComponentImageProduct from '../../components/imageProduct/ComponentImageProduct';
import ComponentFavoriteTitle from '../../components/favorite-title/ComponentFavoriteTitle';
import ComponentPrice from '../../components/price/ComponentPrice';
import ComponentColors from '../../components/colors/ComponentColors';
import ComponentStars from '../../components/stars/ComponentStars';
import ComponentDeferred from '../../components/deferred/ComponentDeferred';
//Styles
import {
  stylesComponentColors,
  stylesComponentDeferred,
  stylesComponentPrice,
  stylesComponentStars,
  stylesFavoriteTitle,
  stylesImageProduct,
  stylesItem
} from './stylesItemBigPhoto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product } from '../../interfaces/iProducts';
import { useLinkPress } from '../../../../../../application/common/hooksCommons/useLinkPress';
import { useSelector } from 'react-redux';
import { stylesImageProductGitfCard } from '../option-grid/stylesItemGrid';
import { ItemPlpProps } from '../../interfaces';
import { RootState } from '../../../../../../application/state-manager';
import { trackEventclick } from '../../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../../../infrastucture/native-modules/emma/clickEventMap';

export default function ItemBigPhoto({
  data,
  onAddFavorite,
  loadingFavorite
}: ItemPlpProps) {
  const { goToPdp } = useLinkPress();
  const isCategoryGiftCard: boolean = useSelector(
    (state: RootState) => state?.filterPlpSlice?.isCategoryGiftCard
  );

  return (
    <View
      style={[
        stylesItem.container,
        data.installmentCreditoDirecto
          ? stylesItem.isReferred
          : stylesItem.isNotReferred
      ]}>
      <ComponentImageProduct
        style={stylesImageProduct.style}
        styleImage={[
          stylesImageProduct.styleImage,
          isCategoryGiftCard && stylesImageProductGitfCard.styleImage
        ]}
        styleViewLabel={stylesImageProduct.styleViewLabel}
        styleLabel={stylesImageProduct.styleLabel}
        dataImages={{ images: data.images, labelNew: data?.tagUrl }}
        goToPdp={() => {
          trackEventclick(keyEvents.ecommerce_fichadeproducto);
          goToPdp(data.code);
        }}
      />

      <ComponentFavoriteTitle
        style={stylesFavoriteTitle.style}
        styleText={stylesFavoriteTitle.styleText}
        styleFavorite={stylesFavoriteTitle.styleFavorite}
        title={data.name}
        codeProduct={data.code}
        isFavorite={data.isFavorite}
        onAddFavorite={onAddFavorite}
        loadingFavorite={loadingFavorite}
      />

      <ComponentPrice
        style={stylesComponentPrice.style}
        stylePrevPrice={stylesComponentPrice.stylePrevPrice}
        prevPrice={data.previousPrice}
        price={data.price}
      />

      <ComponentColors
        style={stylesComponentColors.style}
        dataColors={data.variantColorImages}
      />

      <ComponentStars
        style={stylesComponentStars.style}
        styleList={stylesComponentStars.styleList}
        styleText={stylesComponentStars.styleText}
        average={data.averageRating}
      />
      <ComponentDeferred
        style={stylesComponentDeferred.style}
        styleContentCuotas={stylesComponentDeferred.styleContentCuotas}
        styleCuotas={stylesComponentDeferred.styleCuotas}
        styleDescribe={stylesComponentDeferred.styleDescribe}
        styleTextDescribe={stylesComponentDeferred.styleTextDescribe}
        deferred={data.installmentCreditoDirecto}
      />
    </View>
  );
}
