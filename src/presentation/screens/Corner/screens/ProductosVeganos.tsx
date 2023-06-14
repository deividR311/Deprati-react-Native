import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { sectionByCorner } from '../utils/sectionCorner';
import ExtensionSlot from '../../../common-components/extension-slot';
import { HEIGHT_TAB_BAR } from '../../../../application/common';
interface Props {
  content: any;
}

export default function ProductosVeganos(props: Props) {
  const { content } = props;
  const [sections_1, section_2] = sectionByCorner[content.uid];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: '#F5F5F5'
        }}
        style={{
          width: '100%',
          marginBottom: HEIGHT_TAB_BAR
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
}

const stylesComponent = {
  ProductosVeganosParagraphComponent2: StyleSheet.create({
    container: {
      width: 290
    }
  }),
  ProductosVeganosParagraphComponent4: StyleSheet.create({
    container: {
      width: 290
    }
  }),
  ProductosVeganosParagraphComponent6: StyleSheet.create({
    container: {
      width: 300
    }
  }),
  ProductosVeganosParagraphComponent8: StyleSheet.create({
    container: {
      width: 330
    }
  }),
  ProductosVeganosParagraphComponent10: StyleSheet.create({
    container: {
      width: 320
    }
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5'
  },
  titleCorner: {
    color: '#93A950'
  }
});
