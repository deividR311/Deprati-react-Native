import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import type { ExtensionComponentProps } from '../extension-component';
import { COLORS, FontStyles } from '../../../application/common';
import { ButtonOutlined, MainButton } from '../buttons/Button';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {
  content: string;
}

const CMSLinkButton = (props: Props) => {
  const {
    customProps: { linkName, url, style: customStyle }
  } = props;
  const { goLink } = useLinkPress();

  if (!linkName) return null;

  return (
    <View style={[styles.container, customStyle?.container]}>
      <ButtonOutlined
        title={linkName}
        style={[styles.container_button, customStyle?.container_button]}
        styleText={[
          styles.container_button_text,
          customStyle?.container_button_text
        ]}
        onPress={() => goLink(url)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  container_button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: COLORS.DARK70,
    borderWidth: 1
  },
  container_button_text: {
    ...FontStyles.Button,
    alignSelf: 'center',
    textAlign: 'center'
  }
});

export default CMSLinkButton;
