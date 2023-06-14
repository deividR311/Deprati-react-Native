import Emarsys from 'react-native-emarsys-wrapper';

export const recommendProductPageRelated = async (itemId: string) => {
  try {
    await Emarsys.predict.trackItemView(itemId);
    let limit = 10;
    let logic = 'RELATED';
    let result = await Emarsys.predict.recommendProductsLimit(logic, limit);
    return result ?? [];
  } catch (e) {
    console.log('error->recommendProductPage');
  }
};

export const recommendProductPageSimilar = async (itemId: string) => {
  try {
    await Emarsys.predict.trackItemView(itemId);
    let limit = 10;
    let logic = 'ALSO_BOUGHT';
    let result = await Emarsys.predict.recommendProductsLimit(logic, limit);
    return result ?? [];
  } catch (e) {
    console.log('error->recommendProductPage');
  }
};
