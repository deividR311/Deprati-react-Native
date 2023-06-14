import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../application/common/colors';
import ExtensionSlot from '../../../common-components/extension-slot';
import TemplatePage from '../../../common-components/template-page';
import { ActionsHeader } from './components/ActionsHeader';
import { ProductAddToCartComponent } from './components/ProductAddToCartComponent';
import * as components from './components';
import { useProductPage } from './hook/useProductPage.hook';
import { SkeletonPage } from './skeletons/ProductPageSkeleton';
import layout from '../../../../application/common/layout';
import { useReduxPdp } from '../../../../application/state-manager/services/pdp';

export default function PDPScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const SECTION_PAGE = {
    section_0: 'Section0',
    section_1: 'Section1',
    section_2: 'Section2',
    section_3: 'UpSelling',
    section_4: 'CrossSelling'
  };
  const {
    contentProduct,
    pageContent,
    loading,
    error,
    handleSetProductCode,
    isFavorite,
    loadingProduct
  } = useProductPage();
  const { coordY, onIsErrorUnselected } = useReduxPdp();
  const navigation = useNavigation();
  const useSizeSelected = useState(false);
  const [scrolly, setScrolly] = useState(0);

  useLayoutEffect(() => {
    if (loading) return;
    if (contentProduct?.name) {
      navigation?.setOptions({
        headerShown: true,
        headerRight: () => (
          <ActionsHeader
            contentProduct={contentProduct}
            isFavorite={isFavorite ?? false}
          />
        )
      });
    }
  }, [navigation, loading, contentProduct]);

  const customRenderItem = ({ item, index, typeCode }) => {
    if (components[item] || components[typeCode]) {
      const componentContent = pageContent?.components[item];
      const ExtComponent = components[item] ?? components[typeCode];
      return (
        <ExtComponent
          key={index}
          contentProduct={contentProduct}
          customProps={componentContent}
          handleSetProductCode={handleSetProductCode}
          useSizeSelected={useSizeSelected}
          loadingProduct={loadingProduct}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    if (!loadingProduct) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: scrolly });
      }, 200);
    }
    return () => {
      onIsErrorUnselected(false);
    };
  }, [loadingProduct]);

  const onScrollToSelected = () => {
    // console.log('errorUnselected.coordY', coordY)
    scrollRef.current?.scrollTo({ y: coordY - (layout?.isIos ? 25 : 0) });
    onIsErrorUnselected(true);
  };

  return (
    <TemplatePage
      loading={loading}
      skeleton={<SkeletonPage />}
      noFoundPage={error}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={event => {
          const scrolling = event.nativeEvent;
          if (scrolling?.contentOffset?.y > 0)
            setScrolly(scrolling?.contentOffset?.y);
        }}
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: COLORS.WHITE
        }}>
        <ExtensionSlot
          key={'section_0'}
          slot={pageContent?.slots?.[SECTION_PAGE.section_0]}
          content={pageContent}
          hasScroll={false}
          customRenderItem={customRenderItem}
        />
        <ExtensionSlot
          key={'section_1'}
          slot={pageContent?.slots?.[SECTION_PAGE.section_1]}
          content={pageContent}
          hasScroll={false}
          customRenderItem={customRenderItem}
        />
        <ExtensionSlot
          key={'section_2'}
          slot={pageContent?.slots?.[SECTION_PAGE.section_2]}
          content={pageContent}
          customRenderItem={customRenderItem}
          hasScroll={false}
        />
        <ExtensionSlot
          key={'section_3'}
          slot={pageContent?.slots?.[SECTION_PAGE.section_3]}
          content={pageContent}
          customRenderItem={customRenderItem}
          hasScroll={false}
        />
        <ExtensionSlot
          key={'section_4'}
          slot={pageContent?.slots?.[SECTION_PAGE.section_4]}
          content={pageContent}
          customRenderItem={customRenderItem}
          hasScroll={false}
        />
      </ScrollView>
      <ProductAddToCartComponent
        contentProduct={contentProduct}
        useSizeSelected={useSizeSelected}
        onScrollToSelected={onScrollToSelected}
      />
    </TemplatePage>
  );
}
