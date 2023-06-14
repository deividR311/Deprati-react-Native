import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_SIZES,
  FONTS_FAMILY
} from '../../../../../application/common';
import {
  AppliedProductPromotions,
  Entry
} from '../../../../../infrastucture/apis/shopping-cart';
import ProductCategoryProperties from '../../../cart/Cart/Components/sizeColor/ComponentSizeColor';
import ComponentImageProduct from '../../../dashboard/PLP/components/imageProduct/ComponentImageProduct';
import { fontWeightOS } from '../../../../../application/utils';

interface Props {
  itemsCart: Entry[];
  appliedProductPromotions?: AppliedProductPromotions[];
}

export default function ListItemsCarts(props: Props) {
  const Promos = ({ entryNumber }: { entryNumber: number }) => {
    const applyPromotions = props?.appliedProductPromotions
      ?.filter(prom => {
        return (
          prom?.consumedEntries?.findIndex(
            entry => entry.orderEntryNumber === entryNumber
          ) >= 0
        );
      })
      .map(prom => prom.description);
    return (
      <>
        {applyPromotions?.map((description, index) => (
          <Text
            style={[
              styles.item_body_promo,
              index > 0 && { backgroundColor: COLORS.GRAYBRAND }
            ]}>
            {description}
          </Text>
        ))}
      </>
    );
  };
  const MemoizedPromos = React.memo(Promos);

  return (
    <View>
      {props?.itemsCart?.map(item => {
        return (
          <View key={item.entryNumber} style={styles.item}>
            <View style={styles.item_content}>
              <View style={{ width: '20%' }}>
                <ComponentImageProduct
                  style={styles.item_img}
                  styleImage={styles.item_img}
                  styleContentImage={styles.item_img}
                  styleViewLabel={{
                    width: '70%',
                    height: '13%',
                    alignSelf: 'flex-end'
                  }}
                  styleLabel={{}}
                  dataImages={{
                    images: item?.product?.images,
                    labelNew: item?.product?.tagUrl
                  }}
                  disabled={true}
                />
              </View>
              <View style={styles.item_body}>
                <Text style={styles.item_body_name} numberOfLines={1}>
                  {item?.product?.name}
                </Text>
                <ProductCategoryProperties
                  style={{}}
                  styleText={styles.item_body_description}
                  category={item?.product?.categories}
                />
                <Text style={styles.item_body_description} numberOfLines={1}>
                  Cantidad: {item?.quantity}
                </Text>
                <MemoizedPromos
                  key={item.entryNumber}
                  entryNumber={item.entryNumber}
                />
                <Text style={styles.item_body_tag}>
                  {item?.deliveryMode?.code === 'thirdParty' &&
                    'Retiro en agencias autorizadas'}
                  {item?.deliveryMode?.code === 'pickup' && 'Retiro en tienda'}
                  {!['thirdParty', 'pickup'].includes(
                    item?.deliveryMode?.code
                  ) &&
                    item?.deliveryTimeRange &&
                    `Envío a domicilio ${item?.deliveryTimeRange}`}
                </Text>
              </View>
            </View>
            <View style={styles.item_footer}>
              <View style={styles.item_price}>
                <Text style={styles.item_price_label}>Precio unitario</Text>
                <Text style={styles.item_price_value}>
                  {item?.basePriceWithoutTaxes?.formattedValue}
                </Text>
              </View>
              <View style={styles.item_price}>
                <Text style={styles.item_price_label}>Subtotal</Text>
                <Text style={styles.item_price_value}>
                  {item?.subtotal?.formattedValue}
                </Text>
              </View>
              <View style={styles.item_price}>
                <Text style={styles.item_price_label}>Descuento</Text>
                <Text style={styles.item_price_value}>
                  {item?.totalDiscount?.formattedValue}
                </Text>
              </View>
              <View style={styles.item_price}>
                <Text style={styles.item_price_label}>Total sin IVA</Text>
                <Text style={styles.item_price_value}>
                  {item?.totalPriceWithoutTaxes?.formattedValue}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  item: {
    borderTopColor: '#26323860',
    // width: '75%',
    // marginHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 16
  },
  item_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  item_img: {
    height: 112,
    // width: 72,
    maxWidth: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  item_body: {
    flexDirection: 'column',
    width: '75%'
    // marginLeft: 10,
    // marginRight: 15,
  },
  item_body_name: {
    ...FontStyles.Subtitle,
    textAlign: 'left'
  },
  item_body_description: {
    ...FontStyles.Body_2,
    fontSize: FONTS_SIZES.small,
    lineHeight: 15
  },
  item_body_tag: {
    ...FontStyles.Body_2,
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND
  },
  item_body_promo: {
    ...FontStyles.Body_2,
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND,
    backgroundColor: COLORS.BACKGROUNDACCENTBRANDRED,
    paddingLeft: 2,
    marginTop: 2
  },
  item_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  item_price: {
    marginTop: 8,
    // width: '33%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item_price_label: {
    ...FontStyles.Regular,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    textAlign: 'center'
  },
  item_price_value: {
    ...FontStyles.Regular,
    fontWeight: '400',
    textAlign: 'center'
  }
});
