import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { FontStyles } from '../common';

interface FormatTextByTagsArgs {
  text: string;
  openTag?: string;
  closeTag?: string;
  newTextStyle?: StyleProp<TextStyle>;
  defaultTextStyle?: StyleProp<TextStyle>;
}

/**
 * Toma una cadena de texto como entrada y devuelve una lista de componentes de texto que se han formateado según las etiquetas de inicio y fin que se proporcionan. Por defecto, la función está diseñada para trabajar con las etiquetas de apertura y cierre <b> y </b>.
 *
 * @param {string} text - Texto el cual va a ser formateado.
 * @param {string} [openTag="<b>"] - Etiqueta de apertura desde donde se extraera el texto a que se le aplicara el estilo.
 * @param {string} [closeTag="</b>"] - Etiqueta de apertura desde donde se extraera el texto a que se le aplicara el estilo.
 * @param {StyleProp<TextStyle>} [newTextStyle] - Estilo que se le aplicara al contenido de las etiquetas suministradas.
 * @param {StyleProp<TextStyle>} [defaultTextStyle={fontWeight: '400'}] - Estilo por defecto que se debe aplicar.
 * @returns [JSX.Element] - Lista de componentes de texto formateados.
 */
export const formatTextByTags = ({
  text,
  openTag = '<b>',
  closeTag = '</b>',
  newTextStyle = FontStyles.Bold,
  defaultTextStyle = {
    fontWeight: '400'
  }
}: FormatTextByTagsArgs): JSX.Element[] => {
  return text.split(openTag).map((t1, index) => {
    const isTag = t1.includes(closeTag);
    const textContent = t1.split(closeTag);
    return (
      <Text
        key={`${openTag}-${index}`}
        style={isTag ? newTextStyle : undefined}>
        {textContent.map((t2, i) => (
          <Text
            key={`${closeTag}-${i}`}
            style={i > 0 ? defaultTextStyle : undefined}>
            {t2}
          </Text>
        ))}
      </Text>
    );
  });
};

export default formatTextByTags;
