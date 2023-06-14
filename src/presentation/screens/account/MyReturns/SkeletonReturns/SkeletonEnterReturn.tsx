import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';

export const SkeletonEnterReturn = () => {
  const SkeletonFooter = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginTop: 50 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'total',
            alignSelf: 'center',
            width: '85%',
            height: 60
          },
          {
            key: 'button',
            alignSelf: 'center',
            marginTop: 10,
            width: '85%',
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
            width: '30%',
            height: 25
          },
          {
            key: 'header2',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '42%',
            height: 25
          },
          {
            key: 'header3',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '38%',
            height: 25
          },
          {
            key: 'header4',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '35%',
            height: 25
          },
          {
            key: 'subtitlw',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '70%',
            height: 40
          },
          {
            key: 'all',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '45%',
            height: 25
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
        ListFooterComponent={() => <SkeletonFooter />}
        numColumns={1}
        data={[1, 2]}
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
