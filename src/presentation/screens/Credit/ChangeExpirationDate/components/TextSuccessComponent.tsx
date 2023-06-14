import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontStyles } from '../../../../../application/common';
import formatTextByTags from '../../../../../application/utils/formatTextByTags';

interface ISuccessProps {
  content: string | undefined;
}

const TextSuccessComponent = ({ content = '' }: ISuccessProps) => {
  return (
    <View style={styles.container}>
      <Text style={[FontStyles.Body_1, styles.contentText]}>
        {content?.split('\\n').map(text => formatTextByTags({ text }))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  contentText: { textAlign: 'center' }
});

export default TextSuccessComponent;
