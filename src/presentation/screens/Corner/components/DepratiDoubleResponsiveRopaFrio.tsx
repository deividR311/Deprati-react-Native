import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  COLORS,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../../application/common';
import ExtensionComponent, {
  ExtensionComponentProps
} from '../../../common-components/extension-component';
import layout from '../../../../application/common/layout';
import { useComponentsMutation } from '../../../../infrastucture/apis/contentPage';

interface Props {
  customProps: CustomProp;
}
interface CustomProp extends ExtensionComponentProps {}

const DepratiDoubleResponsiveRopaFrio = (props: Props) => {
  const { customProps } = props;
  const {
    childrenComponentsList,
    childrenComponents = {},
    title,
    style: customStyle,
    width: widthCustom
  } = customProps;
  const widthScren = widthCustom ?? layout.window.width;
  const [banners, setBanners] = useState([]);
  const [getComponent] = useComponentsMutation();

  const getBanners = async () => {
    try {
      const [nameChild] = childrenComponentsList ?? [];
      const firtsBanner = childrenComponents[nameChild];
      if (customProps?.secondBannersList) {
        const response = await getComponent({
          componentIds: [customProps?.secondBannersList]
        });
        if (response?.data?.component?.length > 0) {
          const [secondBanners] = response?.data?.component;
          setBanners([firtsBanner, secondBanners]);
        }
        return;
      }

      setBanners([firtsBanner]);
    } catch (error) {}
  };

  useEffect(() => {
    if (childrenComponentsList?.length > 0) {
      getBanners();
    }
  }, [childrenComponentsList?.length]);

  if (banners?.length === 0) return null;

  return (
    <View style={[styles.container, customStyle?.container]}>
      <Divider
        style={[
          styles.container__divider_top,
          customStyle?.container__divider_top
        ]}
      />
      {title && (
        <View style={[styles.container__title, customStyle?.container__title]}>
          <Text
            style={[
              styles.container__title_text,
              customStyle?.container__title_text
            ]}>
            {title}
          </Text>
        </View>
      )}
      <View style={[styles.content_banners, customStyle?.content_banners]}>
        {banners?.map((banner, index) => {
          if (banner?.uid)
            return (
              <ExtensionComponent
                key={index}
                {...banner}
                style={{
                  container: {
                    ...styles.banner__container,
                    width: widthScren / 2 - 5
                  },
                  image: styles.banner__container_img
                }}
              />
            );
        })}
      </View>

      <Divider
        style={[
          styles.container__divider_bottom,
          customStyle?.container__divider_bottom
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: MARING_HORIZONTAL,
    marginLeft: MARING_HORIZONTAL,
    marginBottom: 10
  },
  container__title: {
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    ...FontStyles.Body_2,
    color: COLORS.DARK70
  },
  content_banners: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2
  },
  banner__container: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '50%'
  },
  banner__container_img: {
    width: '100%'
  },
  container__divider_top: {},
  container__divider_bottom: {}
});

export default DepratiDoubleResponsiveRopaFrio;
