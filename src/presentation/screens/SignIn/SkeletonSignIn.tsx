import { View } from 'react-native';
import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { stylesSignIn } from './stylesSignIn';

export default function SkeletonSignIn() {
  return (
    <View style={{ flex: 1 }} testID="skeletonSignIn">
      <View style={stylesSignIn.containerSkeleton}>
        <SkeletonContent
          isLoading={true}
          containerStyle={stylesSignIn.containerLogo}
          layout={[
            {
              key: 'title',
              width: 253,
              height: 70,
              marginTop: 20,
              marginHorizontal: 64
            },
            {
              key: 'title red',
              width: 150,
              height: 14,
              marginTop: 20,
              marginHorizontal: 64
            }
          ]}
        />

        <View>
          <SkeletonContent
            isLoading={true}
            containerStyle={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            layout={[
              {
                key: 'button red1',
                marginHorizontal: '3%',
                height: 46,
                width: 55,
                marginTop: 20,
                paddingHorizontal: '3%',
                paddingVertical: '2%'
              },
              {
                key: 'button red2',
                marginHorizontal: '3%',
                height: 46,
                width: 55,
                marginTop: 20,
                paddingHorizontal: '3%',
                paddingVertical: '2%'
              }
            ]}
          />
        </View>

        <View style={{ marginTop: 80 }}>
          <SkeletonContent
            isLoading={true}
            layout={[
              {
                key: 'input email',
                paddingLeft: 16,
                width: '100%',
                height: 48,
                marginTop: 370,
                borderBottomWidth: 0
              },
              {
                key: 'input password',
                marginTop: 20,
                width: '100%',
                height: 48,

                borderBottomWidth: 0
              },

              {
                key: 'btn1',
                marginTop: 43,
                width: '100%',
                height: 48,

                borderBottomWidth: 0
              },

              {
                key: 'text forgot',
                marginTop: 20,
                width: 160,
                height: 16,
                borderBottomWidth: 0
              },

              {
                key: 'icon biometrics',
                marginHorizontal: '3%',
                height: 60,
                width: 70,
                marginTop: 20
              },

              {
                key: 'text biometrics',
                marginTop: 20,
                width: 230,
                height: 16,
                borderBottomWidth: 0
              },

              {
                key: 'btn2',
                marginTop: 43,
                width: '100%',
                height: 48,

                borderBottomWidth: 0
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
}
