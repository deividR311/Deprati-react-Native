import { useEffect, useState } from 'react';
import Emarsys from 'react-native-emarsys-wrapper';
import { useRoute } from '@react-navigation/native';
import { trackCategoryViewEmarsys } from '../../../infrastucture/native-modules/emarsys/emarsys';

interface ParamsQuery {
  logic: string;
  limit: number;
}

export const useRecommendProducts = (customProps): InfoHook => {
  const [productsEmarsys, setProductsEmarsys] = useState([]);
  const route = useRoute();
  const { params } = route;

  const LOGIC_NAME = {
    HOMEPAGE: 'HOME',
    CATEGORY: 'CATEGORY',
    RELATED: 'RELATED',
    SIMILAR: 'ALSO_BOUGHT', //ALSO_BOUGHT
    CART: 'CART'
  };

  const recommendCornerPage = async () => {
    try {
      let { limit, logic: logiProps } = customProps;
      const logic = LOGIC_NAME[logiProps] ?? logiProps;
      limit = limit ? Number(limit) : 10;
      const result = await Emarsys.predict.recommendProductsQueryLimit(
        logic,
        params?.queryEmarsys ?? 'HOME',
        limit
      );
      setProductsEmarsys(result);
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  const recommendProducts = async () => {
    try {
      let { limit, logic: logiProps } = customProps;
      const logic = LOGIC_NAME[logiProps] ?? logiProps;
      limit = limit ? Number(limit) : 10;
      const result = await Emarsys.predict.recommendProductsLimit(logic, limit);
      setProductsEmarsys(result);
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  const recommendProductsCategory = async () => {
    try {
      const { params } = route;
      const {
        categoryData: { text: categoryName }
      } = params ?? {};
      if (categoryName) {
        let { limit, logic: logiProps } = customProps;
        const logic = LOGIC_NAME[logiProps] ?? logiProps;
        limit = limit ? Number(limit) : 10;
        const query = `HOME>${categoryName}`;
        const result = await Emarsys.predict.recommendProductsQueryLimit(
          logic,
          query,
          limit
        );
        setProductsEmarsys(result);
      }
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  const recommendProductsHome = async () => {
    try {
      let { limit, logic: logiProps } = customProps ?? {};
      const logic = LOGIC_NAME[logiProps] ?? LOGIC_NAME.HOMEPAGE;
      limit = limit ? Number(limit) : 10;
      const result = await Emarsys.predict.recommendProductsLimit(logic, limit);
      setProductsEmarsys(result);
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  const recommendProductPage = async () => {
    try {
      let limit = 10;
      let result = [];
      let logic = 'RELATED';
      let codeProduct = route?.params?.productCode ?? '';
      if (customProps?.logic) {
        logic = LOGIC_NAME[customProps.logic] ?? customProps.logic;
        limit = limit ? Number(limit) : 10;
        result = await Emarsys.predict.recommendProductsQueryLimit(
          logic,
          codeProduct,
          limit
        );
      } else {
        let { maximumNumberProducts, productReferenceTypes } = customProps;
        logic = LOGIC_NAME[productReferenceTypes] ?? logic;
        limit = maximumNumberProducts ? Number(maximumNumberProducts) : 10;
        result = await Emarsys.predict.recommendProductsQueryLimit(
          logic,
          codeProduct,
          limit
        );
      }
      console.log('00recommendProductPage', result, {
        logic,
        codeProduct,
        limit
      });
      setProductsEmarsys(result);
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  const recommendCartPage = async () => {
    try {
      let { limit, logic: logiProps, cartItems } = customProps ?? {};
      const logic = LOGIC_NAME[logiProps] ?? LOGIC_NAME.HOMEPAGE;
      limit = limit ? Number(limit) : 10;

      const result = await Emarsys.predict.recommendProductsCartItemsLimit(
        logic,
        cartItems,
        limit
      );
      setProductsEmarsys(result);
    } catch (e) {
      console.log('error', e.message, e);
    }
  };

  useEffect(() => {
    const { name } = route;
    switch (name) {
      case 'Home':
        recommendProductsHome();
        break;
      case 'CategoryPage':
        recommendProductsCategory();
        break;
      case 'PRODUCTPAGE':
        recommendProductPage();
        break;
      case 'CART':
        recommendCartPage();
        break;
      case 'Corner':
        recommendCornerPage();
        break;
      default:
        recommendProducts();
        break;
    }
  }, []);

  return {
    productsEmarsys
  };
};

export interface InfoHook<T> {
  productsEmarsys?: T;
}
