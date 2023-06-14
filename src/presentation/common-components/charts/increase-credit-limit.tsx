import React, { FC } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { COLORS, FontStyles } from '../../../application/common';
import { currencyFormatter } from '../../../application/utils/currency';
import AnimatedCursor from './arc/chart-cursor';
import {
  fromValueToPercentage,
  fromPercentageToRad,
  fromRadToProgress,
  getLargeArcValue
} from './arc/chart-math-utils';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';
import { t } from 'i18next';

const AnimatedArc = Animated.createAnimatedComponent(Path);

export const ChartIncreaseCreditLimit: FC<ChartIncreaseCreditLimitProps> = ({
  rectangularSize,
  value,
  maxValue,
  holdInValue = false,
  step = 1,
  onChangeCreditLimit
}) => {
  const STROKE_WIDTH = 16;
  const { PI, cos, sin } = Math;
  const r = (rectangularSize - STROKE_WIDTH) / 2;
  const cx = rectangularSize / 2;
  const cy = rectangularSize / 2;
  const A = PI + PI * 0.4;
  const circumference = r * A;

  const [progress, setProgress] = React.useState(value);
  const [progressToShow, setProgressToShow] = React.useState(value);

  // Calculamos los radianes que va a ocupar arco con su correspondiente desplazamiento

  const indicatorViewPercentage = fromValueToPercentage(progress, maxValue);
  const indicatorViewRadians = fromPercentageToRad(indicatorViewPercentage);
  const indicatiorViewConvertion = fromRadToProgress(indicatorViewRadians, 0);

  const angle = PI - indicatorViewRadians + Math.PI * 0.2;

  // Container Available Value props
  const availableValueProps = {
    startAngle: PI + PI * 0.2,
    endAngle: 2 * PI - PI * 0.2,
    get x1() {
      return cx - r * cos(this.startAngle);
    },
    get y1() {
      return -r * sin(this.startAngle) + cy;
    },
    get x2() {
      return cx - r * cos(this.endAngle);
    },
    get y2() {
      return -r * sin(this.endAngle) + cy;
    }
  };

  // Adelantados arc props
  const indicatorViewProps = {
    startAngle: indicatiorViewConvertion,
    endAngle: 2 * PI - PI * 0.2,
    get x1() {
      return cx - r * cos(this.startAngle);
    },
    get y1() {
      return -r * sin(this.startAngle) + cy;
    },
    get x2() {
      return cx - r * cos(this.endAngle);
    },
    get y2() {
      return -r * sin(this.endAngle) + cy;
    }
  };

  // Large arc (>180)? 0 = NO | 1 = YES
  // Si beta es negativo, le sumamos 2PI a el valor de advance en radianes para conseguir la equivalencia positiva
  const laAd = getLargeArcValue(
    indicatorViewProps.endAngle,
    angle < 0 ? 2 * PI + indicatorViewRadians : indicatiorViewConvertion,
    true,
    angle
  );

  const pathAvailableValue = `M ${availableValueProps.x1} ${availableValueProps.y1} A ${r} ${r} 0 1 0 ${availableValueProps.x2} ${availableValueProps.y2}`;
  const pathIndicatorView = `M ${indicatorViewProps.x1} ${indicatorViewProps.y1} A ${r} ${r} 0 ${laAd} 0 ${indicatorViewProps.x2} ${indicatorViewProps.y2}`;

  const _onChangeValue = (newValue: number) => {
    let _newValue =
      value >= newValue && holdInValue
        ? value
        : maxValue <= newValue
        ? maxValue
        : newValue;
    setProgress(_newValue);
    setProgressToShow(_newValue - (_newValue % step));
    onChangeCreditLimit?.(_newValue - (_newValue % step));
  };

  return (
    <View style={[styles.container]}>
      {/* Labels */}
      <View style={[styles.textContainer]}>
        <Text
          style={[FontStyles.Body_2, FontStyles.MutedColor, FontStyles.Center]}>
          {t('desiredNewSpace')}
        </Text>
        <View style={styles.space} />
        <Text
          style={[
            FontStyles.PrimaryColor,
            styles.amountText,
            FontStyles.Center
          ]}>
          {currencyFormatter(progressToShow)}
        </Text>
      </View>
      {/* ARCs */}
      <Animated.View
        style={[
          styles.progressView,
          {
            width: rectangularSize,
            height: rectangularSize
          }
        ]}>
        <Svg width={rectangularSize} height={rectangularSize}>
          <AnimatedArc
            stroke={COLORS.GRAYBRAND}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeWidth={STROKE_WIDTH}
            d={pathAvailableValue}
          />
          <AnimatedArc
            stroke={COLORS.BRAND}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeWidth={STROKE_WIDTH}
            d={pathIndicatorView}
          />
        </Svg>
      </Animated.View>
      {/* Cursors */}
      <AnimatedCursor
        minValue={holdInValue ? value : 0}
        radius={r}
        beta={PI + PI * 0.2}
        alpha={angle}
        maxValue={maxValue}
        area={rectangularSize}
        onChangeValue={_onChangeValue}
      />
    </View>
  );
};

interface ChartIncreaseCreditLimitProps {
  rectangularSize: number;
  holdInValue?: boolean;
  value: number;
  maxValue: number;
  step?: number;
  onChangeCreditLimit?: (value: number) => void;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    marginTop: -20
  },
  amountText: {
    fontSize: 30,
    fontWeight: fontWeightOS('500'),
    fontFamily: fontFamilyOS(),
    lineHeight: 40,
    letterSpacing: 0.25,
    textAlign: 'left'
  },
  space: {
    height: 8
  },
  progressView: {
    position: 'absolute'
  }
});
