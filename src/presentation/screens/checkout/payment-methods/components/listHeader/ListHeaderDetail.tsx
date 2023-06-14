import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import {
  COLORS,
  FONTS_SIZES,
  FontStyles
} from '../../../../../../application/common';
import {
  fontFamilyOS,
  fontWeightOS
} from '../../../../../../application/utils';

interface IListHeaderDetail {
  title?: string;
  subtitle?: string;
  headerText?: string;
  bodyText?: string;
  children?: string | JSX.Element | null | undefined;
}

export const ListHeaderDetail = ({
  title,
  subtitle,
  headerText,
  bodyText,
  children
}: IListHeaderDetail) => {
  return (
    <View style={styles.container}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text style={[FontStyles.Body_1, styles.header__text_title]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={styles.header__text_subtitle}>{subtitle}</Text>
          )}
        </View>
      )}
      {children && (
        <>
          {headerText && (
            <Text style={styles.header__text_red}>{headerText}</Text>
          )}

          {children}

          <View style={styles.container__line} />
        </>
      )}

      {bodyText && <Text style={styles.header__text_black}>{bodyText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  },
  header: {
    marginBottom: 16
  },
  header__text_title: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.title,
    color: COLORS.DARK70,
    lineHeight: 21,
    letterSpacing: 0.44
  },
  header__text_subtitle: {
    fontFamily: fontFamilyOS('Regular'),
    fontSize: FONTS_SIZES.label,
    fontWeight: '400',
    color: COLORS.DARK70,
    lineHeight: 20,
    marginTop: 4,
    letterSpacing: 0.44
  },
  header__text_red: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('600'),
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARKBRAND,
    marginBottom: 12,
    lineHeight: 24,
    letterSpacing: 0.44
  },
  header__text_black: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('600'),
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK70,
    marginBottom: 12,
    lineHeight: 16,
    letterSpacing: 0.44
  },
  container__line: {
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 2,
    marginVertical: 20
  }
});
