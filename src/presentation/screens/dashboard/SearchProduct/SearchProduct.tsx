import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  NAV
} from '../../../../application/common';
import layout, {
  MARING_HORIZONTAL
} from '../../../../application/common/layout';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDebounce from '../../../../application/common/hooksCommons/useDebounce';
import { removeTags } from '../../../../application/utils/string-formater';
import { useArticleMutationRequest } from '../../../../infrastucture/apis/article';
import { EcommerceNavigationRoute } from '../../../navigation/ecommerce';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import { useSearchMutationRequest } from '../../../../infrastucture/apis/product';
import NoFoundPage from '../../NoFoundPage/NoFoundPage';

const SearchProduct = () => {
  const navigation = useNavigation();

  const [searchloading, setSearchloading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [typeSearch, setTypeSearch] = useState(0);
  const [listProducts, setListProducts] = useState([]);
  const [avoidSearch, setAvoidSearch] = useState(false);
  const [emptySearchArticle, setEmptySearchArticle] = useState(false);
  const [
    _getSearchEan,
    {
      isLoading: loadingSearchEan,
      data: rawResponseSearchEan,
      isError: isErrorSearchEan,
      reset: resetResquestSearchEan
    }
  ] = useArticleMutationRequest();
  const [
    _getSearchProduct,
    {
      isLoading: loadingSearchProduct,
      isUninitialized: uninitializedSearchProduct,
      data: dataSearchProduct,
      reset: resetRequestSearchProduct
    }
  ] = useSearchMutationRequest();

  const route = useRoute();
  const { EAN } = (route?.params as { EAN?: string }) ?? { EAN: '' };
  const { goToPdp } = useLinkPress();

  const onPressEan = () => {
    navigation.navigate(EcommerceNavigationRoute.Barcode as never);
  };

  const getSearch = async (searhText: string) => {
    const request: Promise<any>[] = [];
    const textLen = searhText?.length;
    if (!textLen) return;

    resetRequestSearchProduct();
    resetResquestSearchEan();
    setSearchloading(true);
    setListProducts([]);

    request.push(
      _getSearchProduct({
        query: searhText,
        pageSize: 5,
        fields: 'SEARCH'
      })
    );

    if (textLen >= 8 && !isNaN(Number(searhText))) {
      setEmptySearchArticle(false);
      request.push(
        _getSearchEan({
          codigoTienda: 20,
          eanArticulo: searhText
        })
      );
    }

    await Promise.all(request);
  };

  const noFound = useMemo(() => {
    if (searchValue?.length >= 8 && !isNaN(Number(searchValue))) {
      if (
        listProducts?.length === 0 &&
        (emptySearchArticle || isErrorSearchEan)
      ) {
        //9console.log('00', emptySearchArticle)
        return true;
      }
    } else if (avoidSearch && !searchloading && listProducts?.length === 0) {
      return true;
    }

    return false;
  }, [
    searchValue,
    searchloading,
    listProducts,
    avoidSearch,
    emptySearchArticle
  ]);

  const goToProduct = (item: any) => {
    goToPdp(item?.code);
  };

  const goToSlp = (searhText: string) => {
    if (searhText) {
      navigation.replace(NAV.DASHBOARD_NAVIGATION, {
        screen: NAV.DASHBOARD_INICIO,
        params: {
          screen: NAV.SLP,
          params: { searchID: searhText, title: 'Resultados búsqueda' }
        }
      });
    }
  };

  useEffect(() => {
    if (EAN) {
      try {
        setTypeSearch(1);
        setSearchValue(`${Number(EAN)}`);
      } catch (error) {}
    }
  }, [EAN]);

  const redirectSuccess = () => {
    const products = dataSearchProduct?.products ?? [];
    if (!isNaN(Number(searchValue))) {
      if (products?.length === 0) {
        const { data, success } = rawResponseSearchEan ?? {};

        if (success) {
          const article = data?.dato;
          if (article && article?.listaArticulo?.length > 0) {
            resetResquestSearchEan();
            navigation.navigate(
              EcommerceNavigationRoute.ProductPageSAP as never,
              {
                product: article,
                ean: searchValue
              } as never
            );
          } else {
            setEmptySearchArticle(true);
          }
        }
      }

      if (typeSearch === 1 && products?.length > 0) {
        const [item] = products;
        console.log(item);
        goToProduct(item);
      }

      setListProducts(products);
      setSearchloading(loadingSearchProduct || loadingSearchEan);

      if (!loadingSearchProduct && !loadingSearchEan) {
        setAvoidSearch(!uninitializedSearchProduct);
      }
    } else {
      setListProducts(products);
      setSearchloading(loadingSearchProduct);
      setAvoidSearch(!uninitializedSearchProduct);
    }
  };

  useEffect(() => {
    redirectSuccess();
  }, [
    loadingSearchEan,
    loadingSearchProduct,
    dataSearchProduct?.products,
    uninitializedSearchProduct,
    rawResponseSearchEan?.success
  ]);

  const debouncedSearchTerm = useDebounce(searchValue, 1500);
  useEffect(
    () => {
      setListProducts([]);
      onGetSearchTerm();
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (searchValue?.length > 0) return;
    setEmptySearchArticle(false);
    setAvoidSearch(false);
    setListProducts([]);
    if (!EAN) setSearchValue('');
    resetRequestSearchProduct();
    resetResquestSearchEan();
  }, [searchValue]);

  function onGetSearchTerm() {
    if (debouncedSearchTerm?.length < 3 || debouncedSearchTerm !== searchValue)
      return;
    getSearch(debouncedSearchTerm);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.search]}>
        <Pressable onPress={onPressEan} style={styles.barcode__icon}>
          <IconMC name="barcode-scan" size={24} color={COLORS.DARK70} />
        </Pressable>
        <TextInput
          placeholderTextColor={COLORS.GRAYDARK60}
          style={[styles.search__input, styles.search__input__text]}
          autoFocus={true}
          returnKeyType={'search'}
          onChangeText={text => {
            setSearchValue(text);
          }}
          onSubmitEditing={event => {
            if (listProducts?.length > 0) {
              goToSlp(event.nativeEvent.text);
            } else {
              if (rawResponseSearchEan) {
                redirectSuccess();
              } else {
                onGetSearchTerm();
              }
            }
          }}
          value={searchValue}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[styles.search__close]}>Cerrar</Text>
        </Pressable>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={listProducts}
        ListEmptyComponent={() => {
          if (noFound) return <NoFoundPage headerShow={false} />;

          return null;
        }}
        ListHeaderComponent={() => {
          if (searchloading)
            return <ActivityIndicator size="large" color={COLORS.DARK70} />;
          return null;
        }}
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <Pressable key={`item${index}`} onPress={() => goToProduct(item)}>
              <Text style={[styles.search__item]} numberOfLines={1}>
                {removeTags(item.name)}
              </Text>
            </Pressable>
          );
        }}
        style={styles.containerList}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable
          onPress={() => navigation.replace(EcommerceNavigationRoute.Barcode)}>
          <View style={styles.footerScan}>
            <IconMC
              name="barcode-scan"
              size={24}
              color={COLORS.BRAND}
              style={styles.footerScan_icon}
            />
            <Text style={styles.footerScan_text}>Escanear código</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%',
    justifyContent: 'space-between'
  },
  search__icon: {
    position: 'absolute',
    left: 24,
    bottom: 15,
    zIndex: 2
  },
  barcode__icon: {
    position: 'absolute',
    left: '79%',
    bottom: 13,
    zIndex: 2
  },
  search: {
    display: 'flex',
    position: 'relative',
    backgroundColor: COLORS.WHITE,
    paddingVertical: MARING_HORIZONTAL,
    paddingHorizontal: MARING_HORIZONTAL,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: layout.isIos ? (layout.isSmallDevice ? -18 : -50) : undefined
  },
  search__input: {
    marginRight: MARING_HORIZONTAL,
    flexGrow: 3,
    paddingLeft: 16,
    paddingRight: 10,
    borderRadius: 3,
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 40,
    maxWidth: '85%'
  },
  search__input__text: {
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontWeight: '400',
    fontSize: FONTS_SIZES.paragraph,
    lineHeight: FONTS_SIZES.paragraph + 2,
    letterSpacing: 0.8,
    color: COLORS.DARK70,
    opacity: 0.7
  },
  search__close: {
    fontSize: FONTS_SIZES.paragraph,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    lineHeight: FONTS_SIZES.paragraph + 2,
    color: COLORS.DARK70
  },
  contentContainerStyle: {
    backgroundColor: COLORS.WHITE,
    paddingTop: MARING_HORIZONTAL,
    flexGrow: 1
  },
  containerList: {
    width: '100%',
    backgroundColor: COLORS.WHITE
  },
  search__item: {
    paddingHorizontal: MARING_HORIZONTAL,
    paddingVertical: 12,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    fontSize: FONTS_SIZES.paragraph,
    lineHeight: FONTS_SIZES.paragraph + 2,
    letterSpacing: 0.8,
    color: COLORS.DARK70
  },
  footerScan: {
    backgroundColor: '#FAF9F9',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    borderRadius: 3,
    overflow: 'hidden'
  },
  footerScan_icon: {
    paddingRight: 16
  },
  footerScan_text: {
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontWeight: '400',
    fontSize: FONTS_SIZES.paragraph,
    lineHeight: FONTS_SIZES.paragraph + 2
  }
});

export default SearchProduct;
