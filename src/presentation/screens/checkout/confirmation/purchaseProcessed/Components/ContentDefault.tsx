import React from 'react';
import { StyleSheet, Text } from 'react-native';
import RenderHTML from '../../../../../common-components/renderHtml/RenderHTML';
import { FontStyles } from '../../../../../../application/common';
import layout from '../../../../../../application/common/layout';
import { ContentDefaultProps, handleSourceHtml } from '../utils/utilsPurcharse';

const TEXT_CARD_SUP =
  'Recibirás un mail a tu correo electrónico, con la información de tu compra.\n\n También puedes consultar tu orden de compra en ver detalles de mi pedido';

const TEXT_CARD_INF =
  '\n\n¡Sigue disfrutando lo mejor en Moda, Hogar y Tecnología que tenemos en nuestra App De Prati!';

const width = layout.window.width;

export function ContentDefault({
  typePurchase,
  orderConfirmation: order,
  isGiftCardCart
}: ContentDefaultProps) {
  if (order) {
    if (isGiftCardCart)
      return (
        <RenderHTML
          contentWidth={width}
          text={handleSourceHtml(order.orderConfirmationTextGC)}
          tagsStyles={styles}
        />
      );
    return (
      <RenderHTML
        contentWidth={width}
        text={handleSourceHtml(order.orderConfirmationText)}
        tagsStyles={styles}
      />
    );
  }
  return (
    <Text style={[FontStyles.Body_2, FontStyles.Center]}>
      {TEXT_CARD_SUP} {TEXT_CARD_INF}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 8,
    textAlign: 'center'
  },
  h1: {
    ...FontStyles.H3_Headline,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center'
  },
  p: {
    ...FontStyles.Body_1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 8
  },
  b: {
    ...FontStyles.Body_2,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
