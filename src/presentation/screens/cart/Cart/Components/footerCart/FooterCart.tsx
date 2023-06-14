import React, { useState } from 'react';
import { COLORS, FontStyles } from '../../../../../../application/common';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SkeletonHeaderInfo } from './SkeletonFooterCart';
import BottomSheetCart from './BottomSheetCart';

interface Props {
  totalUnit?: number;
  totalOrder?: string;
  children?: React.ReactNode;
  screenId?: string;
}

export default function FooterCart({
  totalOrder = '',
  totalUnit = 0,
  children,
  screenId = ''
}: Props) {
  const [showBottomSheet, setshowBottomSheet] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setshowBottomSheet(prev => !prev)}>
        <View style={styles.header_container_buttons}>
          <Icon name="keyboard-arrow-up" size={20} />
          {!totalUnit ? (
            <SkeletonHeaderInfo />
          ) : (
            <Text style={FontStyles.Subtitle}>
              {`Total (${totalUnit} productos): ${totalOrder}`}
            </Text>
          )}
          <Icon name="keyboard-arrow-up" size={20} />
        </View>
      </TouchableOpacity>
      <View style={styles.container__child}>{children}</View>
      <BottomSheetCart
        showBottomSheet={showBottomSheet}
        onCloseRequest={() => setshowBottomSheet(false)}
        screenId={screenId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: Platform.select({
      android: 70,
      ios: 80
    }),
    bottom: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.DEPRATYGRAY,
    elevation: 24,
    shadowColor: COLORS.DARK,
    shadowOpacity: 0.8,
    shadowRadius: 6.27,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  container__child: {
    marginBottom: 12,
    paddingHorizontal: 16
  },
  header_container_buttons: {
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
