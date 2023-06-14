//libs
import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

//components
import { FontStyles } from '../../../../../application/common/fonts';
import { MainButton } from '../../../../common-components/buttons/Button';
import { SkeletonMyReturnDetail } from '../SkeletonReturns/SkeletonMyReturnDetail';

//hook
import { useMyReturnsDetail } from '../hooks/useMyReturnsDetail.hook';

//styles
import { stylesReturnDetail as styles } from './stylesMyReturns';

//utils
import { IMyReturnsDetailProps } from '../interfaces/IMyReturnsDetail.interface';
import { handleIsSingular, handleStatus } from '../utils/utilsReturnClaim';

const TEXT_TICKET = 'Ticket';
const TEXT_ORDER = 'Pedido';
const TEXT_STATE = 'Estado';

export const MyReturnsDetailScreen: React.FC<IMyReturnsDetailProps> = ({
  route
}) => {
  const { returnCode } = route.params;
  const {
    getDetailReturn,
    dataDetailReturn: returnDetail,
    isLoadingDetailReturn,
    isErrorDetailReturn,
    handleToAccept
  } = useMyReturnsDetail();

  useFocusEffect(
    useCallback(() => {
      getDetailReturn(returnCode);
    }, [])
  );

  const itemsReturn: number = useMemo(() => {
    if (returnDetail?.returnEntries?.length > 0) {
      return (
        returnDetail?.returnEntries?.reduce((total, current) => {
          total += current?.expectedQuantity ?? 0;
          return total;
        }, 0) ?? 0
      );
    }
    return 0;
  }, [returnDetail?.returnEntries]);

  if (isLoadingDetailReturn || !returnDetail) return <SkeletonMyReturnDetail />;
  return (
    <>
      <FlatList
        style={{ flex: 1, marginBottom: 100 }}
        contentContainerStyle={{ flex: 1 }}
        ListFooterComponentStyle={{ flex: 1 }}
        data={returnDetail?.returnEntries ?? []}
        ListHeaderComponent={() => (
          <>
            <View style={styles.sectionUp}>
              <Text style={FontStyles.Body_1}>{TEXT_TICKET}</Text>
              <Text style={styles.text}>{`#${returnDetail.code}`}</Text>
              <Text style={[FontStyles.Body_1, styles.order]}>
                {`${TEXT_ORDER} #${returnDetail.order.code}`}
              </Text>
              <Text style={[FontStyles.Body_1, styles.textOrder]}>
                {`Fecha del pedido: ${moment(returnDetail.order.created).format(
                  'DD MMMM YYYY'
                )}`}
              </Text>
              <Text style={[FontStyles.Body_1, styles.textOrder]}>
                {`Cantidad: ${handleIsSingular(itemsReturn)}`}
              </Text>
              <Text style={[FontStyles.Body_1, styles.textOrder]}>
                {`Monto: ${returnDetail.order.totalPriceWithTax.formattedValue}`}
              </Text>
              <View style={styles.line} />
              <Text style={[FontStyles.Body_1, styles.textState]}>
                {TEXT_STATE}
              </Text>
              <Text style={styles.text}>
                {handleStatus(returnDetail?.status)}
              </Text>
              <View style={styles.line} />
              {returnDetail?.comments && (
                <>
                  <Text style={[FontStyles.Body_1, styles.textState]}>
                    Comentario De Prati
                  </Text>
                  {returnDetail?.comments?.map((comment, index) => (
                    <Text
                      key={index}
                      style={[FontStyles.Caption, FontStyles.MutedColor]}>
                      {comment?.text}
                    </Text>
                  ))}
                  <View style={styles.line} />
                </>
              )}
            </View>
            <View style={styles.line} />
            <View style={[styles.table]}>
              <View style={styles.headTable}>
                <View style={[styles.columnHeadLeft, styles.widthLeft]}>
                  <Text style={styles.headTitle}>{'Código'}</Text>
                </View>
                <View style={[styles.columnHeadCenter, styles.widthCenter]}>
                  <Text style={styles.headTitle}>{'Descripción'}</Text>
                </View>
                <View style={[styles.columnHeadRight, styles.widthRight]}>
                  <Text style={styles.headTitle}>{'Cantidad'}</Text>
                </View>
              </View>
            </View>
          </>
        )}
        renderItem={({ item: x, index }) => (
          <View key={`ReturnDetail-${index}`} style={styles.fileTable}>
            <View style={[styles.columnLeft, styles.centerY, styles.widthLeft]}>
              <Text style={styles.textRow}>{x.orderEntry.product.ean}</Text>
            </View>
            <View
              style={[styles.columnCenter, styles.centerY, styles.widthCenter]}>
              <Text style={styles.textRow}>{x.orderEntry.product.name}</Text>
            </View>
            <View
              style={[styles.columnRight, styles.centerY, styles.widthRight]}>
              <Text style={styles.textRow}>{x.expectedQuantity ?? 0}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end'
            }}>
            <MainButton
              style={styles.button}
              styleText={styles.textButton}
              title="ACEPTAR"
              onPress={handleToAccept}
            />
          </View>
        )}
      />
    </>
  );
};

export default MyReturnsDetailScreen;
