import { StyleSheet, View } from 'react-native';
import React from 'react';
import type { ExtensionComponentProps } from '../extension-component';
import ExtensionSlot from '../extension-slot';
import { Text } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../application/common';

interface Props {
  customProps: ExtensionComponentProps;
}

const DepratiBrandsRotatingImages = (props: Props) => {
  const { customProps } = props;

  const propsRotating = React.useMemo(() => {
    if (customProps?.rotatingImagesComponentsList) {
      const componentName = customProps?.rotatingImagesComponentsList;
      const content = customProps?.childrenComponents[componentName];
      if (content)
        return { ...content, components: content?.childrenComponents };
    }
    return null;
  }, [customProps?.rotatingImagesComponentsList]);
  if (!propsRotating) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.container__title_text}>Marca</Text>
      <ExtensionSlot
        slot={propsRotating.childrenComponentsList}
        content={propsRotating}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        horizontal
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 'auto',
    paddingLeft: 16,
    paddingTop: 24,
    backgroundColor: COLORS.WHITE,
    paddingBottom: 40
  },
  container__title_text: {
    ...FontStyles.Regular,
    fontWeight: '700',
    color: COLORS.DARK70,
    marginBottom: 16
  }
});

export default DepratiBrandsRotatingImages;
