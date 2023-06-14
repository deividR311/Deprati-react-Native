import React, { useEffect, useState, useCallback, useMemo } from 'react';
//Libs
import { StyleSheet, Platform, Text, View } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { BottomSheet } from '../../../../common-components/bottomSheet';
import {
  ButtonText,
  MainButton
} from '../../../../common-components/buttons/Button';
import { VariantSelectorComponent } from '../../../dashboard/PDP/components';
import GuideSize from './components/guideSize/GuideSize';
import Header from './components/header-footer/HeaderModalFavorite';
import { styles, stylesDropdown } from './stylesSelectColorSize';
import { productResponse } from '../../../../../infrastucture/apis/product';
import sleep from '../../../../../application/utils/sleep';
import { ActivityIndicator } from 'react-native-paper';

//Styles

interface handleModalProps {
  handleSelectColor(value: number): boolean;
  activeButton(): boolean;
  setCurrentColor(value: number): void;
  setCurrentSize(value: number): void;
}
const textMainButton = 'CONFIRMAR';

const textShowGuide = 'Guía de tallas';
const textHideGuide = 'Ocultar Guía';

export default function SelectColorSize({
  visible,
  onClose,
  onConfirm,
  codeSelect,
  contentProduct,
  handleSetProductCode,
  loading
}: {
  visible: boolean;
  codeSelect: string;
  onClose(): void;
  onConfirm(productSelect: string): void;
  handleModal: handleModalProps;
  contentProduct: productResponse;
  handleSetProductCode: (code: string) => void;
  loading: boolean;
}) {
  const [productCode, setProductCode] = useState<string>(codeSelect);
  const [showGuide, setshowGuide] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(false);
  const useSizeSelected = useState<boolean>(false);
  const [sizeSelected, setSizeSelected] = useSizeSelected;

  const handeOnClose = () => {
    setshowGuide(false);
    onClose();
  };

  useEffect(() => {
    if (visible) handleSetColor(codeSelect);
    setSizeSelected(false);
  }, [visible]);

  const handleSetColor = useCallback(
    (code: string) => {
      if (code) {
        handleSetProductCode(code);
        setProductCode(code);
      }
    },
    [productCode]
  );

  const loadingColorSize = useMemo(() => {
    return loading || !contentProduct;
  }, [loading, contentProduct]);

  const variantColors = useMemo(() => {
    if (!contentProduct?.variantSelectors?.length) return [];
    const values = contentProduct?.variantSelectors?.filter(elemt => {
      return elemt?.variantCategoryCode?.code.toLowerCase() === 'color';
    });
    return values;
  }, [contentProduct?.variantSelectors]);

  async function handleConfirm(_productCode: string) {
    setDisabledConfirm(true);
    onConfirm(productCode);
    await sleep(1000);
    setDisabledConfirm(false);
  }

  return (
    <BottomSheet
      percentage={60}
      show={visible}
      maniaStyle={styles.lineMania}
      onCloseRequest={() => handeOnClose()}
      paddingHorizontal={16}
      scrollViewContainerStyle={
        loadingColorSize ? contentStyles.scrollViewContainer : {}
      }
      footerPermanent={
        <MainButton
          title={
            contentProduct?.stock?.stockLevel === 0 && sizeSelected
              ? 'SIN STOCK'
              : textMainButton
          }
          style={{
            alignSelf: 'center',
            marginBottom: Platform.OS === 'ios' ? 32 : 20,
            width: '90%'
          }}
          disabled={
            contentProduct?.stock?.stockLevel === 0 ||
            disabledConfirm ||
            !sizeSelected ||
            loadingColorSize
          }
          // onPress={() => onConfirm(productCode)}
          onPress={() => handleConfirm(productCode)}
        />
      }
      header={<Header onClose={() => handeOnClose()} />}>
      {!loadingColorSize ? (
        <View>
          {contentProduct?.stock?.stockLevel === 0 && sizeSelected && (
            <Text style={styles.container_withoutStock}>
              El producto que buscas no cuenta con stock disponible
            </Text>
          )}
          {visible && (
            <VariantSelectorComponent
              contentProduct={contentProduct}
              handleSetProductCode={handleSetColor}
              styleButtonDropdown={stylesDropdown.btn}
              useSizeSelected={useSizeSelected}
              loadingProduct={loading}
            />
          )}
          {showGuide && <GuideSize />}
          {!!variantColors?.length && (
            <ButtonText
              title={!showGuide ? textShowGuide : textHideGuide}
              styleText={{ color: COLORS.BRAND }}
              style={{ marginBottom: 15, marginTop: 20 }}
              onPress={() => setshowGuide(!showGuide)}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator size={'large'} color={COLORS.REDICON} />
      )}
    </BottomSheet>
  );
}

const contentStyles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '25%'
  }
});
