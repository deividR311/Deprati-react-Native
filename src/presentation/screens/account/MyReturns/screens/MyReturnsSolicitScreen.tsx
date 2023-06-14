//libs
import React, { useCallback, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import RenderHTML from '../../../../common-components/renderHtml/RenderHTML';

//components
import CardOrderReturnClaim from '../components/CardOrderReturnClaim';
import TemplatePage from '../../../../common-components/template-page';
import NoOrders from '../components/NoOrders';
import Pagination from '../../MyOrders/components/Pagination';
import { FontStyles } from '../../../../../application/common/fonts';
import { SkeletonMyReturnSolicit } from '../SkeletonReturns/SkeletonMyReturnSolicit';
import { SearchInput } from '../components/SearchInput';
import { SupportHeaderCell } from '../../support-tickets/components/ticket-section-header';

//hook
import { useMyReturnsSolicit } from '../hooks/useMyReturnsSolicit.hook';
import usePageContent from '../../../../../infrastucture/apis/contentPage/contentPage.hook';

//styles
import { stylesReturnSolicit as styles, tagsStyles } from './stylesMyReturns';

//utils
import layout from '../../../../../application/common/layout';
import { formatDateOrders } from '../../../../../application/utils/formatDate';
import { IComponentsSolicit } from '../interfaces/IMyReturnsSolicit.interface';

const TITLE = 'Selecciona uno de tus pedidos más recientes';
const SUB_TITLE =
  '*Si no encuentras tu número de pedido, comunícate con servicio al cliente.';
const TEXT_BEFORE =
  'Si no encuentras tu compra en el listado, ingresa el número de pedido aquí.';
const TEXT_AFTER =
  'El número del pedido lo encontraras en la factura de compra o en el correo de confirmación.';

const width = layout.window.width;

export function MyReturnsSolicitScreen() {
  const {
    MAX_ORDER,
    getReturnableOrders,
    isLoadingReturnableOrders,
    isErrorReturnableOrders,
    ordersReturns,
    filteredOrdersMade,
    handleMaxPage,
    prevPage,
    nextPage,
    changePage,
    handleGoEnterReturn,
    padding
  } = useMyReturnsSolicit();

  const {
    loading: loadingContent,
    error: errorContent,
    pageContent,
    getDataContent
  } = usePageContent();

  useFocusEffect(
    useCallback(() => {
      getReturnableOrders();
    }, [])
  );

  useEffect(() => {
    getDataContent({
      pageType: 'ContentPage',
      pageLabelOrId: 'myReturnableOrders'
    });
  }, []);

  const components: IComponentsSolicit = useMemo(() => {
    if (pageContent) {
      return pageContent.components;
    }
    return undefined;
  }, [pageContent]);

  if (!ordersReturns || isLoadingReturnableOrders || loadingContent)
    return <SkeletonMyReturnSolicit />;

  if (ordersReturns && ordersReturns.length === 0) return <NoOrders />;

  return (
    <TemplatePage
      loading={isLoadingReturnableOrders || loadingContent}
      skeleton={<SkeletonMyReturnSolicit />}
      isTab={true}
      error={isErrorReturnableOrders}>
      <KeyboardAvoidingView behavior={'position'}>
        <ScrollView
          style={{ marginBottom: 80 }}
          contentContainerStyle={{ paddingBottom: padding }}>
          {components ? (
            <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
              <RenderHTML
                tagsStyles={tagsStyles}
                contentWidth={width}
                text={
                  components.BottomMyReturnableOrdersParagraphComponent.content
                }
              />
            </View>
          ) : (
            <Text style={[FontStyles.Body_1, styles.title]}>{TITLE}</Text>
          )}
          {/* <Text style={[FontStyles.Body_1, styles.subTitle]}>{SUB_TITLE}</Text> */}
          {filteredOrdersMade().map((x, index) => (
            <View key={`CardOrderReturn-${index}`}>
              {x.month && (
                <SupportHeaderCell title={formatDateOrders(x.placed)} />
              )}
              {!x.month && <Divider style={styles.divider} />}
              <CardOrderReturnClaim
                typeCard="myReturns"
                date={x.placed}
                code={x.code}
                reasonOrItem={x.totalUnitCount}
                price={x.total.formattedValue}
                stateOrder={x.paymentStatusDisplay}
                onSolicit={() => handleGoEnterReturn(x.code)}
              />
            </View>
          ))}
          {ordersReturns.length > MAX_ORDER && (
            <>
              <Pagination
                maxPag={handleMaxPage()}
                onPrev={() => prevPage()}
                onNext={() => nextPage()}
                onPress={x => changePage(x)}
              />
              <Divider style={styles.divider} />
              <View style={{}}>
                <Text style={[FontStyles.Body_1, styles.paragraph]}>
                  {components?.Footer1MyReturnableOrdersParagraphComponent
                    .content ?? TEXT_BEFORE}
                </Text>

                <SearchInput
                  containerStyle={{ marginBottom: 10 }}
                  onSearch={x => handleGoEnterReturn(x)}
                  numeric
                />
                <Text style={[FontStyles.Body_1, styles.paragraph2]}>
                  {components?.Footer2MyReturnableOrdersParagraphComponent
                    .content ?? TEXT_AFTER}
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TemplatePage>
  );
}
