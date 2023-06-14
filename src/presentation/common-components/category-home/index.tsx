import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import CategoryItem from '../../screens/home/components/CategoryItem';

import { ExtensionComponentProps } from '../extension-component';
import { fontWeightOS } from '../../../application/utils';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {}
const TITLE_TEXT = 'Navega por las categorías';
const CategoryHome = (props: Props) => {
  const { customProps } = props;
  const { mediaContainer } =
    customProps?.childrenComponents?.HomePageCategoryListComponent ?? {};

  const mediaContainerOrder = mediaContainer?.sort((a, b) => {
    return a?.order - b?.order;
  });

  return (
    <View style={styles.container}>
      <View style={styles.container__title}>
        <Text style={styles.container__title_text}>{TITLE_TEXT}</Text>
      </View>
      <View style={styles.container__categories}>
        {mediaContainerOrder?.map((category, index) => {
          const lastIndex = mediaContainer?.length - 1;
          const hastLastItem =
            index == lastIndex && mediaContainer?.length % 2 !== 0;
          return (
            <CategoryItem
              key={`category${index}`}
              testId={`category${index}`}
              lastItem={hastLastItem}
              content={category}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    fontSize: FONTS_SIZES.title,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    color: COLORS.DARK70
  },
  container__categories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default CategoryHome;
