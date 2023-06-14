import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontStyles } from '../../../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';
interface Props {
  title?: string;
  text?: string;
  isRevertStyle?: boolean;
}
export default function TextRow({ text, title, isRevertStyle }: Props) {
  const applyStyle = useMemo(() => {
    return {
      title: isRevertStyle ? styles.text : styles.title,
      text: isRevertStyle ? styles.title : styles.text
    };
  }, [isRevertStyle]);

  return (
    <View style={styles.container}>
      <Text style={applyStyle.title}>
        {`${title} `}
        <Text lineBreakMode="clip" style={[applyStyle.text, { width: '72%' }]}>
          {text}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginTop: 3 },
  title: {
    ...FontStyles.Body_2,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS()
  },
  text: { ...FontStyles.Body_2 }
});
