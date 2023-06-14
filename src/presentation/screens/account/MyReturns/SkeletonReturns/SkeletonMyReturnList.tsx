import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';
export const SkeletonMyReturnList = () => {
  const SkeletonLineHead = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginVertical: 20 }}
        isLoading={true}
        animationDirection="horizontalRight"
        layout={[
          {
            key: 'lineHead',
            alignSelf: 'center',
            width: '100%',
            height: 30
          }
        ]}
      />
    );
  };

  const SkeletonButton = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginVertical: 20 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'button',
            alignSelf: 'center',
            width: '85%',
            height: 50
          }
        ]}
      />
    );
  };

  return (
    <>
      <FlatList
        style={{ width: '100%' }}
        ListHeaderComponent={() => <SkeletonLineHead />}
        ItemSeparatorComponent={() => <SkeletonLineHead />}
        ListFooterComponent={() => <SkeletonButton />}
        numColumns={1}
        data={[1, 2, 3]}
        renderItem={() => (
          <SkeletonContent
            containerStyle={{}}
            isLoading={true}
            animationDirection="horizontalLeft"
            layout={[
              {
                key: 'Card',
                alignSelf: 'center',
                width: '85%',
                height: 130
                // marginBottom: 6,
              }
            ]}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 10,
    paddingBottom: HEIGHT_TAB_BAR,
    flexDirection: 'row'
  },
  header: { height: 10 },
  separator: { height: 5, backgroundColor: 'red' },
  containerPhoto: {
    width: layout.window.width * 0.97,
    // height: layout.window.height * 0.85,
    alignSelf: 'center'
  }
});
