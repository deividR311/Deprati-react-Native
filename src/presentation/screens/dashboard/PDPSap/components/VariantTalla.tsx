import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../../application/common';
import { FontStyles } from '../../../../../application/common/fonts';

interface Props {
  variantTalla: {
    ean: string;
    cod_Color: string;
    color: string;
    cod_Talla: string;
    talla: string;
    art_Con: string;
  }[];
  useTalla: [string, Dispatch<SetStateAction<string>>];
  useEan: [string, Dispatch<SetStateAction<string>>];
  useSizeSelected: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const VariantTalla = (props: Props) => {
  const { variantTalla, useTalla, useEan, useSizeSelected } = props;
  const [tallaSelect, setTallaSelect] = useTalla;
  const [_, setEanSelect] = useEan;
  const [__, setSizeSelected] = useSizeSelected;
  if (!variantTalla?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.container_title}>Talla</Text>
      <View style={styles.container_list}>
        {variantTalla.map(({ talla, cod_Talla, ean }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setTallaSelect(cod_Talla);
                setEanSelect(ean);
                setSizeSelected(true);
              }}
              style={[
                styles.card,
                {
                  backgroundColor:
                    tallaSelect === cod_Talla ? COLORS.BRAND : COLORS.WHITE
                }
              ]}>
              <Text
                style={[
                  styles.card_text,
                  {
                    color:
                      tallaSelect === cod_Talla ? COLORS.WHITE : COLORS.DARK70
                  }
                ]}
                numberOfLines={3}>
                {talla}
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
    marginTop: 8,
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
