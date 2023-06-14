import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { HEIGHT_TAB_BAR } from '../../../../../../application/common';
import layout from '../../../../../../application/common/layout';

export const SkeletonPreCancelCredit = () => {
  const SkeletonHead = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginTop: 20 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'text',
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: '60%',
            height: 60
          },
          {
            key: 'card',
            alignSelf: 'center',
            marginTop: 10,
            width: '85%',
            height: 70
          },
          {
            key: 'all',
            alignSelf: 'center',
            marginTop: 10,
            width: '100%',
            height: 60
          }
        ]}
      />
    );
  };

  return (
    <>
      <FlatList
        style={{ width: '100%' }}
        ListHeaderComponent={() => <SkeletonHead />}
        numColumns={1}
        data={[1, 2, 3]}
        renderItem={() => (
          <>
            <SkeletonContent
              containerStyle={{ marginTop: 20 }}
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'Card',
                  alignSelf: 'center',
                  width: '85%',
                  height: 100
                }
              ]}
            />
          </>
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
