//libs
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import moment from 'moment';
//components
import { FontStyles } from '../../../../../application/common/fonts';
import { MainButton } from '../../../../common-components/buttons/Button';
import CardOrderEnter from '../components/CardOrderEnter';
import CheckboxComp from '../../../../common-components/checkboxs';
import { COLORS } from '../../../../../application/common';
import { SuccessEnterReturnBottomSheet } from '../components/SuccessEnterReturnBottomSheet';
import { SkeletonEnterReturn } from '../SkeletonReturns/SkeletonEnterReturn';

//hook
import { useMyReturnsSearch } from '../hooks/useMyReturnsSearch.hook';

//styles
import { stylesReturnEnter as styles } from './stylesMyReturns';
import { stylesOrderEnter } from '../components/stylesOrdersReturn';

//utils
import { handleIsSingular } from '../utils/utilsReturnClaim';
import { IEnterReturnProps } from '../interfaces/IMyReturnsDetail.interface';
import TemplatePage from '../../../../common-components/template-page';

const TEXT_ORDER = 'Pedido';
const SUB_TITLE =
  'No se puede devolver tarjeta de regalo ni pedidos cancelados.';

export const MyReturnsDetailScreen: React.FC<IEnterReturnProps> = ({
  route
}) => {
  const navigation = useNavigation();
  const { orderCode } = route.params;
  const {
    searchReturnOrders,
    dataSearchReturnOrders: OrderDetail,
    isLoadingSearchReturn,
    isErrorSearchReturn,
    handleToAccept,

    handleGlobal,
    isAllItems,
    handleReturnAll,

    //EnterReturn
    isLoadingEnterReturn,
    isDisabledAll,
    isSuccesEnterReturn,
    isErrorEnterReturn,
    //handleBottomSheet
    handleBottomSheet
  } = useMyReturnsSearch();

  useFocusEffect(
    useCallback(() => {
      searchReturnOrders(orderCode);
    }, [orderCode])
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      const action = e.data.action;
      if (isSuccesEnterReturn) return navigation.dispatch(action);
      if (isErrorEnterReturn) return navigation.dispatch(action);
      if (!isLoadingEnterReturn) return;

      if (isLoadingEnterReturn) {
        e.preventDefault();
        navigation?.setOptions({
          headerRight: () => null
        });
      }
    });
  }, [
    navigation,
    isLoadingEnterReturn,
    isSuccesEnterReturn,
    isErrorEnterReturn
  ]);

  if (isLoadingSearchReturn) return <SkeletonEnterReturn />;
  if (!OrderDetail) return null;

  return (
    <TemplatePage
      error={isErrorSearchReturn}
      loading={isLoadingSearchReturn}
      skeleton={<SkeletonEnterReturn />}>
      <ScrollView
        style={{ marginBottom: 80 }}
        // contentContainerStyle={{ flex: OrderDetail.entries.length > 3 ? 0 : 1 }}
      >
        <View style={styles.sectionUp}>
          <Text style={[FontStyles.Body_1, styles.order]}>
            {`${TEXT_ORDER} #${OrderDetail.code}`}
          </Text>
          <Text style={[FontStyles.Body_1, styles.textOrder]}>
            {`Fecha del pedido: ${moment(OrderDetail.created).format(
              'DD MMMM YYYY'
            )}`}
          </Text>
          <Text style={[FontStyles.Body_1, styles.textOrder]}>
            {`Cantidad: ${handleIsSingular(OrderDetail.entries.length)}`}
          </Text>
          <Text style={[FontStyles.Body_1, styles.textOrder]}>
            {`Monto: ${OrderDetail.totalPriceWithTax.formattedValue}`}
          </Text>
        </View>
        <Text style={[FontStyles.Body_1, styles.subTitle]}>{SUB_TITLE}</Text>
        {/* <Divider style={styles.divider} /> */}

        <CheckboxComp
          disabled={isDisabledAll}
          status={isAllItems ? 'checked' : 'unchecked'}
          onPress={() => handleReturnAll()}
          color={COLORS.BRAND}
          uncheckedColor={COLORS.GRAYCHECK}
          styleContainer={styles.checkBox}
          label={'Devolver todos los artículos'}
        />
        {OrderDetail.entries.map((x, index) => (
          <CardOrderEnter
            key={`OrderEnter-${index}`}
            code={x.product.ean}
            nameItem={x.product.name}
            availableQuantity={x.quantity}
            entryNumber={x.entryNumber}
            handleGlobal={handleGlobal}
          />
        ))}
        <View style={{ paddingHorizontal: 17 }}>
          <View style={[stylesOrderEnter.viewCardTotal, styles.totalItems]}>
            <Text style={FontStyles.Body_1}>
              Total artículos seleccionados: {handleGlobal.sumGlobal}
            </Text>
          </View>
        </View>
        <View
          style={
            OrderDetail.entries.length < 3 ? styles.viewEnd : styles.viewEndMore
          }>
          <MainButton
            style={
              OrderDetail.entries.length < 3 ? styles.button : styles.buttonMore
            }
            styleText={styles.textButton}
            disabled={isLoadingEnterReturn || handleGlobal.sumGlobal === 0}
            showActivityIndicator={isLoadingEnterReturn}
            title="CONTINUAR"
            onPress={handleToAccept}
          />
        </View>
        <SuccessEnterReturnBottomSheet
          show={handleBottomSheet.show}
          ticketNumber={handleBottomSheet.ticketNumber}
          handleClose={handleBottomSheet.handleClose}
          handleGoSeeDetails={handleBottomSheet.handleGoSeeDetails}
        />
      </ScrollView>
    </TemplatePage>
  );
};

export default MyReturnsDetailScreen;
