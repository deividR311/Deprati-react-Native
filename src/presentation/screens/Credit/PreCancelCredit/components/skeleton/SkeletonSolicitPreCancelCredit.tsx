import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout from '../../../../../../application/common/layout';

export const SkeletonSolicitPreCancelCredit = () => {
  return (
    <SkeletonContent
      containerStyle={{ marginTop: 20 }}
      isLoading={true}
      animationDirection="horizontalLeft"
      layout={[
        {
          key: 'card',
          alignSelf: 'center',
          marginTop: 10,
          width: '85%',
          height: 90
        },
        {
          key: 'content',
          alignSelf: 'center',
          marginTop: 10,
          width: '85%',
          height: layout.window.height * 0.45
        },
        {
          key: 'buttons',
          alignSelf: 'center',
          marginTop: 30,
          width: '85%',
          height: 100
        }
      ]}
    />
  );
};
