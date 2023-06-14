import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { FontStyles } from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isHomeAssemblyRequired?: boolean;
}

export const ProductDetailsPageAssembleAtHomeComponent = (_props: Props) => {
  const { contentProduct: props } = _props ?? {};
  const { isHomeAssemblyRequired = false } = props ?? {};

  return (
    <>
      {isHomeAssemblyRequired ? (
        <View style={styles.container}>
          <Icon name="alert-circle-outline" size={32} color={COLORS.BRAND} />
          <Text style={styles.container__title}>
            Este artículo necesita ser armado en casa
          </Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: MARING_HORIZONTAL,
    paddingVertical: 12,
    marginHorizontal: MARING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.PINKBRAND,
    overflow: 'hidden',
    borderRadius: 4,
    paddingLeft: 16
  },
  container_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__title: {
    ...FontStyles.Body_2,
    paddingLeft: 8
  }
});
