import React, { useEffect } from 'react';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import TemplatePage from '../../../common-components/template-page';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import {
  COLORS,
  FontStyles,
  MARING_HORIZONTAL,
  NAV
} from '../../../../application/common';
import { DeliveryNavigationRoute } from '../../../navigation/delivery';
import CarouselAgency from '../components/CarouselAgency';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { testProps } from '../../../../application/utils/accessibleId';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../application/state-manager';
import {
  setCartInfo,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../application/state-manager/services/checkout';
import { useLazyGetShoppingCartRequest } from '../../../../infrastucture/apis/shopping-cart';
import { useAddressRemoveCartRequest } from '../../../../infrastucture/apis/delivery-address';

export default function DeliverySelect() {
  const navigation = useNavigation();
  const route = useRoute();
  const { enableContinueButton } = (route?.params as any) ?? {};
  const dispatch = useAppDispatch();

  const dataCart = useAppSelector(ShoppingCartStateSelector);
  const { deliveryAddress, code: cartId } = dataCart;

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const [handleRemoveCartAddress] = useAddressRemoveCartRequest();
  const [getCart] = useLazyGetShoppingCartRequest();

  const removeAddress = async () => {
    dispatch(setShowLoadingScreen(true));
    await handleRemoveCartAddress({
      cartId: cartId ?? '',
      username
    });
    const { data: cart, error } = await getCart({
      cartId,
      username
    });
    cart && dispatch(setCartInfo(cart));
    console.log('>>> Error loading cart', error);
    dispatch(setShowLoadingScreen(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!deliveryAddress) return;
      removeAddress();
    }, [deliveryAddress, username])
  );

  const focused = useIsFocused();
  useEffect(() => {
    focused && enableContinueButton(false);
  }, [focused]);

  const optionsDelivery = [
    {
      id: 1,
      icon: require('../../../../../assets/images/delivery/deliveryHome.png'),
      title: 'A DOMICILIO',
      descripcion:
        'Recibe tu pedido en tu casa, oficina o en la dirección que nos indiques.',
      link: DeliveryNavigationRoute.DeliveryAddress
    },
    {
      id: 2,
      icon: require('../../../../../assets/images/delivery/deliveryAgency.png'),
      title: 'EN AGENCIAS AUTORIZADAS',
      descripcion:
        'Retira tu pedido en nuestras agencias autorizadas a nivel nacional.',
      link: DeliveryNavigationRoute.DeliveryThirdParty
    }
  ];

  const handleGoToLink = (screen: string) => {
    navigation.push(NAV.DELIVERY, {
      screen: screen,
      params: {
        cartId,
        dataCart
      }
    });
  };

  return (
    <TemplatePage loading={false} skeleton={null} error={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 190 }}>
        <Text style={styles.deliverySelect_title}>
          Elige como quieres recibir tu pedido
        </Text>
        <View style={styles.deliverySelect_options}>
          {optionsDelivery.map((option, index) => {
            return (
              <TouchableOpacity
                accessible
                {...testProps(`delivery_select${index}`)}
                style={styles.deliverySelect_card}
                key={`option${index}`}
                onPress={() => handleGoToLink(option.link)}>
                <View style={styles.deliverySelect_card_header}>
                  <View style={styles.deliverySelect_card_header_circle}>
                    <Image
                      source={option.icon}
                      style={styles.deliverySelect_card_header_img}
                    />
                  </View>
                </View>
                <View style={styles.deliverySelect_card_body}>
                  <Text style={styles.deliverySelect_card_body_title}>
                    {option.title}
                  </Text>
                  <Text style={styles.deliverySelect_card_body_descripcion}>
                    {option.descripcion}
                  </Text>
                  {option.id === 2 && <CarouselAgency />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  deliverySelect_title: {
    ...FontStyles.Body_1,
    textAlign: 'center',
    marginTop: 24
  },
  deliverySelect_options: {
    flexDirection: 'row',
    paddingHorizontal: MARING_HORIZONTAL,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    minHeight: 320,
    marginTop: MARING_HORIZONTAL,
    flexWrap: 'wrap'
  },
  deliverySelect_card: {
    //...SHADOW_CARD,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    width: '45%',
    maxWidth: 175,
    height: '100%',
    //marginHorizontal: 8,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,
    paddingBottom: 8
  },
  deliverySelect_card_header: {
    height: 93,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  },
  deliverySelect_card_header_circle: {
    backgroundColor: COLORS.BACKGROUNDICON,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 12
  },
  deliverySelect_card_header_img: {},
  deliverySelect_card_body: {
    paddingHorizontal: 16,
    paddingVertical: 22
  },
  deliverySelect_card_body_title: {
    ...FontStyles.Subtitle,
    color: COLORS.DARKBRAND,
    textAlign: 'left'
  },
  deliverySelect_card_body_descripcion: {
    ...FontStyles.Body_2,
    textAlign: 'left',
    marginTop: 16,
    marginBottom: 8
  }
});
