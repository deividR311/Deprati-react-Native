import React from 'react';
import { ListHeaderDetail } from './ListHeaderDetail';

export const ListHeaderComponent = ({
  children
}: {
  children?: string | JSX.Element | null | undefined;
}) => {
  return (
    <ListHeaderDetail
      title="¿Cómo deseas pagar?"
      subtitle="Selecciona la forma de pago"
      headerText="Recomendado"
      bodyText="Otras opciones de pago">
      {children}
    </ListHeaderDetail>
  );
};
