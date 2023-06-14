//Libs
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
//hooks
import { useNavigation } from '@react-navigation/native';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';
//components
import { ButtonText, MainButton } from '../../common-components/buttons/Button';
import { SkeletonWelcome } from './skeletonWelcome';
import ExtensionComponent from '../../common-components/extension-component';
import ErrorPage from '../ErrorPage';
//Styles
import { styles } from './stylesWelcome';
//Utils
import { NAV } from '../../../application/common/namesNav';
import { keyEvents } from '../../../infrastucture/native-modules/emma/clickEventMap';
import layout from '../../../application/common/layout';
import usePageContent from '../../../infrastucture/apis/contentPage/contentPage.hook';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { trackEventclick } = useEmmaSdk({});

  const { loading, error, pageContent, getDataContent } = usePageContent();

  useLayoutEffect(() => {
    getDataContent({
      pageLabelOrId: 'welcomePage'
    });
  }, []);

  const handleGoTo = (nav: string) => {
    switch (nav) {
      case NAV.AUTH_NAVIGATION:
        navigation.navigate(nav as never);
        break;
      case NAV.DASHBOARD_NAVIGATION:
        navigation.replace(nav);
        break;
    }
  };

  if (error) return <ErrorPage />;
  if (loading) return <SkeletonWelcome />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          !layout.isSmallDevice && styles.heightAux
        ]}>
        <View style={styles.containerImage}>
          <View style={styles.image}>
            {pageContent?.components?.SiteLogoComponent && (
              <ExtensionComponent
                {...pageContent.components.SiteLogoComponent}
              />
            )}
          </View>
        </View>
        <View style={styles.containerCarousel}>
          {pageContent?.components?.DePratiWelcomeRotatingImagesComponent && (
            <ExtensionComponent
              {...pageContent?.components
                ?.DePratiWelcomeRotatingImagesComponent}
            />
          )}
        </View>
        <View style={styles.containerButtons} accessible>
          <MainButton
            testID="welcome_iniciar_sesion"
            title="INICIAR SESIÓN"
            onPress={() => {
              handleGoTo(NAV.AUTH_NAVIGATION);
            }}
          />
          <ButtonText
            testID="welcome_btn_omitir"
            onPress={() => {
              trackEventclick(keyEvents.prelogin_saltar);
              handleGoTo(NAV.DASHBOARD_NAVIGATION);
            }}
            title={
              pageContent?.components?.SkipWelcomeLink?.linkName ?? 'Saltar'
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
