import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
//components
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../backButton';
//hooks
import useComponentContent from '../../../application/common/hooksCommons/useComponentContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useComponentsMutation } from '../../../infrastucture/apis/contentPage';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
//utils
import { IMenu } from './interfaces';
import {
  mapCategoryViewEmarsys,
  trackCategoryViewEmarsys
} from '../../../infrastucture/native-modules/emarsys/emarsys';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  HEIGHT_TAB_BAR
} from '../../../application/common';
import { Popup } from '../poppup';
import { t } from 'i18next';

const COMPONENT_KEY = 'DepratiCategoryNavComponent';

const MenuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goLink, goToPlp } = useLinkPress();
  const { listMenuProp } = route.params;
  const { loading, componentContent } = useComponentContent(COMPONENT_KEY);

  const [
    _getComponents,
    {
      isLoading: isLoadingComponent,
      isError: isErrorComponent,
      data: dataComponent,
      error: errorComponent
    }
  ] = useComponentsMutation();

  const [listMenu, setListMenu] = useState<IMenu[]>([]);
  const [category, setCategory] = useState<IMenu[]>([]);
  const [modalError, setModalError] = useState({
    show: false,
    text: ''
  });

  useEffect(() => {
    if (isErrorComponent && errorComponent) {
      setModalError({ show: true, text: errorComponent?.error ?? '' });
    }
  }, [isErrorComponent, errorComponent]);

  useEffect(() => {
    if (!loading && componentContent?.uid && !listMenuProp) {
      try {
        const { children } = componentContent?.navigationNode ?? {};
        setListMenu(children);
        let newCategory = [];
        newCategory.unshift(componentContent?.navigationNode ?? []);
        setCategory(newCategory);
      } catch (error) {}
    }
  }, [loading]);

  const HandleEmarsys = useCallback(() => {
    const categorys = category?.filter(item => item?.title).reverse();
    const categoryPath = mapCategoryViewEmarsys(categorys, 'title');
    if (categoryPath?.length > 0) trackCategoryViewEmarsys(categoryPath);
  }, [category]);

  const handleCategoryClick = (categoryNav: IMenu) => {
    if (categoryNav?.children?.length > 0) {
      setListMenu(categoryNav?.children ?? []);
      category.unshift(categoryNav);
      setCategory(category);
      HandleEmarsys();
    } else {
      const { entries } = categoryNav;
      const [linkElemnt] = entries;
      _getComponents({
        componentIds: linkElemnt?.itemId
      });
    }
  };

  const goBack = () => {
    if (category?.length > 0 && listMenu?.length > 0) {
      let newCategory = category.slice();
      newCategory.shift();
      setListMenu(newCategory[0].children);
      setCategory(newCategory);
    }
  };

  const handleOnCategory = () => {
    if (category[0]?.title) {
      const { entries } = category[0];
      const [linkElemnt] = entries;
      _getComponents({
        componentIds: linkElemnt?.itemId
      });
    }
  };

  const handleCloseModalError = () => {
    setModalError({ ...modalError, show: false });
  };

  useEffect(() => {
    if (!isLoadingComponent && dataComponent?.component) {
      handleCloseModalError();
      const [componentLink] = dataComponent?.component ?? [];
      //const title = componentLink?.name ?? ''
      if (componentLink?.categoryCode) {
        goToPlp({ category: componentLink?.categoryCode });
      } else if (componentLink?.url) {
        goLink(componentLink?.url);
      }
    }
  }, [isLoadingComponent, dataComponent]);

  function handleGoBack() {
    if (category?.length > 1) goBack();
    else navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      //@ts-ignore
      headerLeft: () => <BackButton onPress={handleGoBack} />,
      headerTitle: category[0]?.title ?? `${t('categories')}`,
      isTitleButton: category?.length > 1,
      onHeaderTitle: () => handleOnCategory()
    });
  }, [category[0]?.title]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={COLORS.DARK70} />}
      {componentContent && (
        <ScrollView
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.categories}>
            {listMenu?.map((value, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleCategoryClick(value)}>
                    <View style={{ width: '100%' }}>
                      <Text style={styles.item__title}>{value?.title}</Text>
                    </View>
                    <Icon
                      name="keyboard-arrow-right"
                      size={20}
                      color={COLORS.DARK70}
                    />
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
      <Popup
        visible={modalError.show}
        title={`${t('error.hasOccurred')}`}
        textContent={modalError.text}
        icon="error"
        hideButton={true}
        iconColor={COLORS.REDICON}
        closeAction={handleCloseModalError}
        showCloseButton={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 9,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR + 50,
      ios: 0
    }),
    paddingHorizontal: 15
  },
  categories: {
    flex: 1
  },
  item: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  item__title: {
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  divider: {
    height: 1
  }
});

export default MenuScreen;
