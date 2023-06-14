import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../../../../application/common';
import { FontStyles } from '../../../../../application/common/fonts';

interface Props {
  variantColors: {
    codigo: string;
    descrip: string;
    art_Con: string;
    inv_Tda: number;
  }[];
  useColor: [string, Dispatch<SetStateAction<string>>];
}

export const VariantColors = (props: Props) => {
  const { variantColors, useColor } = props;
  const [colorSelect, setColorSelect] = useColor;

  if (!variantColors?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.container_title}>Color</Text>
      <View style={styles.container_list}>
        {variantColors.map((color, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                {
                  backgroundColor:
                    colorSelect === color.codigo ? COLORS.BRAND : COLORS.WHITE
                }
              ]}
              onPress={() => {
                setColorSelect(color.codigo);
              }}>
              <Text
                style={[
                  styles.card_text,
                  {
                    color:
                      colorSelect === color.codigo
                        ? COLORS.WHITE
                        : COLORS.DARK70
                  }
                ]}
                numberOfLines={3}>
                {color.descrip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16
  },
  container_title: {
    ...FontStyles.Body_1,
    textAlign: 'left'
  },
  container_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16
  },
  card: {
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.GRAYBRAND,
    padding: 2,
    marginRight: 16,
    marginBottom: 16
  },
  card_text: {
    ...FontStyles.Body_2,
    textAlign: 'center',
    alignSelf: 'center'
  }
});
