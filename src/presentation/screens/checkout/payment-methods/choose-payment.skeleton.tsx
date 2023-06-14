import React from 'react';
import { Dimensions } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const ChoosePaymentMethodSkeleton: React.FC = () => {
  const TOTAL_ITEMS = 5;
  return (
    <FlatList
      numColumns={1}
      initialNumToRender={2}
      contentContainerStyle={Styles.list}
      data={Array(TOTAL_ITEMS).fill('choose-payment-methods-skeleton-')}
      renderItem={({ item, index }) => {
        return (
          <SkeletonContent
            isLoading={true}
            animationDirection="diagonalDownRight"
            animationType="shiver"
            layout={[Styles.smallCard]}
          />
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  smallCard: {
    width: Dimensions.get('window').width - 40,
    height: 71,
    margin: 6,
    borderRadius: 4
  }
});
