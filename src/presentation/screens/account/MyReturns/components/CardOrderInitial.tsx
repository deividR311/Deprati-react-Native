import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../../../../../application/common/colors';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { Return } from '../../../../../infrastucture/apis/myReturns/myReturns.type';
import { AllTypesCard, MapStatesCard } from '../utils/utilsReturnClaim';
import { styles } from './stylesOrdersReturn';
import { STATUS_RETURN } from '../interfaces/IMyReturnsDetail.interface';

interface CardOrderInitialProps {
  typeCard: AllTypesCard;
  code: string;
  reasonOrItem: number | string;
  stateOrder: string;
  onGoDetails(): void;
  onSolicitReturn?(code: string): void;
}
export default function CardOrderInitial({
  typeCard,
  code,
  reasonOrItem,
  stateOrder,
  onGoDetails
}: CardOrderInitialProps) {
  const handleGetStatesCard = () => MapStatesCard.get(typeCard);

  const statusShow = STATUS_RETURN[stateOrder ?? ''];

  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onGoDetails}>
        <View style={styles.viewCard__content}>
          <View style={styles.viewCard__content_info}>
            <View style={styles.viewCard__content_info_view}>
              <Text style={styles.containerTitle}>No. Pedido: #{code}</Text>

              <Text style={styles.subtitle}>
                {handleGetStatesCard()?.reasonOrItem} {reasonOrItem}
              </Text>
              <Text style={styles.subtitle}>Estado: {statusShow}</Text>
            </View>
          </View>

          <View style={styles.viewCard__content_arrow}>
            <Icon name="arrow-forward-ios" size={15} color={COLORS.DARK70} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
