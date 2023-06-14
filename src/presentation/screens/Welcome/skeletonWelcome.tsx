import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { styles } from './stylesWelcome';
export const SkeletonWelcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <SkeletonContent
          containerStyle={{ width: 300 }}
          isLoading={true}
          layout={[
            { key: 'someOtherId', width: '100%', marginTop: 60, height: 50 }
          ]}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: 10
        }}>
        <View
          style={{
            marginTop: 70,
            height: '70%',
            backgroundColor: 'white',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            width: '100%'
          }}>
          <View style={{ alignSelf: 'center' }}>
            <SkeletonContent
              containerStyle={{ flex: 1, width: 300 }}
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'title',
                  marginTop: 20,
                  alignContent: 'center',
                  alignSelf: 'center',
                  width: 220,
                  height: 40,
                  marginBottom: 6
                },
                {
                  key: 'Image',
                  alignSelf: 'center',
                  width: 180,
                  height: 200,
                  marginBottom: 6
                },
                {
                  key: 'text1',
                  marginTop: 10,
                  alignSelf: 'center',
                  width: 220,
                  height: 50
                },
                {
                  key: 'dots',
                  borderRadius: 20,
                  marginTop: 10,
                  alignSelf: 'center',
                  width: 10,
                  height: 10
                }
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerButtons}>
        <SkeletonContent
          containerStyle={{ width: 200 }}
          isLoading={true}
          animationDirection="horizontalLeft"
          layout={[
            {
              key: 'btn1',
              marginTop: -60,
              alignContent: 'center',
              alignSelf: 'center',
              width: 220,
              height: 40
            },
            {
              key: 'btn2',
              marginTop: 10,
              alignContent: 'center',
              alignSelf: 'center',
              width: 110,
              height: 40
            }
          ]}
        />
      </View>
    </View>
  );
};
