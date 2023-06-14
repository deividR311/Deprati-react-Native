//Libs
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';
import { MainButton } from '../../../../common-components/buttons/Button';
import { IFooterPreCancel } from '../interfaces/IPreCancelCredit';
import { currencyFormatter } from '../../../../../application/utils/currency';

interface Props {
  onPress(): void;
  valuesFooter: IFooterPreCancel;
  disabled: boolean;
  loading: boolean;
}

export default function FooterPreCancel({
  onPress,
  valuesFooter,
  disabled,
  loading
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentFooter}>
          <Text style={styles.textFooter}>Diferidos seleccionados:</Text>
          <Text style={styles.textFooter}>{valuesFooter.totalSel}</Text>
        </View>
        <View style={styles.contentFooter}>
          <Text style={styles.textFooter}>Total diferidos:</Text>
          <Text style={styles.textFooter}>
            {`${currencyFormatter(valuesFooter.totalDeferred)}`}
          </Text>
        </View>

        <View style={styles.viewButton}>
          <MainButton
            disabled={disabled || loading}
            showActivityIndicator={loading}
            title="CREAR SOLICITUD"
            onPress={onPress}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingBottom: Platform.select({
    //   android: 90,
    //   ios: 90,
    // }),
    paddingBottom: 90,
    bottom: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.GRAYDARK20,
    elevation: 24,
    shadowColor: COLORS.DARK,
    shadowOpacity: 0.8,
    shadowRadius: 6.27,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  content: {
    marginTop: 12
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginVertical: 5
    // backgroundColor: 'cyan',
  },
  textFooter: {
    ...FontStyles.Subtitle,
    textAlign: 'left',
    fontSize: 16
  },
  viewButton: { paddingHorizontal: 25, marginTop: 15 },
  button: { width: '100%' }
});
