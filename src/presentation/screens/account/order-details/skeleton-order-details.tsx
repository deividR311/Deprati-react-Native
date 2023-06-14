import * as React from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { SkeletonBox } from '../../../common-components/table';
import { SkeletonContentLayout } from './components/skeleton';
import { Styles } from './order-detail.stylesheet';

export const SkeletonOrderDetails: React.FC = () => {
  return (
    <View style={Styles.container}>
      <ScrollView style={Styles.scroll}>
        {/* HEADER */}
        <SkeletonContent
          isLoading={true}
          animationDirection="diagonalDownRight"
          animationType="shiver"
          containerStyle={Styles.sketonContentLayout}
          layout={SkeletonContentLayout}
        />

        {/* PURCHASE DETAILS */}
        <SkeletonBox isLoading={true} />
        <SkeletonBox isLoading={true} rows={4} />
        <SkeletonBox isLoading={true} rows={6} />

        <View style={[Styles.scroll__card]}>
          <SkeletonBox isLoading={true} rows={6} />
        </View>

        {/* FOOTER */}
        <SkeletonContent
          isLoading={true}
          animationDirection="diagonalDownRight"
          animationType="shiver"
          containerStyle={Styles.sketonContentLayout}
          layout={[
            { width: '60%', height: 30, alignSelf: 'center', marginBottom: 10 },
            { width: '100%', height: 100 },
            {
              width: '80%',
              height: 30,
              alignSelf: 'center',
              marginVertical: 10
            }
          ]}
        />
      </ScrollView>
    </View>
  );
};
