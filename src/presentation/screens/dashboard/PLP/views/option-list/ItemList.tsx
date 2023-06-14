import React from 'react';
//Libs
import { View } from 'react-native';
import ComponentStars from '../../components/stars/ComponentStars';
import ComponentColors from '../../components/colors/ComponentColors';
import ComponentFavoriteTitle from '../../components/favorite-title/ComponentFavoriteTitle';
import ComponentImageProduct from '../../components/imageProduct/ComponentImageProduct';
import ComponentPrice from '../../components/price/ComponentPrice';
import ComponentDeferred from '../../components/deferred/ComponentDeferred';
//Styles
import {
  stylesComponentDeferred,
  stylesComponentPrice,
  stylesComponentStars,
  stylesFavoriteTitle,
  stylesImageProduct,
  stylesItem
} from './stylesItemList';
import { useLinkPress } from '../../../../../../application/common/hooksCommons/useLinkPress';
import { useSelector } from 'react-redux';
import { stylesImageProductGitfCard } from '../option-grid/stylesItemGrid';
import { ItemPlpProps } from '../../interfaces';
import { RootState } from '../../../../../../application/state-manager';
import { trackEventclick } from '../../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../../../infrastucture/native-modules/emma/clickEventMap';

export default function ItemList({
  data,
  onAddFavorite,
  loadingFavorite
}: ItemPlpProps) {
  const { goToPdp } = useLinkPress();
  const isCategoryGiftCard: boolean = useSelector(
    (state: RootState) => state?.filterPlpSlice?.isCategoryGiftCard
  );

  return (
    <View style={stylesItem.container}>
      <View style={stylesItem.leftColumn}>
        <ComponentImageProduct
          testId="test-image-product"
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
      </View>
      <View style={stylesItem.rightColumn}>
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
          styleAux={stylesComponentPrice.styleAux}
          title={data.name}
          prevPrice={data.previousPrice}
          price={data.price}
        />

        <ComponentColors dataColors={data.variantColorImages} />

        <ComponentStars
          style={stylesComponentStars.style}
          styleList={stylesComponentStars.styleList}
          average={data.averageRating}
        />

        <ComponentDeferred
          style={stylesComponentDeferred.style}
          styleContentCuotas={stylesComponentDeferred.styleContentCuotas}
          styleCuotas={stylesComponentDeferred.styleCuotas}
          styleDescribe={stylesComponentDeferred.styleDescribe}
          deferred={data.installmentCreditoDirecto}
        />
      </View>
    </View>
  );
}
