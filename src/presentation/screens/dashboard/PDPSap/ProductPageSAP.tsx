import React, { useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import TemplatePage from '../../../common-components/template-page';
import { SkeletonPage } from '../PDP/skeletons/ProductPageSkeleton';
import {
  ProductDetailsPageAvailabilityNearbyStoresComponent,
  ProductDetailsPageCarouselComponent,
  ProductDetailsPagePricesComponent
} from '../PDP/components';
import { VariantColors, VariantTalla } from './components';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductPageSAP() {
  const navigation = useNavigation();
  const route = useRoute();
  const useColor = useState();
  const [colorSelect] = useColor;
  const useTalla = useState();
  const useEan = useState('');
  const [eanSelect, setEanSelect] = useEan;
  const useSizeSelected = useState(false);
  const [_, setSizeSelected] = useSizeSelected;
  const { params } = route;

  const product = useMemo(() => {
    const article = params?.product?.listaArticulo?.[0] ?? {};
    return article;
  }, [params?.product?.listaArticulo]);

  const listTallas = useMemo(() => {
    if (colorSelect) {
      const [_, setTallaSelect] = useTalla;
      setTallaSelect('');
      setSizeSelected(false);
      setEanSelect(colorSelect);
      return (
        params?.product?.listaEAN?.filter(elemt => {
          return elemt?.cod_Color === colorSelect && elemt?.cod_Talla !== '';
        }) ?? []
      );
    }
    return [];
  }, [colorSelect]);

  useEffect(() => {
    if (!listTallas?.length && !params?.product?.listaColor?.length) {
      setSizeSelected(true);
    }
    if (!listTallas?.length && colorSelect) {
      setSizeSelected(true);
    }
  }, [listTallas, params?.product?.listaColor]);

  useLayoutEffect(() => {
    if (product?.descripcion) {
      navigation?.setOptions({
        headerShown: true
      });
    }
  }, [product]);

  return (
    <TemplatePage
      loading={product?.descripcion ? false : true}
      skeleton={<SkeletonPage />}
      noFoundPage={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}>
        <ProductDetailsPageCarouselComponent loadingProduct={false} />
        <ProductDetailsPagePricesComponent
          useSizeSelected={[true]}
          contentProduct={{
            ean: eanSelect || product?.cod_Art,
            name: product?.descripcion,
            price: {
              formattedValue: `$${product?.pvpiva}`
            }
          }}
        />
        <VariantColors
          variantColors={params?.product?.listaColor}
          useColor={useColor}
        />
        <VariantTalla
          variantTalla={listTallas}
          useTalla={useTalla}
          useSizeSelected={useSizeSelected}
          useEan={useEan}
        />
        <ProductDetailsPageAvailabilityNearbyStoresComponent
          useSizeSelected={useSizeSelected}
          contentProduct={{
            ean: eanSelect || params?.ean
          }}
        />
      </ScrollView>
    </TemplatePage>
  );
}
