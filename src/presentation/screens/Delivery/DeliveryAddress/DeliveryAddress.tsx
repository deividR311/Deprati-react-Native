import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import TemplatePage from '../../../common-components/template-page';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FontStyles,
  MARING_HORIZONTAL,
  NAV
} from '../../../../application/common';
import { DeliveryNavigationRoute } from '../../../navigation/delivery';
import { List, RadioButton } from 'react-native-paper';
import { RightIconAccordion } from '../../../common-components/RightIconAccordion/RightIconAccordion';
import AddressInfo from '../../account/MyAddress/components/AddressInfo';
import ItemsDelivery from '../components/ItemsDelivery';
import { formatToCurrecy } from '../../../../application/utils/currency';
import StorePickupComponent, {
  FormStorePickup
} from '../components/StorePickupComponent';
import AddressForm from '../../account/MyAddress/AddressForm';
import { AddressDeliveryEmpty } from '../components/AddressDeliveryEmpty';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import {
  BottomSheet,
  IconButton
} from '../../../common-components/bottomSheet';
import Button from '../../../common-components/buttons/Button';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../application/state-manager';
import {
  CheckoutScreenStateSelector,
  DeliveryStateSelector,
  setCartInfo,
  setDeliveryOptions,
  setPreviousScreen,
  setPriceBeforeSelectDeliveryMode,
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../../application/state-manager/services/checkout';
import {
  DeliveryAddressResponse,
  useAddressRemoveCartRequest,
  useDeliveryOptionsRequest,
  useLazyGetDeliveryTimesQuery,
  useSetDeliveryAddressMutation,
  useSetDeliveryModeMutation
} from '../../../../infrastucture/apis/delivery-address';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import {
  DeliveryTimeRanges,
  PickupTimeRanges
} from '../../../../infrastucture/apis/delivery-thirdparty';
import {
  IPosGroup as PointOfService,
  useLazyPickupStoreRequest,
  useSelectPOSRequest
} from '../../../../infrastucture/apis/checkout/pickupStore';
import { useCheckoutState } from '../../../../application/state-manager/services/checkout/useCheckout.hook';
import { CheckoutSteps } from '../../../navigation/checkout';
import {
  DeliveryModeCode,
  useLazyGetShoppingCartRequest
} from '../../../../infrastucture/apis/shopping-cart';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import sleep from '../../../../application/utils/sleep';
import { useNavigationSummary } from '../hooks/navigationSummary.hook';
import { fontWeightOS } from '../../../../application/utils';

export default function DeliveryAddress() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>(null);
  const { showModal, hideModal } = useGenericModal();
  const [expandedId, setExpandedId] = useState<string | number | undefined>(
    '1'
  );
  const [addressId, setAddressId] = useState<string>();
  const [cityCode, setCityCode] = useState<string>();
  const [pointOfServices, setPointOfServices] = useState<PointOfService[]>();
  const [deliveryModeId, setDeliveryModeId] = useState<string>();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryAddressResponse[]>();
  const [storePickup, setStorePickup] = useState<FormStorePickup>();
  const [storePickupHasError, setStorePickupError] = useState(false);
  const [enableButtonAddress, hasButtonAddress] = useState(false);
  const [isCreateAddress, setIsCreateAddress] = useState(false);
  const [argsCreate, setArgsCreate] = useState<any>();
  const { onContinueButtonTrigger, onPressContinueButton } = useCheckoutState();
  useEmmaSdk({ route });

  const [
    showBottomSheetDisabledDeliveryItems,
    setShowBottomSheetDisabledDeliveryItems
  ] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    code: cartId = '',
    entries: productsInCart,
    deliveryAddress,
    deliveryOrderGroups,
    deliveryMode: cartDeliveryMode
  } = useAppSelector(ShoppingCartStateSelector);
  const {
    defaultAddress,
    deliveryAddresses,
    showThirdParty: showBottomAgencyThirdParty,
    hasCartPickupItems,
    noAddress: hasAddressSelect
  } = useAppSelector(DeliveryStateSelector) ?? {};

  const { loading: loadingScreen } = useAppSelector(
    CheckoutScreenStateSelector
  );

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const [getCart] = useLazyGetShoppingCartRequest();
  const [getDeliveryModes] = useLazyGetDeliveryTimesQuery();
  const [getDeliveryOptions] = useDeliveryOptionsRequest();
  const [getPointOfService] = useLazyPickupStoreRequest();
  const [setDeliveryAddress] = useSetDeliveryAddressMutation();
  const [setDeliveryMode] = useSetDeliveryModeMutation();
  const [setSelectPointOfService] = useSelectPOSRequest();
  const [removeDeliveryAddress] = useAddressRemoveCartRequest();

  const validNavigateSummary = useNavigationSummary(enableButtonAddress);

  const deliveryModes: DeliveryTimeRanges[] = useMemo(() => {
    if (!deliveryInfo?.length) return [];
    return deliveryInfo
      .filter(m => m?.deliveryTimeRanges?.length)
      .map(m => m.deliveryTimeRanges![0]);
  }, [deliveryInfo]);

  const deliveryItems: DeliveryTimeRanges[] = useMemo(() => {
    if (!deliveryInfo?.length) return [];
    return deliveryInfo
      ?.filter(
        m =>
          m?.deliveryTimeRanges?.length &&
          m?.deliveryTimeRanges[0]?.deliveryMethod === deliveryModeId
      )
      .reduce((acc, mode) => {
        const ranges = mode?.deliveryTimeRanges ?? [];
        return acc.concat(ranges);
      }, [] as DeliveryTimeRanges[]);
  }, [deliveryInfo, deliveryModeId]);

  const pickupDeliveryItems: PickupTimeRanges['items'] = useMemo(() => {
    if (!deliveryInfo?.length) return [];
    return (
      deliveryInfo?.find(m => m.pickupTimeRanges?.items?.length)
        ?.pickupTimeRanges?.items ?? []
    );
  }, [deliveryInfo]);

  const disabledDeliveryItems: PickupTimeRanges['items'] = useMemo(() => {
    if (!deliveryInfo?.length) return [];
    return deliveryInfo?.reduce((acc, mode) => {
      if (
        mode?.productsShippingDisabled?.items?.length &&
        mode?.productsShippingDisabled?.deliveryMethod !== 'thirdParty'
      ) {
        return acc.concat(mode?.productsShippingDisabled?.items || []);
      }

      if (mode?.deliveryTimeRanges?.length) {
        const timeRange = mode?.deliveryTimeRanges?.find(
          element => element?.deliveryTimeRange === 'No hay cobertura'
        );
        if (timeRange) {
          return acc.concat(timeRange?.items);
        }
      }
      return acc;
    }, [] as PickupTimeRanges['items']);
  }, [deliveryInfo]);

  const onPressAccordionItem = (newExpandedId: string | number) => {
    expandedId === newExpandedId
      ? setExpandedId(undefined)
      : setExpandedId(newExpandedId);
  };

  const onShowAddressForm = () => {
    showModal(ModalsType.AddressPaymentModal, {
      title: 'Añadir dirección',
      textComponent: () => (
        <AddressForm
          isModal={true}
          enableKeyBoardAvoiding={true}
          contentButtonsStyle={{ marginTop: 0 }}
          onAction={async args => {
            if (args?.simpleCancel || !args?.id) return;
            // !args?.isSuccess && return args?.onCallbackError?.()
            if (args?.isSuccess) {
              await onRefeshDeliveryOptions();
              setAddressId(args.id);
              onPressAccordionItem('1');
            }
          }}
        />
      )
    });
  };

  const onAddressChange = async () => {
    if (addressId === undefined) return;
    dispatch(setShowLoadingScreen(true));
    if (cartDeliveryMode?.code === DeliveryModeCode.thirdparty)
      await onRemoveAddress();
    setDeliveryInfo([]);
    setDeliveryModeId(undefined);
    await setDeliveryAddress({
      addressId: addressId ?? '',
      cartId,
      username
    });
    const { data: _deliveryModes, error: errorDeliveryMode } =
      await getDeliveryModes({
        username,
        cartId
      });
    if (errorDeliveryMode) {
      // const message =
      //   errorDeliveryMode?.data?.errors
      //     ?.map(e => `${e.type ?? ''} ${e?.message ?? ''}`)
      //     ?.join(' ') ??
      //   'La ciudad seleccionada no tiene cobertura. Ingrese una nueva ciudad destino.'
      dispatch(setShowLoadingScreen(false));
      setAddressId(undefined);
      showModal(ModalsType.CartDeliveryAddressError);
      //  await onRemoveAddress()
      return;
    }
    if (_deliveryModes?.length) {
      setDeliveryInfo(_deliveryModes);
    }

    const { city: currentCity = '' } =
      [...(deliveryAddresses ?? []), defaultAddress].find(
        a => a?.id === addressId
      ) ?? {};

    if (
      !showBottomAgencyThirdParty &&
      cityCode !== currentCity &&
      hasCartPickupItems
    ) {
      setCityCode(currentCity);
      const { data } = await getPointOfService({
        user: username
      });
      setPointOfServices(data?.posGroups);
    }
    dispatch(setShowLoadingScreen(false));
  };

  const onRemoveAddress = async () => {
    await removeDeliveryAddress({
      cartId,
      username
    });
    const { data, error } = await getCart({
      username,
      cartId
    });
    if (data) {
      dispatch(setCartInfo(data));
      dispatch(
        setPriceBeforeSelectDeliveryMode(data.totalPriceWithTax.formattedValue)
      );
    }
  };

  const onRefeshDeliveryOptions = async () => {
    dispatch(setShowLoadingScreen(true));
    const { data, error }: any = await getDeliveryOptions({
      cartId,
      username
    });
    data && dispatch(setDeliveryOptions(data));
    dispatch(setShowLoadingScreen(false));
    error && console.log('Delivery Options Error: ', error);
  };

  const onPressContinueBuy = async () => {
    dispatch(setShowLoadingScreen(true));
    await setDeliveryMode({
      cartId: cartId,
      deliveryModeId: deliveryModeId ?? '',
      username
    });

    if (!showBottomAgencyThirdParty) {
      const { store = '', fullName, numID } = storePickup || {};
      await setSelectPointOfService({
        user: username,
        cartId: cartId,
        posCode: store,
        retireId: numID,
        retireName: fullName,
        deliveryMethodCode: deliveryModeId,
        selectedAddressCode: addressId
      });
    }
    const { data: cartInfo, error } = await getCart({
      username
    });
    cartInfo && dispatch(setCartInfo(cartInfo));
    dispatch(setShowLoadingScreen(false));
    validNavigateSummary(route);
  };

  const renderDefaultAddressContentCell = () => {
    if (!defaultAddress)
      return <AddressDeliveryEmpty onPress={onShowAddressForm} />;
    return (
      <View style={[styles.deliveryaddress_select]}>
        <RadioButton.Android
          value={defaultAddress.id}
          uncheckedColor={COLORS.BRAND}
          color={COLORS.BRAND}
        />
        <AddressInfo
          item={defaultAddress}
          showCheckbox={false}
          showFormModal={true}
          onDelete={async (completed, id, error) => {
            dispatch(setShowLoadingScreen(!completed));
            if (error || !completed) return;
            if (addressId === id) {
              setDeliveryModeId(undefined);
              setDeliveryInfo([]);
              setAddressId(undefined);
            }
            await onRefeshDeliveryOptions();
          }}
          onAction={async args => {
            if (args?.simpleCancel) return;
            if (args?.isSuccess) {
              await onRefeshDeliveryOptions();
              setAddressId(args?.id);
              await onAddressChange();
            }
          }}
        />
      </View>
    );
  };

  const renderAddressesContentCell = () => {
    if (!deliveryAddresses?.length)
      return <AddressDeliveryEmpty onPress={onShowAddressForm} />;

    return deliveryAddresses?.map((address, index) => {
      return (
        <View key={index} style={[styles.deliveryaddress_select]}>
          <RadioButton.Android
            key={index}
            value={address.id}
            uncheckedColor={COLORS.BRAND}
            color={COLORS.BRAND}
          />
          <AddressInfo
            item={address}
            showCheckbox={false}
            showFormModal={true}
            onDelete={async (completed, id, error) => {
              dispatch(setShowLoadingScreen(!completed));
              if (error || !completed) return;
              console.log(
                '>>> is a selectioned ',
                addressId,
                id,
                addressId === id
              );
              if (addressId === id) {
                setDeliveryModeId(undefined);
                setDeliveryInfo([]);
                setAddressId(undefined);
              }
              await onRefeshDeliveryOptions();
            }}
            onAction={async args => {
              if (args?.simpleCancel) return;
              if (args?.isSuccess) {
                await onRefeshDeliveryOptions();
                args?.id && setAddressId(args?.id);
                args?.defaultAddress && onPressAccordionItem('1');
                await onAddressChange();
              }
            }}
          />
        </View>
      );
    });
  };

  const renderAddresses = () => {
    return (
      <>
        <RadioButton.Group
          onValueChange={_addressId => setAddressId(_addressId)}
          value={addressId ?? ''}>
          <List.Accordion
            title="Enviar a mi dirección principal"
            id="1"
            style={[styles.deliveryaddress_delivery_accordion]}
            titleStyle={styles.deliveryaddress_delivery_accordion_text}
            right={RightIconAccordion}>
            {renderDefaultAddressContentCell()}
          </List.Accordion>

          <List.Accordion
            title="Mis otras direcciones"
            id="2"
            style={[styles.deliveryaddress_delivery_accordion]}
            titleStyle={styles.deliveryaddress_delivery_accordion_text}
            right={RightIconAccordion}>
            {renderAddressesContentCell()}
          </List.Accordion>
        </RadioButton.Group>

        <List.Accordion
          title="Enviar a otra dirección"
          id="3"
          style={[styles.deliveryaddress_delivery_accordion]}
          titleStyle={styles.deliveryaddress_delivery_accordion_text}
          right={RightIconAccordion}>
          <AddressForm
            showButtomCancel={false}
            isModal={true}
            enableKeyBoardAvoiding={false}
            customStyle={{
              content: {
                paddingBottom: 16
              }
            }}
            onAction={async args => {
              if (args?.simpleCancel || !args?.id) return;
              if (args?.isSuccess) {
                setExpandedId(undefined);
                await onRefeshDeliveryOptions();
                args?.id && setAddressId(args.id);
                args?.defaultAddress && onPressAccordionItem('1');
                setArgsCreate(args);
                handleSuccesCreateAddress();
              }
            }}
          />
        </List.Accordion>
      </>
    );
  };
  useEffect(() => {
    async function handleSuccessCreate() {
      if (isCreateAddress && !loadingScreen) {
        await sleep(500);
        setIsCreateAddress(false);
        argsCreate?.onCallbackSuccess?.();
      }
    }
    handleSuccessCreate();
  }, [isCreateAddress, loadingScreen]);

  const handleSuccesCreateAddress = async () => {
    await sleep(1000);
    onPressAccordionItem('2');
    setIsCreateAddress(true);
  };

  const renderDeliveryItems = () => {
    return (
      <List.Accordion
        title="Artículos envío a domicilio"
        id="4"
        style={[styles.deliveryaddress_delivery_accordion]}
        titleStyle={styles.deliveryaddress_delivery_accordion_text}
        right={RightIconAccordion}>
        {deliveryItems?.map((item, index) => (
          <View key={index} style={[styles.deliveryaddress_items]}>
            <Text style={styles.deliveryaddress_time_range}>
              {item?.deliveryTimeRange}
            </Text>
            <ItemsDelivery items={item?.items} />
          </View>
        ))}
      </List.Accordion>
    );
  };

  const renderItemsPickUpInStore = () => {
    if (!hasCartPickupItems) return null;
    return (
      <List.Accordion
        title="Artículos retiro en tienda"
        id="5"
        style={[styles.deliveryaddress_delivery_accordion]}
        titleStyle={styles.deliveryaddress_delivery_accordion_text}
        right={RightIconAccordion}>
        <>
          <ItemsDelivery items={pickupDeliveryItems} />
          {pointOfServices?.length && (
            <StorePickupComponent
              storePickupData={storePickup}
              onChangeFieldsFormStorePickup={setStorePickup}
              pointOfServices={pointOfServices}
              onError={setStorePickupError}
            />
          )}
        </>
      </List.Accordion>
    );
  };

  const renderThirdParty = () => {
    if (!showBottomAgencyThirdParty) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setPreviousScreen(undefined));
          navigation.replace(NAV.DELIVERY, {
            screen: DeliveryNavigationRoute.DeliveryThirdParty,
            params: {
              ...route.params
            }
          });
        }}>
        <Text style={styles.deliveryaddress_delivery_text}>
          Retirar pedido en agencia autorizada
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDeliveryModes = () => {
    if (!deliveryModes.length) return null;
    return (
      <View style={[styles.deliveryaddress_modeDelivery]}>
        <Text style={[styles.deliveryaddress_modeDelivery_title]}>
          Modo de envío
        </Text>
        <RadioButton.Group
          onValueChange={newValue => setDeliveryModeId(newValue)}
          value={deliveryModeId ?? ''}>
          {deliveryModes?.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.deliveryaddress_select,
                  {
                    width: '90%',
                    paddingHorizontal: 0
                  }
                ]}>
                <RadioButton.Android
                  key={index}
                  value={item?.deliveryMethod}
                  uncheckedColor={COLORS.BRAND}
                  color={COLORS.BRAND}
                />
                <View style={[styles.deliveryaddress_methods]}>
                  <Text style={[styles.deliveryaddress_methods_text]}>
                    {item?.deliveryMethodDescription}
                    <Text style={[styles.deliveryaddress_methods_text_bold]}>
                      &nbsp;({formatToCurrecy(item?.deliveryCost)})
                    </Text>
                  </Text>
                  <Text style={[styles.deliveryaddress_methods_text]}>
                    Peso aproximado del envío
                    <Text style={[styles.deliveryaddress_methods_text_bold]}>
                      &nbsp;{item.totalWeight} kg
                    </Text>
                  </Text>
                  <Text style={[styles.deliveryaddress_methods_text]}>
                    Para más información{'\n'}comunícate al 04 373-1800
                  </Text>
                </View>
              </View>
            );
          })}
        </RadioButton.Group>
      </View>
    );
  };

  const renderDisabledDeliveryItems = () => {
    return (
      disabledDeliveryItems?.length > 0 && (
        <BottomSheet
          onCloseRequest={() => setShowBottomSheetDisabledDeliveryItems(false)}
          percentage={80}
          canDrop={true}
          show={showBottomSheetDisabledDeliveryItems}
          header={
            <View style={styles.bottomsheet__iconButtonClose}>
              <IconButton
                testID="close-bottomSheet-disabled-delivery-items"
                iconName="close"
                onPress={() => setShowBottomSheetDisabledDeliveryItems(false)}
              />
            </View>
          }>
          <View style={[styles.bottomsheet__container]}>
            <Text
              style={[
                FontStyles.H6_Headline,
                { marginBottom: 16, textAlign: 'center' }
              ]}>
              Artículos sin cobertura de envío
            </Text>
            <Text
              style={[
                FontStyles.Body_1,
                { marginBottom: 8, textAlign: 'center' }
              ]}>
              Los siguientes artículos no tienen cobertura para la ciudad
              seleccionada. Ingresa una nueva dirección de entrega.
            </Text>
            <ItemsDelivery items={disabledDeliveryItems} />
            <Button
              onPress={() => setShowBottomSheetDisabledDeliveryItems(false)}
              marginTop={6}
              backgroundColor={COLORS.BRAND}
              textColor={COLORS.WHITE}
              linkName={'ACEPTAR'}
            />
          </View>
        </BottomSheet>
      )
    );
  };

  useEffect(() => {
    // deliveryAddress is delivery selected in checkout
    const { id } = deliveryAddress ?? defaultAddress ?? {};
    id && setAddressId(id);
  }, [deliveryAddress?.id, defaultAddress?.id]);

  useEffect(() => {
    if (!deliveryModes.length) return;
    setDeliveryModeId(deliveryModes[0].deliveryMethod);
    !showBottomAgencyThirdParty && addressId && onPressAccordionItem('5');
  }, [deliveryModes, showBottomAgencyThirdParty]);

  useEffect(() => {
    if (!addressId) return;
    onAddressChange();
  }, [addressId]);

  useEffect(() => {
    if (!loadingScreen && disabledDeliveryItems?.length > 0) {
      setTimeout(() => {
        setShowBottomSheetDisabledDeliveryItems(true);
      }, 500);
    }
  }, [disabledDeliveryItems?.length, loadingScreen]);

  useEffect(() => {
    if (
      onContinueButtonTrigger?.toString() === NAV.DELIVERY.toString() &&
      route.name === DeliveryNavigationRoute.DeliveryAddress &&
      isFocused
    ) {
      onPressContinueBuy();
    }
  }, [onContinueButtonTrigger, isFocused]);

  useEffect(() => {
    // @ts-ignore
    if (isFocused) {
      const { enableContinueButton = () => undefined } = route.params ?? {};

      const hasErrorInDelivery =
        !addressId || !deliveryModeId || disabledDeliveryItems.length;

      const whoReceiveInPickUpHasError =
        (!!storePickup?.fullName && !storePickup.numID) ||
        (!storePickup?.fullName && !!storePickup?.numID);

      const hasErrorInPickUp =
        hasCartPickupItems &&
        (!storePickup?.store ||
          !storePickup?.city ||
          storePickupHasError ||
          whoReceiveInPickUpHasError);

      const disable = hasErrorInDelivery || hasErrorInPickUp;
      hasButtonAddress(!disable);
      enableContinueButton(!disable);
    }
  }, [
    storePickupHasError,
    storePickup,
    addressId,
    deliveryModeId,
    hasCartPickupItems,
    storePickupHasError,
    isFocused
  ]);

  useEffect(() => {
    if (!isFocused || !deliveryAddress) return;
    /**  @todo: Esto se puede optimizar removiendo la address desde el home del carrito.  */
    // onRemoveAddress()
  }, [isFocused]);

  return (
    <TemplatePage loading={false} error={false}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}>
        <List.AccordionGroup
          onAccordionPress={onPressAccordionItem}
          expandedId={expandedId}>
          {renderAddresses()}
          {renderDeliveryItems()}
          {renderItemsPickUpInStore()}
        </List.AccordionGroup>
        {renderDeliveryModes()}
        {renderThirdParty()}
      </ScrollView>
      {renderDisabledDeliveryItems()}
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  deliveryaddress_methods: {
    marginLeft: 8,
    width: '90%'
  },
  deliveryaddress_methods_text: {
    ...FontStyles.Regular,
    fontWeight: '400'
  },
  deliveryaddress_methods_text_bold: {
    ...FontStyles.Regular,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  deliveryaddress_select: {
    flexDirection: 'row',
    paddingHorizontal: MARING_HORIZONTAL,
    paddingVertical: MARING_HORIZONTAL,
    alignItems: 'flex-start',
    width: '60%'
  },
  deliveryaddress_items: {
    flexDirection: 'column',
    paddingHorizontal: MARING_HORIZONTAL,
    paddingVertical: MARING_HORIZONTAL
  },
  deliveryaddress_time_range: {
    fontFamily: FONTS_FAMILY.Roboto
  },
  deliveryaddress_modeDelivery: {
    flexDirection: 'column',
    marginHorizontal: 24,
    paddingVertical: MARING_HORIZONTAL,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.DARK70}20`
  },
  deliveryaddress_modeDelivery_title: {
    ...FontStyles.Regular,
    color: COLORS.BRAND,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  deliveryaddress_delivery_text: {
    ...FontStyles.Regular,
    color: COLORS.BRAND,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 24,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  deliveryaddress_delivery_accordion: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAYDARK60,
    height: 50,
    justifyContent: 'center',
    width: '100%'
  },
  deliveryaddress_delivery_accordion_text: {
    ...FontStyles.Regular,
    color: COLORS.DARK70,
    fontWeight: '600'
  },
  bottomsheet__iconButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 5,
    marginTop: 0,
    width: '100%'
  },
  bottomsheet__container: {
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'stretch'
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
