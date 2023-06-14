import React, { useMemo } from 'react';
import { COLORS, SIZE_ICON_TAB } from '../../../application/common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Badge } from '../badge';
import InicioTab from '../../../../assets/icons/Tab/InicioTab';
import { LABEL_TAB } from '../../../application/utils';
import { StyleSheet } from 'react-native';
interface IconTabProps {
  nameIcon: string;
  focused: boolean;
  score?: number;
}

const TabIcon = ({ nameIcon, focused, score = 0 }: IconTabProps) => {
  const colorF = useMemo(() => {
    if (focused) return COLORS.BRAND;
    return COLORS.DARK70;
  }, [focused]);

  if (nameIcon === LABEL_TAB.HOME)
    return (
      <>
        <InicioTab size={SIZE_ICON_TAB} color={colorF} />
      </>
    );
  if (nameIcon === LABEL_TAB.FAVORITES)
    return (
      <>
        <Badge score={score} style={styles.badgeTab} />
        <Icon name={'favorite-border'} size={SIZE_ICON_TAB} color={colorF} />
      </>
    );
  if (nameIcon === LABEL_TAB.CONTACTLESSPAYMENT)
    return (
      <>
        <Icon name="qr-code-2" size={SIZE_ICON_TAB} color={colorF} />
      </>
    );
  if (nameIcon === LABEL_TAB.CREDIT)
    return (
      <>
        <Icon name="payment" size={SIZE_ICON_TAB} color={colorF} />
      </>
    );
  return (
    <>
      <Badge score={score} style={styles.badgeTab} />
      <Icon name="person-outline" size={SIZE_ICON_TAB} color={colorF} />
    </>
  );
};

export const styles = StyleSheet.create({
  badgeTab: {
    right: 8
  }
});

export default TabIcon;
