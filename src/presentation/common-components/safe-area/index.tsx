import React from 'react';
import { View, Platform } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { COLORS } from '../../../application/common/colors';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';

export const SafeArea: React.FC = ({ children }) => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={{ flex: 1, marginTop: top - 10 }}>{children}</View>
      ) : (
        <SafeAreaView
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingBottom: HEIGHT_TAB_BAR
          }}>
          {children}
        </SafeAreaView>
      )}
    </>
  );
};
