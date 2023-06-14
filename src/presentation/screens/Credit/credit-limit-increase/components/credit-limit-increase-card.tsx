import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontStyles } from '../../../../../application/common';
import { currencyFormatter } from '../../../../../application/utils/currency';
import { ChartIncreaseCreditLimit } from '../../../../common-components/charts/increase-credit-limit';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';
import { t } from 'i18next';
export const CreditLimitIncreaseCard: FC<
  CreditLimitIncreaseCardProps
> = props => {
  return (
    <View style={Styles.card}>
      <Text style={Styles.text}>
        {t('currentSpace')}
        <Text style={[FontStyles.H1_Headline]}>{` ${currencyFormatter(
          props.currentCreditLimit
        )}`}</Text>
      </Text>
      <Text style={Styles.text}>
        {t('maximunSpacePermmited')}
        <Text
          style={[
            FontStyles.H1_Headline,
            FontStyles.PrimaryColor
          ]}>{` ${currencyFormatter(props.maxCreditLimit)}`}</Text>
      </Text>
      <View style={Styles.chart}>
        <ChartIncreaseCreditLimit
          step={50}
          value={props.currentCreditLimit}
          maxValue={props.maxCreditLimit}
          rectangularSize={232}
          holdInValue={props.holdInCurrentCreditLimit}
          onChangeCreditLimit={props.onChangeCreditLimit}
        />
      </View>
      <Text
        style={[FontStyles.Caption, FontStyles.MutedColor, FontStyles.Bold]}>
        {t('selectDesireSpace')}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: 0.44,
    fontWeight: fontWeightOS('400'),
    fontFamily: fontFamilyOS('Regular'),
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  chart: {
    height: 160,
    width: 246,
    padding: 14,
    marginTop: 50,
    marginBottom: 20
  }
});

interface CreditLimitIncreaseCardProps {
  currentCreditLimit: number;
  maxCreditLimit: number;
  holdInCurrentCreditLimit?: boolean;
  onChangeCreditLimit?: (value: number) => void;
}
