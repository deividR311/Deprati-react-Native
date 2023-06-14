import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';

export const SkeletonMyReturnSolicit = () => {
  const SkeletonPag = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginVertical: 20 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'buttonPag',
            alignSelf: 'center',
            width: '40%',
            height: 40
          }
        ]}
      />
    );
  };

  const SkeletonHead = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginTop: 20 }}
        isLoading={true}
        animationDirection="horizontalRight"
        layout={[
          {
            key: 'header',
            alignSelf: 'flex-start',
            marginLeft: 20,
            width: '80%',
            height: 60
          },
          {
            key: 'header2',
            marginLeft: 20,
            marginVertical: 20,
            alignSelf: 'flex-start',
            width: '85%',
            height: 40
          }
        ]}
      />
    );
  };

  return (
    <>
      <SkeletonContent
        containerStyle={{}}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'lineHead',
            alignSelf: 'center',
            width: '100%',
            height: 30,
            marginVertical: 15
          }
        ]}
      />
      <FlatList
        style={{ width: '100%' }}
        ListHeaderComponent={() => <SkeletonHead />}
        ListFooterComponent={() => <SkeletonPag />}
        numColumns={1}
        data={[1, 2]}
        renderItem={() => (
          <>
            <SkeletonContent
              containerStyle={{ marginVertical: 15 }}
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
