import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontStyles } from '../../../application/common';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { formatToCurrecy } from '../../../application/utils/currency';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';
import CardReload from '../../common-components/cardReload/cardReload';
import { CreditInformationChart } from '../../common-components/credit-information-chart';
import { SafeArea } from '../../common-components/safe-area';
import { styles } from './CreditMovement.stylesheet';
import { useCreditMovement } from './hook/useCreditMovement.hook';
import { SkeletonPage } from './skeleton';
import NextPayment from '../Credit/components/NextPayment';
import { PopupWhatsapp } from '../../common-components/poppup/poppupWhatsapp';

const CreditMovement = () => {
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    loading,
    hasError,
    contentPayment,
    constentChart,
    contentMovement,
    getDataContent,
    showModalError,
    showModalTextError,
    closeModaError
  } = useCreditMovement();
  const {
    localStorageData: {
      [LocalStorageKey.AccountDisplayNumber]: AccountDisplayNumber,
      [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER
    }
  } = useLocalStorage();

  const LastMovement = () => {
    return (
      <View style={styles.lastMovement}>
        <Text style={styles.lastMovement_title}>Últimos movimientos</Text>
        <View style={styles.lastMovement_movement}>
          {contentMovement.map((item, index: number) => {
            return (
              <LastMovementItem key={`lastmovement${index}`} item={item} />
            );
          })}
        </View>
      </View>
    );
  };

  const LastMovementItem = ({ item }) => {
    let typeMovement = true;
    const typesMovement = {
      COMPRA: false,
      DEVOLUCIÓN: true,
      PAGO: true
    };
    typeMovement = typesMovement[item?.tipoMovimiento] ?? true;

    return (
      <View style={styles.lastMovementItem}>
        <Text style={styles.lastMovementItem__title}>
          {item?.descripcionMovimiento}
        </Text>
        <View style={styles.lastMovementItem__data}>
          <Text style={styles.lastMovementItem__data_date}>
            {item?.fechaMovimiento}
          </Text>
          <Text
            style={[
              styles.lastMovementItem__data_price,
              typeMovement ? styles.price_plus : styles.price_minus
            ]}>
            {typeMovement ? '+' : '-'}{' '}
            {formatToCurrecy(item?.valor?.toString())}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) return <SkeletonPage />;

  return (
    <>
      {showModalTextError === '' ? (
        <>
          <SafeArea>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}>
              <CardReload
                style={{ paddingVertical: 8 }}
                typeCard={'information'}
                text={
                  <Text style={FontStyles.Body_2}>
                    Ha ocurrido un error de carga,&nbsp;
                    <Text style={[FontStyles.Bold]}>
                      vuelve a cargar esta sección aquí.
                    </Text>
                  </Text>
                }
                isVisible={hasError}
                onClose={() => {
                  getDataContent();
                }}
                onPress={args => {
                  getDataContent();
                }}
              />
              <View style={styles.content_chart}>
                <CreditInformationChart
                  constentChart={constentChart}
                  totalAmount={Number(
                    constentChart?.totalAmount
                      ?.toString()
                      .replace('.', '')
                      .replace(',', '.')
                  )}
                  amountSpent={Number(
                    constentChart?.amountSpent
                      .toString()
                      .replace('.', '')
                      .replace(',', '.')
                  )}
                  ownerFullname={constentChart?.clientName}
                  affiliateDate={constentChart?.affiliateDate}
                  cardNumber={constentChart?.cardNumber}
                  availableAmount={Number(
                    constentChart?.availableAmount
                      .toString()
                      .replace('.', '')
                      .replace(',', '.')
                  )}
                  numeroTarjetaAdicionalDisplay={AccountDisplayNumber}
                  showAffiliateDate={false}
                  showDisplayCard={false}
                />
              </View>

              <NextPayment
                contentPayment={contentPayment}
                loading={false}
                stylesCustom={{
                  nextPayment: styles.nextPayment__container
                }}
              />
              {ADDITIONAL_ACCOUNT_NUMBER === '00' && <LastMovement />}
            </ScrollView>
          </SafeArea>
        </>
      ) : (
        <>
          <PopupWhatsapp
            visible={showModalError}
            title={showModalTextError}
            onClose={closeModaError}
          />
        </>
      )}
    </>
  );
};

export default CreditMovement;
