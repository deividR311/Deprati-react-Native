import * as React from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { Easing, Animated, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { DonutChartProps } from './interface';

export const DonutChart: React.FC<DonutChartProps> = ({
  indicatorValue = 0,
  maxIndicatorValue = 100,
  radius = 100,
  color = COLORS.BRAND,
  dialColor = COLORS.GRAYBRAND,
  strokeWidth = 14,
  duration = 500,
  invertValues = false
}) => {
  const chartUtilArea = 3;
  const circunference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const angleToStart = -210;
  const dialArea = circunference / chartUtilArea;

  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef<any>();

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  };

  React.useEffect(() => {
    const _value =
      indicatorValue < 0
        ? 0
        : indicatorValue > maxIndicatorValue
        ? maxIndicatorValue
        : indicatorValue;
    animation(_value / (chartUtilArea / 2));
    animated.addListener(v => {
      const maxPerc = (chartUtilArea * v.value) / maxIndicatorValue;
      const strokeDashoffset =
        circunference - (circunference * maxPerc) / chartUtilArea;
      circleRef.current?.setNativeProps({
        strokeDashoffset
      });
    });

    return () => {
      animated.removeAllListeners();
    };
  }, [maxIndicatorValue, indicatorValue]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        fill="gray"
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G origin={[halfCircle, halfCircle]}>
          {/* DIAL */}
          <Circle
            cx="50%"
            cy="50%"
            origin={[halfCircle, halfCircle]}
            rotation={angleToStart}
            r={radius}
            fill="transparent"
            strokeLinejoin="round"
            stroke={dialColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circunference}
            strokeDashoffset={dialArea}
          />
          {/* INDICATOR */}
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            origin={[halfCircle, halfCircle]}
            rotation={angleToStart}
            r={radius}
            fill="transparent"
            strokeLinejoin="round"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circunference}
            strokeDashoffset={dialArea}
          />
        </G>
      </Svg>
    </View>
  );
};
