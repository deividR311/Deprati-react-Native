import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';

export const SkeletonMyReturnDetail = () => {
  const SkeletonFooter = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginTop: 50 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'button',
            alignSelf: 'center',
            marginTop: 10,
            width: '85%',
            height: 50
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
            height: 20
          },
          {
            key: 'header2',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '42%',
            height: 20
          },
          {
            key: 'header3',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '38%',
            height: 20
          },
          {
            key: 'header4',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '35%',
            height: 20
          },
          {
            key: 'subtitlw',
            marginLeft: 20,
            marginTop: 10,
            alignSelf: 'flex-start',
            width: '20%',
            height: 28
          },
          {
            key: 'all',
            marginLeft: 20,
            marginVertical: 5,
            alignSelf: 'flex-start',
            width: '25%',
            height: 25
          },
          {
            key: 'lne',
            marginVertical: 15,
            alignSelf: 'flex-start',
            width: '100%',
            height: 35
          }
        ]}
      />
    );
  };

  const SkeletonBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.columnleftRight}>
          <SkeletonFile />
        </View>
        <View style={styles.center}>
          <SkeletonFile />
        </View>
        <View style={styles.columnleftRight}>
          <SkeletonFile />
        </View>
      </View>
    );
  };

  const SkeletonFile = () => {
    return (
      <SkeletonContent
        containerStyle={{ marginTop: 10 }}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'Card',
            alignSelf: 'center',
            width: '95%',
            height: 60
          }
        ]}
      />
    );
  };

  return (
    <>
      <SkeletonHead />
      {[1, 2, 3].map((x, index) => (
        <SkeletonBody key={`skBody-${index}`} />
      ))}
      <SkeletonFooter />
    </>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  columnleftRight: { width: '25%' },
  center: { width: '50%' }
});
