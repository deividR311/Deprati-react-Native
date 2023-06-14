import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../application/common/layout';

import { ExtensionComponentProps } from '../extension-component';
import CategoryMainItem from './CategoryMainItem';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {}

const CategoryMain = (props: Props) => {
  const { customProps } = props;
  const {
    title,
    childrenComponentsList,
    childrenComponents = {},
    style: customStyle
  } = customProps ?? {};

  return (
    <View style={[styles.container, customStyle?.container]}>
      {title && (
        <View style={[styles.container__title, customStyle?.container__title]}>
          <Text
            style={[
              styles.container__title_text,
              customStyle?.container__title_text
            ]}>
            {title ?? ''}
          </Text>
        </View>
      )}
      <FlatList
        style={[
          styles.container__categories,
          customStyle?.container__categories
        ]}
        contentContainerStyle={{
          paddingRight: 16
        }}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={childrenComponentsList}
        renderItem={({ item, index }) => {
          if (childrenComponents[item])
            return (
              <CategoryMainItem
                content={childrenComponents[item]}
                testId={`category_main${index}`}
              />
            );
          return null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
    marginBottom: 16
    //backgroundColor: 'yellow',
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    paddingBottom: 8,
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    color: COLORS.DARK70
  },
  container__categories: {
    paddingLeft: MARING_HORIZONTAL,
    flexDirection: 'row',
    flexWrap: 'wrap'
    //backgroundColor: 'blue',
  }
});

export default CategoryMain;
