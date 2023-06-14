import React from 'react';
import { Text, View } from 'react-native';
import { CreditInformationChartProps } from './interface';
import { Styles } from './credit-information-chart.stylesheet';
import { DonutChart } from './donut-chart';
import { FontStyles } from '../../../application/common/fonts';
import { capitalize } from '../../../application/utils';

export const CreditInformationChart: React.FC<
  CreditInformationChartProps
> = props => {
  const {
    constentChart,
    ownerFullname = '',
    numeroTarjetaAdicionalDisplay = '',
    affiliateDate = '',
    totalAmount = 1,
    amountSpent = 0,
    availableAmount = 0,
    showAffiliateDate = true,
    showDisplayCard = true,
    displayCartType = 'small',
    invertValues = false,
    wrapperChartInCard = false
  } = props;

  return (
    <View style={Styles.container}>
      <View
        style={[
          Styles.textContainer,
          displayCartType === 'large' ? Styles.largeContainerCard : undefined
        ]}>
        {showDisplayCard && displayCartType === 'small' && (
          <View style={Styles.leftTextContainer}>
            <Text style={[FontStyles.Caption]}>{ownerFullname}</Text>
            <Text style={[FontStyles.Caption]}>
              {numeroTarjetaAdicionalDisplay}
            </Text>
          </View>
        )}
        {showAffiliateDate && displayCartType === 'small' && (
          <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
            Cliente desde {affiliateDate}
          </Text>
        )}
        {showDisplayCard && displayCartType === 'large' && (
          <View style={[Styles.leftTextContainerLarge]}>
            <Text style={Styles.largeTitle}>Datos del cliente</Text>
            <View style={Styles.tableRow}>
              <Text style={[Styles.cellCaption]}>Nombre:</Text>
              <Text numberOfLines={1} style={[Styles.cellValue]}>
                {ownerFullname
                  ?.split(' ')
                  .map(n => capitalize(n, false))
                  .join(' ')}
              </Text>
            </View>
            <View style={Styles.tableRow}>
              <Text style={[Styles.cellCaption]}>Código del cliente:</Text>
              <Text style={[Styles.cellValue]}>
                {numeroTarjetaAdicionalDisplay}
              </Text>
            </View>
            <View style={Styles.tableRow}>
              <Text style={[Styles.cellCaption]}>Cliente desde:</Text>
              <Text style={[Styles.cellValue]}>{affiliateDate}</Text>
            </View>
          </View>
        )}
      </View>
      <View
        style={[
          Styles.chartContainer,
          wrapperChartInCard ? Styles.wrapperChartInCard : undefined
        ]}>
        <View style={Styles.graphicContainer}>
          <DonutChart
            invertValues={invertValues}
            radius={107}
            maxIndicatorValue={totalAmount}
            indicatorValue={amountSpent}
          />
        </View>
        <View>
          {!invertValues && (
            <>
              <Text
                style={[
                  FontStyles.Body_2,
                  FontStyles.MutedColor,
                  FontStyles.Center
                ]}>
                Cupo utilizado
              </Text>
              <Text
                style={[
                  FontStyles.H1_Headline,
                  FontStyles.PrimaryColor,
                  { marginBottom: 8 }
                ]}>
                ${constentChart?.amountSpent ?? '0,00'}
              </Text>
            </>
          )}

          <Text
            style={[
              FontStyles.Body_2,
              invertValues ? FontStyles.Bold : undefined,
              invertValues ? FontStyles.DarkColor : FontStyles.MutedColor,
              FontStyles.Center,
              invertValues ? { marginTop: 8 } : undefined
            ]}>
            Cupo disponible
          </Text>
          <Text
            style={[
              invertValues ? FontStyles.H1_Headline : FontStyles.Body_2,
              FontStyles.Center,
              { marginBottom: 6 }
            ]}>
            ${constentChart?.availableAmount ?? '0,00'}
          </Text>

          {invertValues && (
            <>
              <Text
                style={[
                  FontStyles.Body_2,
                  FontStyles.MutedColor,
                  FontStyles.Center
                ]}>
                Cupo utilizado
              </Text>
              <Text style={[FontStyles.Body_2, FontStyles.Center]}>
                ${constentChart?.amountSpent ?? '0,00'}
              </Text>
            </>
          )}

          <Text
            style={[
              FontStyles.Body_2,
              FontStyles.MutedColor,
              FontStyles.Center
            ]}>
            Cupo autorizado
          </Text>
          <Text style={[FontStyles.Body_2, FontStyles.Center]}>
            ${constentChart?.totalAmount ?? '0,00'}
          </Text>
        </View>
      </View>
    </View>
  );
};
