import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { sectionByCorner } from '../utils/sectionCorner';
import ExtensionSlot from '../../../common-components/extension-slot';
import { COLORS, HEIGHT_TAB_BAR } from '../../../../application/common';
import ExtensionComponent from '../../../common-components/extension-component';
import DepratiDoubleResponsiveRopaFrio from '../components/DepratiDoubleResponsiveRopaFrio';
import { useNavigation } from '@react-navigation/native';
import { trackCategoryViewEmarsys } from '../../../../infrastucture/native-modules/emarsys/emarsys';
interface Props {
  content: any;
}

export default function ColeccionFrioMujer(props: Props) {
  const { content } = props;
  const [section_1, section_2] = sectionByCorner[content.uid];
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation?.setParams({
      queryEmarsys: 'HOME > Mujeres'
    });
  }, [navigation]);
  trackCategoryViewEmarsys('Mujeres');

  const renderItem = ({ item, index }) => {
    try {
      const componentContent = content?.components[item];
      const style = stylesComponent
        ? stylesComponent[componentContent?.uid]
        : {};
      if (
        componentContent?.typeCode === 'DepratiDoubleResponsiveBannerComponent'
      ) {
        return (
          <DepratiDoubleResponsiveRopaFrio
            key={index.toString()}
            customProps={{ ...componentContent, style }}
          />
        );
      }
      if (componentContent)
        return (
          <ExtensionComponent key={index} style={style} {...componentContent} />
        );
      return null;
    } catch (err) {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <ExtensionSlot
        slot={content?.slots[section_1]}
        content={content}
        stylesComponent={stylesComponent}
        contentStyle={{
          width: '100%',
          marginBottom: HEIGHT_TAB_BAR
        }}
        customRenderItem={renderItem}>
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[section_2]}
          content={content}
          stylesComponent={stylesComponent}
        />
      </ExtensionSlot>
    </View>
  );
}

const stylesComponent = {
  ColeccionFrioMujerCategoryFeatureCarousel2: StyleSheet.create({
    container: {
      paddingVertical: 8
    }
  }),
  ColeccionFrioMujerSimpleBannerComponent2: StyleSheet.create({
    container: {
      paddingVertical: 8
    }
  }),
  ColeccionFrioMujerSimpleBannerComponent3: StyleSheet.create({
    container: {
      paddingVertical: 8
    }
  }),
  ColeccionFrioMujerSimpleBannerComponent4: StyleSheet.create({
    container: {
      paddingVertical: 8
    }
  }),
  ColeccionFrioMujerCategoryDoubleBanner1: StyleSheet.create({
    container: {
      marginLeft: 0
    },
    banner__container: {
      width: 100,
      marginHorizontal: 2,
      height: 100
    },
    banner__container_img: {
      width: 100,
      height: 100
    },
    container__divider_top: {
      width: '86%',
      height: 1,
      alignSelf: 'center'
    },
    container__divider_bottom: {
      width: '86%',
      height: 1,
      marginTop: 16,
      alignSelf: 'center'
    }
  }),
  ColeccionFrioMujerCategoryFeatureCarousel3: StyleSheet.create({
    container: {
      paddingVertical: 16
    }
  }),
  DepratiEmarsysColeccionFrioMujerCarouselComponent: StyleSheet.create({
    container__divider_bottom: {
      width: '86%',
      height: 1,
      marginBottom: 16,
      alignSelf: 'center'
    }
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE
  },
  titleCorner: {
    color: '#93A950'
  }
});
