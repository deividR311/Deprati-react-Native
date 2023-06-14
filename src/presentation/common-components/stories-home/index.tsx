import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Storie from '../stories';
import { ExtensionComponentProps } from '../extension-component';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import { EcommerceNavigationRoute } from '../../navigation/ecommerce';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {}

const StoriesHome = (props: Props) => {
  const { customProps } = props;
  const { childrenComponentsList, childrenComponents } = customProps;
  const navigation = useNavigation();

  const goToStorie = indexItem => {
    navigation.navigate(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.Stories,
      params: {
        customProps,
        indexItem
      }
    });
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.container__content}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={childrenComponentsList}
      renderItem={({ item, index }) => {
        if (childrenComponents[item])
          return (
            <Storie
              customProps={childrenComponents[item]}
              onPress={() => goToStorie(index)}
            />
          );
        return null;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: MARING_HORIZONTAL
  },
  container__content: {
    paddingRight: MARING_HORIZONTAL + 8
  }
});

export default StoriesHome;
