import React from 'react';
import RenderNativeHTML, {
  MixedStyleDeclaration,
  MixedStyleRecord,
  defaultSystemFonts
} from 'react-native-render-html';
import { FONTS_FAMILY } from '../../../application/common/fonts';
import { globalStyles } from '../../../application/common';

interface Props {
  tagsStyles?: MixedStyleRecord;
  baseStyle?: MixedStyleDeclaration;
  contentWidth?: number;
  text: string;
}

const systemFonts = [
  ...defaultSystemFonts,
  FONTS_FAMILY.Roboto,
  FONTS_FAMILY['Roboto-Medium'],
  FONTS_FAMILY['Roboto-Bold']
];

const RenderHTML = ({
  contentWidth,
  tagsStyles,
  baseStyle = globalStyles.baseStyle,
  text
}: Props) => {
  return (
    <RenderNativeHTML
      tagsStyles={tagsStyles}
      baseStyle={baseStyle}
      systemFonts={systemFonts}
      contentWidth={contentWidth}
      source={{ html: text }}
    />
  );
};
export default RenderHTML;
