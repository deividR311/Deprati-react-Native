import { View, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import ToolBar from '../../common-components/toolBar/ToolBar';
import { SkeletonScreen } from './skeleton';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import ExtensionComponent from '../../common-components/extension-component';
import { COLORS } from '../../../application/common/colors';
import {
  StackActions,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import CategoryCarousel from './components/CategoryCarousel';
import ExtensionSlot from '../../common-components/extension-slot';
import { NAV } from '../../../application/common/namesNav';
import TemplatePage from '../../common-components/template-page';
import { trackCategoryViewEmarsys } from '../../../infrastucture/native-modules/emarsys/emarsys';
import CornerScreen from '../Corner';
import PLPScreen from '../dashboard/PLP/PLPScreen';
import usePageContent from '../../../infrastucture/apis/contentPage/contentPage.hook';

export default function CategoryPage() {
  const SECTION_PAGE = {
    section_1: 'Section1',
    section_2: 'Section2'
  };
  const navigation = useNavigation();
  const route = useRoute();
  const { category, categoryData } = route.params;
  const {
    loading,
    error,
    pageContent: categoryContent,
    getDataContent
  } = usePageContent();

  useLayoutEffect(() => {
    getDataContent({
      pageType: 'CategoryPage',
      code: category
    });
  }, [category]);

  const navigateToContactlessPayment = () =>
    navigation.dispatch(StackActions.push(NAV.CONTACTLESS_PAYMENT));

  const { template, typeCode } = categoryContent ?? {};
  if (template === 'ProductGridPageTemplate') {
    return (
      <PLPScreen
        categoryID={category}
        title={categoryData?.text}
        contentPage={categoryContent}
      />
    );
  }

  if (categoryData?.text) trackCategoryViewEmarsys(categoryData?.text);

  if (template === 'CategoryPageTemplate' && typeCode === 'ContentPage') {
    return <CornerScreen />;
  }

  return (
    <TemplatePage
      loading={loading}
      skeleton={<SkeletonScreen />}
      noFoundPage={error}>
      <ToolBar showGoBack={true} title={categoryData?.text} />
      <ExtensionSlot
        slot={categoryContent?.slots[SECTION_PAGE.section_1]}
        content={categoryContent}
        contentContainerStyle={{
          paddingBottom: HEIGHT_TAB_BAR + 100,
          backgroundColor: COLORS.WHITE
        }}
        customRenderItem={({ item, index }) => {
          const componentContent = categoryContent?.components[item];
          if (componentContent?.typeCode === 'RotatingImagesComponent') {
            return (
              <>
                <CategoryCarousel
                  key={index.toString()}
                  customProps={componentContent}
                />
              </>
            );
          }
          if (componentContent)
            return (
              <>
                <ExtensionComponent
                  {...componentContent}
                  style={{ container__divider_top: styles.line }}
                />
              </>
            );
          return null;
        }}>
        <ExtensionSlot
          slot={categoryContent?.slots[SECTION_PAGE.section_2]}
          content={categoryContent}
          horizontal
          contentContainerStyle={{
            marginTop: 16,
            paddingRight: 24
          }}
        />
      </ExtensionSlot>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  line: {
    alignSelf: 'center',
    height: 1,
    backgroundColor: COLORS.DARK,
    opacity: 0.12,
    width: '80%',
    marginTop: 16,
    marginBottom: 10
  }
});
