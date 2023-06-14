import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ExtensionSlot from '../../../common-components/extension-slot';
import { COLORS, HEIGHT_TAB_BAR } from '../../../../application/common';
interface Props {
  content: any;
}

export default (props: Props) => {
  const { content } = props;
  const [sections_1, section_2] = ['Section1', 'Section2'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          marginBottom: HEIGHT_TAB_BAR + 16
        }}>
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[sections_1]}
          content={content}
          stylesComponent={stylesComponent}
        />
        <ExtensionSlot
          hasScroll={false}
          slot={content?.slots[section_2]}
          content={content}
          stylesComponent={stylesComponent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesComponent = {
  SocialmenteConscienteSimpleBannerComponent2: StyleSheet.create({
    container: {
      marginTop: 0
    }
  }),
  SocialmenteConscienteParagraphComponent1: StyleSheet.create({
    container: {
      width: 300
    }
  }),
  SocialmenteConscienteParagraphComponent2: StyleSheet.create({
    container: {
      width: 260
    }
  }),
  SocialmenteConscienteLink1: StyleSheet.create({
    container: {
      width: '90%',
      paddingHorizontal: 0,
      paddingBottom: 24,
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.DARK70TRANSPARENT
    }
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 10,
    backgroundColor: COLORS.WHITE
  }
});
