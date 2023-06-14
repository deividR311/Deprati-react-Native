import React, { useMemo, useState } from 'react';
import { COLORS, NAV } from '../../../../../../application/common';
import Button from '../../../../../common-components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import ButtonPayOneClic from '../ButtonPayOneClic';
import { RootNavigationProps } from '../../../../../navigation';
import BottomSheetCredit from '../../../../checkout/payment-methods/payment-deprati-credit/components/BottomSheetCredit';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { useGenericModal } from '../../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../../common-components/modal/modal.interfaces';
import { useDeliveryOptionsRequest } from '../../../../../../infrastucture/apis/delivery-address';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../application/state-manager';
import {
  setDeliveryOptions,
  setPriceBeforeSelectDeliveryMode,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../../../application/state-manager/services/checkout';

export default function DetailButtons(props: Props) {
  const { showExpressBuyButton = false } = props;
  const navigation = useNavigation();
  const [showSheet, setshowSheet] = useState(false);
  const { showModal } = useGenericModal();
  const dataCart = useAppSelector(ShoppingCartStateSelector);
  const dispatch = useAppDispatch();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const [getDeliveryOptions] = useDeliveryOptionsRequest();

  const greaterThanStock = useMemo(
    () =>
      dataCart.entries?.some(item =>
        item.product.stock === undefined
          ? false
          : item.product.stock?.stockLevel > 0 &&
            item.product.stock?.stockLevel < item.quantity
      ),
    [dataCart.entries]
  );

  const withoutStock = useMemo(
    () => dataCart.entries?.some(item => item.product.stock?.stockLevel === 0),
    [dataCart.entries]
  );

  const onPressContinueShoppingButton = async () => {
    if (greaterThanStock || withoutStock) {
      showModal(ModalsType.CardItemWithoutStock);
      return;
    }
    dispatch(setShowLoadingScreen(true));
    // @ts-ignore
    const { data, error } = await getDeliveryOptions({
      cartId: dataCart.code ?? '',
      username
    });

    data && dispatch(setDeliveryOptions(data));
    dispatch(setShowLoadingScreen(false));
    error && console.log('Delivery Options Error: ', error);
    /** @summary IMPORTANT: THIS LINE KEEP THE PRICE BEFORE SET DELIVERY MODE IN ADRRESS-SELECT SCREEN */
    /** @summary IMPORTANT: YOU MUST NEED SEE THE FooterCheckout.tsx COMPONENT TOO */
    dispatch(
      setPriceBeforeSelectDeliveryMode(
        dataCart.totalPriceWithTax?.formattedValue
      )
    );
    if (error) return;
    navigation.navigate<RootNavigationProps>(NAV.CHECKOUT, {
      dataCart,
      showThirdParty: data?.showThirdParty ?? true
    });
  };

  return (
    <>
      <Button
        testID={'cart_button_continue'}
        marginTop={12}
        backgroundColor={COLORS.BRAND}
        linkName="CONTINUAR COMPRA"
        textColor={COLORS.WHITE}
        onPress={onPressContinueShoppingButton}
      />
      {showExpressBuyButton && (
        <ButtonPayOneClic
          onPress={() => {
            setshowSheet(true);
          }}
        />
      )}
      <BottomSheetCredit
        onCloseRequestError={error => {
          if (error) {
            showModal(ModalsType.ErrorService, {
              title: error
            });
          }
        }}
        onCloseRequest={() => setshowSheet(false)}
        show={showSheet}
        buyExpress={true}
        showCheckbox={false} // forever false for pago un solo clic
      />
    </>
  );
}

interface Props {
  showExpressBuyButton: boolean;
}
