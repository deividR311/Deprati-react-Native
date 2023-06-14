import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { productResponse } from '../../../../../infrastucture/apis/product';
import { VariantColors } from './VariantColors';
import { VariantMonto } from './VariantMonto';
import { VariantSizes } from './VariantSizes';

interface Props {
  contentProduct: productResponse;
  handleSetProductCode: (productCode: string) => void;
  styleButtonDropdown?: ViewStyle;
  setIsColor?(x: boolean): void;
  setIsSize?(x: boolean): void;
  useSizeSelected: [boolean, Dispatch<SetStateAction<boolean>>];
  loadingProduct?: boolean;
}

export const VariantSelectorComponent = (props: Props) => {
  const {
    contentProduct,
    handleSetProductCode,
    styleButtonDropdown,
    useSizeSelected,
    loadingProduct = false
  } = props;
  const { variantSelectors, code, variantValueCategories, baseOptions } =
    contentProduct ?? {};
  const [_, setSizeSelected] = useSizeSelected;

  const variantColors = useMemo(() => {
    if (!variantSelectors?.length) return [];

    return variantSelectors?.filter(elemt => {
      return elemt?.variantCategoryCode?.code === 'color';
    });
  }, [variantSelectors]);

  const variantSizes = useMemo(() => {
    if (variantColors?.length) {
      const [colors] = variantColors;
      const [sizes] = colors.values?.filter(color => color?.elements?.length);
      return sizes?.elements ?? [];
    }

    if (variantSelectors?.length) {
      const valuesSizes =
        variantSelectors?.find(
          variant => variant?.variantCategoryCode?.code === 'talla'
        ) ?? [];
      return valuesSizes.values;
    }

    return [];
  }, [variantColors, variantSelectors]);

  const variantMonto = useMemo(() => {
    if (!variantSelectors?.length) return [];
    const [prices] = variantSelectors?.filter(variant => {
      return variant?.variantCategoryCode?.code === 'monto';
    });
    return prices?.values ?? [];
  }, [variantSelectors]);

  useEffect(() => {
    if (!variantSizes?.length && !variantMonto?.length && !loadingProduct)
      setSizeSelected(true);

    if (variantColors.length) handleIsColors();
    if (variantSizes?.length) handleIsSizes();
  }, [variantColors, variantSizes, loadingProduct]);

  const handleIsColors = () => {
    props?.setIsColor?.(true);
  };

  const handleIsSizes = () => {
    props?.setIsSize?.(true);
  };

  return (
    <View style={styles.container}>
      {!!variantColors?.length && (
        <VariantColors
          variantColors={variantColors}
          code={code}
          handleSetProductCode={handleSetProductCode}
          loadingProduct={loadingProduct}
          baseOptions={baseOptions}
          contentProduct={contentProduct}
          useSizeSelected={useSizeSelected}
        />
      )}
      {!!variantSizes?.length && (
        <VariantSizes
          styleButtonDropdown={styleButtonDropdown}
          variantValueCategories={variantValueCategories}
          variantSizes={variantSizes}
          handleSetProductCode={handleSetProductCode}
          useSizeSelected={useSizeSelected}
          baseOptions={baseOptions}
        />
      )}
      {!!variantMonto?.length && (
        <VariantMonto
          variant={variantMonto}
          variantValueCategories={variantValueCategories}
          handleSetProductCode={handleSetProductCode}
          useSizeSelected={useSizeSelected}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: MARING_HORIZONTAL,
    marginHorizontal: MARING_HORIZONTAL,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
