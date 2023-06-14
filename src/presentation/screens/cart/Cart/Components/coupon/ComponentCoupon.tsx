import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MainButton } from '../../../../../common-components/buttons/Button';
import CardInformation from '../../../../../common-components/cardInformation/CardInformation';
import { AllTypesCard } from '../../../../../common-components/cardInformation/utilsCard';
import InputBase from '../../../../../common-components/inputs/InputBase';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../application/state-manager';
import {
  setCartInfo,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../../application/state-manager/services/checkout';
import {
  useAddCouponRequest,
  useLazyGetShoppingCartRequest,
  useRemoveCouponRequest
} from '../../../../../../infrastucture/apis/shopping-cart';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';

export default function ComponentCoupon({
  style = {},
  styleContentInput = {},
  styleContentButton = {}
}: ComponentCouponProps) {
  const inputLabelValues = {
    empty: 'Agregar cupón',
    fill: 'Cupón'
  };

  const [getShoppingCart] = useLazyGetShoppingCartRequest();
  const [addCoupon] = useAddCouponRequest();
  const [removeCoupon] = useRemoveCouponRequest();
  const dispatch = useAppDispatch();

  const {
    localStorageData: {
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.User]: { uid: USER_EMAIL }
    }
  } = useLocalStorage();

  const { appliedVouchers: [couponData] = [], code: cartId } = useAppSelector(
    ShoppingCartStateSelector
  );

  const [couponText, setCouponText] = useState<string | undefined>(
    couponData?.voucherCode
  );
  const [inputLabel, setInputLabel] = useState(inputLabelValues.empty);

  const [couponCardState, setCouponCardState] = useState<{
    show: boolean;
    text: string;
    type: AllTypesCard;
  }>({
    show: !!couponData?.voucherCode,
    text: couponData?.voucherCode
      ? COUPON_MESSAGES[COUPON_MESSAGES_KEY.Success]!
      : COUPON_MESSAGES[COUPON_MESSAGES_KEY.GeneralError]!,
    type: couponData?.voucherCode ? 'success' : 'error'
  });

  useEffect(() => {
    if (!couponData) return;
    setCouponCardState({
      show: true,
      text: COUPON_MESSAGES[COUPON_MESSAGES_KEY.Success]!,
      type: 'success'
    });
  }, [couponData]);

  const onPressApplyCoupon = async () => {
    dispatch(setShowLoadingScreen(true));
    try {
      const response = await addCoupon({
        token: TOKEN,
        username: USER_EMAIL,
        cartId,
        voucherId: couponText
      });

      // @ts-ignore
      const errorKey = response?.error?.data.errors?.[0]?.message;
      if (errorKey) {
        setCouponText('');
        const errorMessage =
          COUPON_MESSAGES[errorKey] ??
          COUPON_MESSAGES[COUPON_MESSAGES_KEY.GeneralError]!;
        throw new Error(errorMessage);
      }

      const cart = await getShoppingCart({
        username: USER_EMAIL,
        cartId
      });
      cart.data && dispatch(setCartInfo(cart.data));

      setCouponCardState({
        show: true,
        text: COUPON_MESSAGES[COUPON_MESSAGES_KEY.Success]!,
        type: 'success'
      });
      setCouponText('');
    } catch (error) {
      setCouponCardState({
        show: true,
        text:
          (error as Error).message ||
          COUPON_MESSAGES[COUPON_MESSAGES_KEY.GeneralError]!,
        type: 'error'
      });
    } finally {
      dispatch(setShowLoadingScreen(false));
    }
  };

  const onPressCloseCouponCardInfo = async () => {
    if (couponCardState?.type === 'success') await _removeCoupon();
    setCouponCardState({
      show: false,
      text: '',
      type: 'information'
    });
  };

  const _removeCoupon = async () => {
    dispatch(setShowLoadingScreen(true));
    try {
      await removeCoupon({
        token: TOKEN,
        username: USER_EMAIL,
        cartId,
        voucherId: couponData.voucherCode
      });
      const cart = await getShoppingCart({
        username: USER_EMAIL,
        cartId
      });
      cart.data && dispatch(setCartInfo(cart.data));
    } catch (error) {
      console.log('>>> Oops! removing coupon error:', error);
    } finally {
      setCouponText('');
      dispatch(setShowLoadingScreen(false));
    }
  };

  return (
    <>
      {couponCardState?.show && (
        <CardInformation
          typeCard={couponCardState.type}
          text={couponCardState.text}
          onClose={onPressCloseCouponCardInfo}
        />
      )}
      {!couponCardState?.show && (
        <View style={[styles.container, style]}>
          <View style={[styles.contentInput, styleContentInput]}>
            <InputBase
              dense
              maxLength={35}
              multiline={false}
              autoComplete="off"
              value={couponText}
              label={couponText ? inputLabelValues.fill : inputLabel}
              onChangeText={text => setCouponText(text.trimStart())}
              onBlur={() => setInputLabel(inputLabelValues.empty)}
              onFocus={() => setInputLabel(inputLabelValues.fill)}
            />
          </View>
          <View style={[styles.contentButton, styleContentButton]}>
            <MainButton
              title="APLICAR"
              disabled={!couponText?.trim().length}
              onPress={() => onPressApplyCoupon()}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  contentInput: {
    width: '62%',
    justifyContent: 'center'
  },
  contentButton: {
    width: '35%',
    justifyContent: 'center',
    marginTop: 5
  },
  input: { height: 45 }
});
interface ComponentCouponProps {
  style?: ViewStyle;
  styleContentInput?: ViewStyle;
  styleContentButton?: ViewStyle;
}

export enum COUPON_MESSAGES_KEY {
  Provided = 'coupon.invalid.code.provided',
  Redeemed = 'coupon.already.redeemed',
  Expired = 'coupon.not.active.expired',
  Cart = 'coupon.already.exists.cart',
  GeneralError = 'coupon.general.error',
  RecalculationError = 'coupon.order.recalculation.error',
  Success = 'coupon.success'
}

const COUPON_MESSAGES: Record<string, string | undefined> = {
  'coupon.invalid.code.provided': 'El cupón ingresado no existe.',
  'coupon.already.redeemed': 'Cupón repetido, intenta con uno nuevo.',
  'coupon.order.recalculation.error':
    'Error occured while re-calculatinng the order.',
  'coupon.not.active.expired': 'Tu número de cupón promocional ha expirado',
  'coupon.already.exists.cart':
    'Ya tienes un cupón aplicado. Si quieres usar otro, debes eliminar el actual.',
  'coupon.general.error': 'Coupon Redemption Failed.',
  'coupon.success': 'Cupón promocional aplicado'
};
