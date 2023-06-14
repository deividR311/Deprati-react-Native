import React, { useCallback, useEffect, useState } from 'react';
import { COLORS } from '../../../../application/common/colors';
import CartEmpty from './CartEmpty';
import ComponentCoupon from './Components/coupon/ComponentCoupon';
import TemplatePage from '../../../common-components/template-page';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import CardInformation from '../../../common-components/cardInformation/CardInformation';
import ItemCartProduct from './Components/ItemCartProduct';
import DetailButtons from './Components/detailCartButtons/DetailButtons';
import { FooterCart } from './Components/footerCart/';
import RecommendedCart from './Components/RecommendedCart';
import {
  useFocusEffect,
  useIsFocused,
  useRoute
} from '@react-navigation/native';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../application/state-manager';
import {
  setCartInfo,
  setPreviousScreen,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../application/state-manager/services/checkout';
import { useShowExpressBuyRequestRequest } from '../../../../infrastucture/apis/checkout/expressBuy';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLazyGetShoppingCartRequest } from '../../../../infrastucture/apis/shopping-cart';
import { useAddressRemoveCartRequest } from '../../../../infrastucture/apis/delivery-address';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';

export default function CartScreen(): JSX.Element {
  const { goLink: openLink } = useLinkPress();
  const [_promotionalMessages, setPromotionalMessages] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector(ShoppingCartStateSelector);
  const [showExpressButton, setShowExpressButton] = useState<boolean>(false);
  const route = useRoute();
  const { name: routeName } = route;
  const isFocused = useIsFocused();
  const [getShowExpressBuy] = useShowExpressBuyRequestRequest();
  const [getCart] = useLazyGetShoppingCartRequest();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  useEmmaSdk({ route });

  useEffect(() => {
    if (isFocused) onFocusScreen();
  }, [isFocused, routeName]);

  useFocusEffect(
    useCallback(() => {
      const MAX_ORDER_PROMOTION_NUMBER_TO_SHOW = 2;
      const orderPromotion =
        shoppingCart?.potentialOrderPromotions
          ?.reduce((acc, { description }) => {
            if (acc.includes(description) || !description) return acc;
            return [...acc, description];
          }, [] as string[])
          .slice(0, MAX_ORDER_PROMOTION_NUMBER_TO_SHOW) || [];
      setPromotionalMessages(orderPromotion);
    }, [shoppingCart?.potentialOrderPromotions])
  );
  const [removeDeliveryAddress] = useAddressRemoveCartRequest();

  const onFocusScreen = async () => {
    dispatch(setShowLoadingScreen(true));

    /**  @todo: Esto optimiza removiendo la address desde el home del carrito.  */
    const { deliveryAddress, code: cartId = '' } = shoppingCart;

    if (deliveryAddress) {
      await removeDeliveryAddress({
        username,
        cartId
      });
    }

    // @ts-ignore
    const { data = '', error } = await getShowExpressBuy({
      cartId,
      username
    });
    if (data === 'true') setShowExpressButton(true);
    if (error) console.log('>>>  ShowExpressButton Error:', error);

    const { data: _cartData, error: cartError } = await getCart({ username });
    _cartData && dispatch(setCartInfo(_cartData));
    dispatch(setPreviousScreen(undefined));
    if (cartError) console.log('>>>  Get Shopping Cart Error:', cartError);

    dispatch(setShowLoadingScreen(false));
  };

  const buildPromotionalMessagesTopCard = useCallback(() => {
    return (
      <>
        {_promotionalMessages.map((message, index) => (
          <CardInformation
            key={index}
            text={message}
            typeCard={index === 0 ? 'information' : 'second-promotion'}
            style={{ paddingVertical: 4 }}
            styleContent={styles.cardStyleContent}
            onClose={onClosePromotionalMessage}
            onPress={({ link = '' }) => link && openLink(link)}
          />
        ))}
      </>
    );
  }, [_promotionalMessages]);

  const onClosePromotionalMessage = (message: string) => {
    const newPromotionalMessages = _promotionalMessages.filter(
      _message => message !== _message
    );
    setPromotionalMessages(newPromotionalMessages);
  };

  const buildCartItems = useCallback(() => {
    return (
      <View>
        {shoppingCart?.entries
          ?.map((item, index) => {
            return (
              <View
                key={`ContainerItemShoppingCart-${index}-${item?.entryNumber}`}
                style={styles.item}>
                <ItemCartProduct
                  data={{
                    ...item,
                    appliedProductPromotions:
                      shoppingCart.appliedProductPromotions?.filter(app =>
                        app.consumedEntries.some(
                          ce => ce.orderEntryNumber === item.entryNumber
                        )
                      ) ?? []
                  }}
                  testID={`item_cart_${index}`}
                />
              </View>
            );
          })
          .reverse()}
      </View>
    );
  }, [shoppingCart?.entries]);

  if (!shoppingCart.entries?.length) return <CartEmpty />;

  return (
    <TemplatePage loading={false} loadingWithModal={false} disableSkeleton>
      <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        {buildPromotionalMessagesTopCard()}
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={10}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {buildCartItems()}
            <ComponentCoupon />
            <RecommendedCart shoppingCartItems={shoppingCart.entries} />
            <View style={{ height: 200 }} />
          </ScrollView>
        </KeyboardAvoidingView>
        <FooterCart
          totalOrder={shoppingCart?.totalPriceWithTax?.formattedValue}
          totalUnit={
            shoppingCart?.totalUnitCount ?? shoppingCart?.entries.length
          }>
          <DetailButtons showExpressBuyButton={showExpressButton} />
        </FooterCart>
      </View>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  item: { paddingHorizontal: 10, marginTop: 18 },
  cardView: { backgroundColor: COLORS.WHITE },
  cardStyleContent: { paddingVertical: 15 },
  scrollContainer: {
    paddingBottom: 80,
    backgroundColor: COLORS.WHITE
  },
  tab__shadow: {
    width: '100%'
  },
  loading_cart: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.BACKDROP,
    alignItems: 'center',
    justifyContent: 'center'
    //opacity: 1,
  }
});
