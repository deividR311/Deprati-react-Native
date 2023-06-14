import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';

import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { MainButton } from '../../../../common-components/buttons/Button';
import { AllTypesCard, MapStatesCard } from '../utils/utilsReturnClaim';
import { styles } from './stylesOrdersReturn';

interface CardOrderReturnClaimProps {
  date: Date;
  code: string;
  reasonOrItem: number | string;
  price: string;
  stateOrder: string;
  onSolicit(): void;
  typeCard: AllTypesCard;
}
export default function CardOrderReturnClaim({
  typeCard,
  date,
  code,
  reasonOrItem,
  price,
  stateOrder,
  onSolicit
}: CardOrderReturnClaimProps) {
  const handleGetStatesCard = () => MapStatesCard.get(typeCard);
  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <View style={styles.viewCard__contentSel}>
        <View style={styles.viewCard__content_info}>
          <View style={styles.viewCard__content_info_view}>
            <Text style={styles.containerTitle}>No. Pedido: #{code}</Text>

            <Text style={styles.subtitle}>
              Fecha: {moment(date).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.subtitle}>Estado de pago: {stateOrder}</Text>
            <Text style={styles.subtitle}>Artículos: {reasonOrItem}</Text>
            <Text style={styles.subtitle}>Total: {price}</Text>
          </View>
        </View>
      </View>

      <MainButton
        style={styles.buttonDetails}
        styleText={styles.textSolicit}
        title={handleGetStatesCard()?.titleButton ?? ''}
        onPress={() => onSolicit()}
      />
    </View>
  );
}
