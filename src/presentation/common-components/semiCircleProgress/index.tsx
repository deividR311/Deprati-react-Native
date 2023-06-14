import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';

interface Iprops {
  progressShadowColor: string;
  progressColor: string;
  interiorCircleColor?: string;
  circleRadius?: number;
  progressWidth: number;
  percentage: number;
  exteriorCircleStyle?: ViewStyle;
  interiorCircleStyle?: ViewStyle;
  animationSpeed?: number;
  initialPercentage: number;
  minValue?: number;
  maxValue?: number;
  borderRadius?: number;
  currentValue?: number;
  children?: JSX.Element;
}

export default function SemiCircleProgress({
  progressShadowColor = 'silver',
  progressColor = 'steelblue',
  interiorCircleColor = 'white',
  circleRadius = 100,
  progressWidth = 10,
  animationSpeed = 2,
  initialPercentage = 0,
  percentage,
  minValue,
  maxValue,
  borderRadius = 10,
  currentValue,
  exteriorCircleStyle,
  children
}: Iprops) {
  const [rotationAnimation, setrotationAnimation] = useState(
    new Animated.Value(initialPercentage)
  );

  useEffect(() => {
    animate();
  }, [percentage]);

  const getStyles = () => {
    const interiorCircleRadius = circleRadius - progressWidth;

    return StyleSheet.create({
      exteriorCircle: {
        width: circleRadius * 2,
        height: circleRadius + 30,
        borderRadius: circleRadius,
        backgroundColor: progressShadowColor
      },
      rotatingCircleWrap: {
        width: circleRadius * 2,
        height: circleRadius + 30,
        top: circleRadius,
        borderRadius: borderRadius
      },
      rotatingCircle: {
        width: circleRadius * 2,
        height: circleRadius,
        borderTopRightRadius: 100,
        borderBottomEndRadius: 100,
        backgroundColor: progressColor,
        transform: [
          { translateY: -circleRadius / 2 },
          {
            rotate: rotationAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0deg', '180deg']
            })
          },
          { translateY: circleRadius / 2 }
        ]
      },
      interiorCircle: {
        width: interiorCircleRadius * 2,
        height: interiorCircleRadius + 30,
        borderRadius: interiorCircleRadius,
        backgroundColor: interiorCircleColor,
        top: progressWidth
      }
    });
  };
  const getPercentage = () => {
    if (percentage) return Math.max(Math.min(percentage, 100), 0);

    if (currentValue && minValue && maxValue) {
      const newPercent =
        ((currentValue - minValue) / (maxValue - minValue)) * 100;
      return Math.max(Math.min(newPercent, 100), 0);
    }

    return 0;
  };
  const animate = () => {
    const toValue = getPercentage();
    const speed = animationSpeed;

    Animated.spring(rotationAnimation, {
      toValue,
      speed,
      useNativeDriver: true
    }).start();
  };

  const styles = getStyles();
  return (
    <View
      style={[
        defaultStyles.exteriorCircle,
        styles.exteriorCircle,
        exteriorCircleStyle
      ]}>
      <View
        style={[defaultStyles.rotatingCircleWrap, styles.rotatingCircleWrap]}>
        <Animated.View
          style={[defaultStyles.rotatingCircle, styles.rotatingCircle]}
        />
      </View>
      <View
        style={[
          defaultStyles.interiorCircle,
          styles.interiorCircle,
          exteriorCircleStyle
        ]}>
        {children}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  rotatingCircleWrap: {
    position: 'absolute',
    left: 0
  },
  rotatingCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  interiorCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});
