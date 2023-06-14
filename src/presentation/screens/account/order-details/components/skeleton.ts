import { ICustomViewStyle } from 'react-native-skeleton-content-nonexpo/lib/Constants';

export const SkeletonContentLayout: ICustomViewStyle[] = [
  {
    key: 'order-status-card',
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    elevation: 5
  },
  {
    key: 'order-number',
    width: 150,
    height: 20,
    margin: 16
  },
  { width: '100%', height: 50, marginBottom: 16 }
];
export const SkeletonContentLayoutBuyTitleItem: ICustomViewStyle[] = [
  {
    key: 'buy-detail',
    width: 150,
    height: 20,
    marginLeft: 16
  }
];
export const SkeletonContentLayoutBuyItem: ICustomViewStyle[] = [
  {
    key: 'buy-title',
    width: 90,
    height: 10,
    margin: 4,
    marginLeft: 16
  },
  {
    key: 'buy-detail',
    width: 90,
    height: 10,
    marginRight: 16,
    marginBottom: 4
  }
];
