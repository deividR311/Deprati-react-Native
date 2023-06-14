import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import React, { useCallback } from 'react';
import { COLORS, FontStyles, FONTS_SIZES } from '../../../application/common';
import BackButton from '../backButton';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
interface NavigationOptions extends NativeStackNavigationOptions {
  isTitleButton?: boolean;
  headerTitleLines?: number;
  onHeaderTitle?(): void;
}
interface HeaderProps extends NativeStackHeaderProps {
  options: NavigationOptions;
}
export const HeaderNavigation: React.FC<HeaderProps> = props => {
  function HeaderLeft() {
    if (props.navigation.canGoBack()) {
      if (props?.options?.headerLeft?.(props))
        return <View>{props?.options?.headerLeft(props)}</View>;
      return <BackButton {...props} />;
    }
    return null;
  }

  function HeaderTitle() {
    return (
      <Text
        numberOfLines={props?.options?.headerTitleLines ?? 1}
        style={[
          {
            ...styles.title,
            fontSize: FONTS_SIZES.title
          },
          props.options.headerTitleStyle ?? {}
        ]}>
        {props.options.headerTitle}
      </Text>
    );
  }

  function Header() {
    return (
      <TouchableOpacity
        disabled={!props?.options?.isTitleButton}
        onPress={() => props?.options?.onHeaderTitle?.()}>
        <HeaderTitle />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.containerHeader, props.options.headerStyle ?? {}]}>
        <View
          accessible
          style={{
            ...styles.container_title,
            width: props.options.headerRight ? '78%' : '90%'
          }}>
          <HeaderLeft />
          <Header />
        </View>
        {props.options.headerRight && (
          <View>{props.options.headerRight(props)}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.WHITE },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  container_title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    ...FontStyles.H3_Headline,
    fontWeight: '300',
    textAlign: 'left',
    marginLeft: 16
  }
});
