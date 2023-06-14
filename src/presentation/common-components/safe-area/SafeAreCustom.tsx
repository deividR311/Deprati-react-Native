import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Platform, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { COLORS } from '../../../application/common/colors';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';

export function SafeAreCustom({
  children,
  styleAndroid = {},
  styleIos = {}
}: {
  children: React.ReactNode;
  styleAndroid?: StyleProp<ViewStyle>;
  styleIos?: StyleProp<ViewStyle>;
}) {
  const { top } = useSafeAreaInsets();
  return (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={[
            styles.containerIos,
            styleIos,
            { marginTop: top - 10, backgroundColor: COLORS.WHITE }
          ]}>
          {children}
        </View>
      ) : (
        <SafeAreaView style={[styles.containerAndroid, styleAndroid]}>
          {children}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerAndroid: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: HEIGHT_TAB_BAR,
    backgroundColor: COLORS.WHITE
  },
  containerIos: { flex: 1 }
});
