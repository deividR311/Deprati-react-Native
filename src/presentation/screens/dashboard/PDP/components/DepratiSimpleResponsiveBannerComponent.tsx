import { View, ViewStyle, ImageStyle } from 'react-native';
import React from 'react';
import { ExtensionComponentProps } from '../../../../common-components/extension-component';
import SimpleBanner from '../../../../common-components/banner-home/SimpleBanner';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {
  code: string;
  mime: string;
  altText: string;
  url: string;
  downloadUrl: string;
  height?: number;
  style?: {
    container?: ViewStyle;
    image?: ImageStyle;
  };
}

export const DepratiSimpleResponsiveBannerComponent = (props: Props) => {
  const {
    customProps: { childrenComponentsList, childrenComponents }
  } = props;

  return (
    <View>
      {childrenComponentsList?.map(child => {
        if (childrenComponents) {
          const { media } = childrenComponents[child];

          return (
            <SimpleBanner
              customProps={{ ...props.customProps, media, urlLink: '' }}
            />
          );
        }
      })}
    </View>
  );
};
