import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import ToolBar from '../../common-components/toolBar/ToolBar';
import { SkeletonHome } from './skeleton';
import usePageContent from '../../../infrastucture/apis/contentPage/contentPage.hook';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import { COLORS } from '../../../application/common/colors';
import { useNavigation } from '@react-navigation/native';
import TemplatePage from '../../common-components/template-page';
import { FontStyles, FONTS_FAMILY } from '../../../application/common/fonts';
import ExtensionSlot from '../../common-components/extension-slot';
import { setContactEmarsys } from '../../../infrastucture/native-modules/emarsys/emarsys';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';

export default function Home() {
  const SECTION_PAGE = {
    section_1: 'Section1'
  };
  useEmmaSdk({});
  const {
    localStorageData: {
      [LocalStorageKey.User]: LocalUserData,
      [LocalStorageKey.IsLogin]: IS_LOGIN
    }
  } = useLocalStorage();

  const navigation = useNavigation();
  const { loading, error, pageContent, getDataContent } = usePageContent();

  useLayoutEffect(() => {
    if (!loading)
      navigation?.setOptions({
        header: () => (
          <ToolBar logo={pageContent?.components?.HomeHeaderLogoComponent} />
        ),
        headerShown: true
      });
  }, [navigation, loading, pageContent]);

  useEffect(() => {
    if (LocalUserData?.emarsysClientId)
      setContactEmarsys(LocalUserData.emarsysClientId);
  }, [LocalUserData?.emarsysClientId]);

  useEffect(() => {
    getDataContent({
      pageType: 'ContentPage',
      pageLabelOrId: 'homePage'
    });
  }, []);

  const stylesComponent = useMemo(() => {
    return {
      DePratiHomeRotatingImagesCarousel_Mobile: {
        container: styles.carousel_container,
        banner__container: styles.carousel_container_Video,
        image: styles.carousel_container_Image
      }
    };
  }, []);

  return (
    <TemplatePage loading={loading} skeleton={<SkeletonHome />} error={error}>
      {IS_LOGIN && (
        <View style={styles.welcome}>
          <Text style={styles.welcome_text}>
            ¡Hola&nbsp;
            <Text style={styles.welcome_text_bold}>
              {LocalUserData?.firstName}!
            </Text>
          </Text>
        </View>
      )}
      <ExtensionSlot
        slot={pageContent?.slots?.[SECTION_PAGE.section_1]}
        content={pageContent}
        contentContainerStyle={{
          paddingBottom: HEIGHT_TAB_BAR + 16,
          backgroundColor: COLORS.WHITE
        }}
        stylesComponent={stylesComponent}
      />
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  welcome: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 5
  },
  welcome_text: {
    ...FontStyles.H3_Headline,
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    textAlign: 'left'
  },
  welcome_text_bold: {
    ...FontStyles.H3_Headline,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  carousel_container: {
    marginTop: 4
  },
  carousel_container_Video: {
    marginTop: 4
  },
  carousel_container_Image: {
    // resizeMode: 'stretch',
  }
});
