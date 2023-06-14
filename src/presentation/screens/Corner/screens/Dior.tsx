import React, { useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ExtensionSlot from '../../../common-components/extension-slot';
import { COLORS, HEIGHT_TAB_BAR } from '../../../../application/common';
import { trackCategoryViewEmarsys } from '../../../../infrastucture/native-modules/emarsys/emarsys';
import { useNavigation } from '@react-navigation/native';
interface Props {
  content: any;
}

export default (props: Props) => {
  const { content } = props;
  const [sections_1, section_2] = ['Section1', 'Section2'];
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation?.setParams({
      queryEmarsys: 'HOME > Belleza > MARCAS > Dior'
    });
  }, [navigation]);
  trackCategoryViewEmarsys('Belleza > MARCAS > Dior');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', marginBottom: HEIGHT_TAB_BAR + 16 }}>
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[sections_1]}
          content={content}
          stylesComponent={stylesComponent}
        />
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[section_2]}
          content={content}
          stylesComponent={stylesComponent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesComponent = {
  DiorCategoryFeatureCarousel1: StyleSheet.create({
    container: {}
  }),
  DiorCategoryDoubleBanner1: StyleSheet.create({
    container: {
      marginLeft: 0
    },
    banner__container: {
      marginLeft: 16
    },
    container__divider_top: {
      width: '80%',
      height: 1,
      alignSelf: 'center'
    },
    container__divider_bottom: {
      width: '80%',
      height: 1,
      marginTop: 16,
      alignSelf: 'center'
    }
  }),
  DepratiEmarsysDiorCarouselComponent1: StyleSheet.create({
    container__divider_bottom: {
      width: '86%',
      height: 1,
      alignSelf: 'center'
    }
  }),
  DepratiEmarsysDiorCarouselComponent2: StyleSheet.create({
    container__divider_bottom: {
      width: '86%',
      height: 1,
      marginBottom: 16,
      alignSelf: 'center'
    }
  }),
  DiorSimpleBannerComponent4: StyleSheet.create({
    container: {
      marginTop: 16
    }
  }),
  DiorSimpleBannerComponent5: StyleSheet.create({
    container: {
      marginTop: 24
    }
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE
  },
  titleCorner: {
    color: '#93A950'
  }
});
