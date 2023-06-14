import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import type { ExtensionComponentProps } from '../extension-component';
import { FontStyles } from '../../../application/common';
import RenderHTML from '../renderHtml/RenderHTML';
import layout from '../../../application/common/layout';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {
  content: string;
}

const CMSParagraph = (props: Props) => {
  const { customProps } = props;
  const { content, style: customStyle } = customProps;
  const width = layout.window.width;
  if (!content) return null;

  return (
    <View style={[styles.container, customStyle?.container]}>
      <RenderHTML
        contentWidth={width}
        text={`<p>${content}</p>`}
        tagsStyles={styles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 8,
    textAlign: 'center'
  },
  h1: {
    ...FontStyles.Body_1,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center'
  },
  p: {
    ...FontStyles.Body_2,
    alignSelf: 'center',
    textAlign: 'center'
  },
  b: {
    ...FontStyles.Body_2,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center'
  }
});

export default CMSParagraph;
