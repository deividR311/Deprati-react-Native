import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../../../../application/common';
import { FontStyles } from '../../../../../application/common/fonts';
import {
  BaseOptions,
  productResponse
} from '../../../../../infrastucture/apis/product';
import ItemColors from '../../PLP/components/colors/ItemColors';

interface Props {
  variantColors: any[];
  code: string;
  handleSetProductCode: (productCode: string) => void;
  loadingProduct: boolean;
  baseOptions: BaseOptions[];
  contentProduct?: productResponse;
  useSizeSelected?: [boolean, Dispatch<SetStateAction<boolean>>];
}

interface Colors {
  dataUri: string;
  isCheck: boolean;
}

export const VariantColors = (props: Props) => {
  const {
    variantColors,
    code: codeItem,
    handleSetProductCode,
    loadingProduct,
    baseOptions,
    contentProduct = null,
    useSizeSelected = []
  } = props;
  const [colors] = variantColors;
  const baseOptionsStok = baseOptions[0]?.options ?? [];
  const [_, setSizeSelected] = useSizeSelected;

  const validStock = (colorCode: string, otherParams: any) => {
    try {
      if (contentProduct && colorCode) {
        let someStock = true;
        const { variantMatrix } = contentProduct;
        const variantColor = variantMatrix?.find(
          op => op?.variantValueCategory?.code === colorCode
        );
        if (variantColor?.elements?.length > 0) {
          someStock = variantColor?.elements?.some(talla => {
            try {
              const codeTalla = talla?.variantOption?.code ?? '';
              const stockTalla = baseOptionsStok.find(
                stock => stock?.code === codeTalla
              );
              return stockTalla?.stock?.stockLevel > 0;
            } catch (error) {
              return false;
            }
          });
        } else {
          const { code } = otherParams ?? {};
          const stockColor = baseOptionsStok.find(
            stock => stock?.code === code
          );
          someStock = stockColor?.stock?.stockLevel > 0;
        }

        return someStock;
      }
    } catch (error) {}
    return true;
  };

  const colorsData: Colors[] = useMemo(() => {
    const { values } = colors ?? {};
    if (values?.length > 0) {
      return values
        ?.map(elemt => {
          const {
            variantOption: { variantOptionQualifiers, code },
            variantValueCategory: { code: codeColor }
          } = elemt;
          const isCheck = code === codeItem;
          const imareUri = [...variantOptionQualifiers].pop();
          const dataUri = imareUri?.image?.url ?? '';
          return { dataUri, isCheck, code, codeColor };
        })
        .filter(({ codeColor, ...otherParams }) => {
          return validStock(codeColor, otherParams);
        });
    }
    return [];
  }, [colors]);

  return (
    <View style={styles.container}>
      {/* {loadingProduct && (
        <ActivityIndicator size={'small'} color={COLORS.BRAND} />
      )} */}
      <Text style={styles.container_title}>Color</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={colorsData}
        renderItem={item => {
          const { dataUri, isCheck, code } = item.item;
          return (
            <ItemColors
              size={36}
              dataUri={dataUri}
              onPress={() => {
                if (!isCheck) {
                  setSizeSelected(false);
                  handleSetProductCode(code, true);
                }
              }}
              isCheck={isCheck}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  container_title: {
    ...FontStyles.Body_1,
    textAlign: 'left'
  }
});
