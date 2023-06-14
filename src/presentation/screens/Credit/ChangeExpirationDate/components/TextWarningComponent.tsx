import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontStyles } from '../../../../../application/common';
import formatTextByTags from '../../../../../application/utils/formatTextByTags';
import { ExpirationDateContent } from '../../../../../infrastucture/apis/contentService';

export const TextWarningComponent = ({
  content
}: ITextWarningComponentProps) => {
  return (
    <>
      {content?.popup_paragraphs.map((text, i) => {
        return (
          <React.Fragment key={'paragraph' + i}>
            <Text style={[FontStyles.Body_1]}>
              {formatTextByTags({ text })}
            </Text>
            <View style={styles.space} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  space: { marginVertical: 10 }
});

interface ITextWarningComponentProps {
  content: ExpirationDateContent | undefined;
}

export default TextWarningComponent;
