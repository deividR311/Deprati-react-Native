import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ExtensionSlot from '../../../common-components/extension-slot';
import { COLORS, HEIGHT_TAB_BAR } from '../../../../application/common';
interface Props {
  content: any;
}

export default function CornerTemplate(props: Props) {
  const { content } = props;
  const [sections_1, section_2] = ['Section1', 'Section2'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', marginBottom: HEIGHT_TAB_BAR }}>
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[sections_1]}
          content={content}
        />
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[section_2]}
          content={content}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE
  },
  titleCorner: {
    color: '#93A950'
  }
});
