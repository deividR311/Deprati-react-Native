import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput as RNTextInput } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../../../application/common';
import Pagination from '../../MyOrders/components/Pagination';

export const MyClaimsListFooter: FC<MyClaimsListFooterProps> = ({
  isLoading,
  totalPages,
  onSelectPage,
  onSearchOrder,
  showSearchSection = false
}) => {
  const inputRef = useRef<RNTextInput>(null);
  const [textToFind, setTextToFind] = useState<string>('');
  const [forceRender, setForceRender] = useState<boolean>(false);

  const _onSearch = (text: string) => {
    if (text === '') return;
    onSearchOrder(text);
  };

  useEffect(() => {
    if (isLoading === false) inputRef.current?.clear();
  }, [isLoading]);

  useEffect(() => {
    inputRef?.current?.setNativeProps({
      text: textToFind
    });
  }, [textToFind, forceRender]);

  return (
    <>
      {totalPages > 1 && (
        <Pagination
          maxPag={totalPages}
          onPress={onSelectPage}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
      {showSearchSection && (
        <>
          <View style={styles.separator} />
          <View style={styles.header}>
            <Text style={[FontStyles.Body_1, styles.littleSpace]}>
              Si no encuentras tu compra en el listado, ingresa el número de
              pedido aquí.
            </Text>
            <TextInput
              dense
              mode="outlined"
              returnKeyType="search"
              returnKeyLabel="Buscar"
              clearButtonMode="always"
              placeholder="Buscar pedido"
              keyboardType="default"
              ref={inputRef}
              value={textToFind}
              maxLength={50}
              multiline={false}
              disabled={isLoading}
              clearTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              style={[styles.doubleSpace, styles.searchInput]}
              placeholderTextColor={COLORS.DARKDISABLED}
              activeOutlineColor={COLORS.GRAYBRAND}
              selectionColor={COLORS.DARKDISABLED}
              onChangeText={text => {
                const _text = text.replace(/[^0-9]/g, '');
                setTextToFind(_text);
                setForceRender(!forceRender);
              }}
              onEndEditing={({ nativeEvent }) => {
                const _text = nativeEvent.text.replace(/[^0-9]/g, '');
                _onSearch(_text);
              }}
              right={
                isLoading && (
                  <TextInput.Icon
                    name={() => (
                      <ActivityIndicator color={COLORS.REDICON} size="small" />
                    )}
                  />
                )
              }
            />
            <Text style={[FontStyles.Body_1, styles.littleSpace]}>
              El número del pedido lo encontraras en la factura de compra o en
              el correo de confirmación.
            </Text>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  littleSpace: {
    marginBottom: 10
  },
  doubleSpace: {
    marginBottom: 20
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.LIGHTGRAY,
    marginHorizontal: 8
  },
  searchInput: {
    backgroundColor: COLORS.GRAYBRAND,
    border: 'none'
  }
});

interface MyClaimsListFooterProps {
  isLoading?: boolean;
  totalPages: number;
  showSearchSection?: boolean;
  onSelectPage: (page: number) => void;
  onSearchOrder: (orderNumber: string) => void;
}
