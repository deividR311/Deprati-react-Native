import { useNavigation } from '@react-navigation/native';
import queryString from 'query-string';
import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { EcommerceNavigationRoute } from '../../../presentation/navigation/ecommerce';
import { NAV } from '../namesNav';

interface GoToPlpParams {
  [key: string]: any;
}

interface GoToPlpOptions {
  category?: string;
  query?: string;
}

export const useLinkPress = () => {
  const navigation = useNavigation();

  const goLink = (dir: string, params?: any) => {
    if (dir && dir?.length === 0) return;
    // ir a Plp
    if (dir?.includes('/c/')) {
      dir = dir.replaceAll("'", '');
      const urlParsed = queryString.parseUrl(dir);
      const { url } = urlParsed;

      const category = url?.match(/\w+(\/|)$/g)?.[0];
      goToPlp({ category });

      return;
    }

    if (dir?.includes('/p/')) {
      dir = queryString.parseUrl(dir).url.replace(/'/g, '');
      let productCode = dir
        ?.replace(/'/g, '')
        ?.match(/\w+(\/|)$/g)?.[0]
        ?.replace(/\//g, '');

      if (productCode) {
        goToPdp(productCode);
        return;
      }
    }

    if (dir?.includes('/search?q')) {
      dir = dir.replaceAll("'", '');
      let urlParsed = queryString.parseUrl(dir);
      if (Object.keys(urlParsed?.query).length > 0) {
        const [nameKey] = Object.keys(urlParsed?.query);
        const { [nameKey]: query } = urlParsed?.query;
        goToPlp({ query }, params);
      }
      return;
    }

    if (dir?.includes('corner/')) {
      dir = dir.replaceAll("'", '');
      const urlParsed = dir.split('corner');
      const labelOrIdCorner = urlParsed?.length > 1 ? urlParsed[1] : '';
      navigation.push(NAV.DASHBOARD_NAVIGATION, {
        screen: NAV.DASHBOARD_INICIO,
        params: {
          screen: NAV.CORNER,
          params: { labelOrIdCorner }
        }
      });
      return;
    }

    if (dir?.startsWith('http')) {
      goToUrl(dir);
      return;
    }
  };

  const goToPlp = (
    { category, query }: GoToPlpOptions,
    params: GoToPlpParams = {}
  ) => {
    try {
      if (category) {
        navigation.push(NAV.DASHBOARD_NAVIGATION, {
          screen: NAV.DASHBOARD_INICIO,
          params: {
            screen: NAV.CATEGORYPAGE,
            params: { category, categoryID: category, title: '', ...params }
          }
        });
        return;
      }
      if (query) {
        navigation.navigate(NAV.DASHBOARD_NAVIGATION, {
          screen: NAV.DASHBOARD_INICIO,
          params: {
            screen: NAV.PLP,
            params: { queryID: query, title: '', ...params }
          }
        });
      }
    } catch (error) {}
  };

  const goToPdp = (productCode: string, pushNavigation?: boolean) => {
    if (!pushNavigation) {
      navigation.navigate(NAV.ECOMMERCE, {
        screen: EcommerceNavigationRoute.ProductPage,
        params: { productCode }
      });
      return;
    }
    navigation.push(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.ProductPage,
      params: { productCode }
    });
  };

  const goToCategory = (category: string, isStory?: boolean) => {
    if (isStory) {
      navigation.push(NAV.DASHBOARD_NAVIGATION, {
        screen: NAV.DASHBOARD_INICIO,
        params: {
          screen: NAV.CATEGORYPAGE,
          params: { category, categoryID: category }
        }
      });
      return;
    }
    navigation.navigate(NAV.CATEGORYPAGE, { category });
  };

  const goToUrl = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url);
      } else Linking.openURL(url);
    } catch (e) {}
  };

  return { goLink, goToPlp, goToPdp, goToCategory };
};
