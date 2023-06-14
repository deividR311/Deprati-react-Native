import React, { ReactNode, useLayoutEffect, useMemo } from 'react';
import { SkeletonScreen } from './corner.skeleton';
import TemplatePage from '../../common-components/template-page';
import { trackCategoryViewEmarsys } from '../../../infrastucture/native-modules/emarsys/emarsys';
import usePageContent from '../../../infrastucture/apis/contentPage/contentPage.hook';
import ToolBar from '../../common-components/toolBar/ToolBar';
import * as corners from './screens';
import CornerTemplate from './screens/CornerTemplate';
import { useRoute } from '@react-navigation/native';

export default function CornerScreen() {
  const route = useRoute();
  const { loading, error, pageContent, getDataContent } = usePageContent();

  useLayoutEffect(() => {
    getDataContent({
      pageType: 'ContentPage',
      pageLabelOrId: route?.params?.labelOrIdCorner
    });
  }, []);

  if (pageContent?.uid) trackCategoryViewEmarsys(pageContent?.uid);

  const Corner: ReactNode = useMemo(() => {
    return corners[pageContent?.uid] ?? CornerTemplate;
  }, [pageContent?.uid]);

  if (loading) return <SkeletonScreen />;

  return (
    <TemplatePage loading={loading} skeleton={<SkeletonScreen />} error={error}>
      <ToolBar showGoBack={true} title={pageContent?.name} />
      {Corner && <Corner content={pageContent} />}
    </TemplatePage>
  );
}
