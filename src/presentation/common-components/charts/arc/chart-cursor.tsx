import React, { FC, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State
} from 'react-native-gesture-handler';
import { COLORS } from '../../../../application/common';
import { atan2, resolveNewValue } from './chart-math-utils';

export const Cursor: FC<CursorProps> = props => {
  const {
    radius,
    alpha,
    area,
    maxValue,
    beta,
    onChangeValue,
    minValue = 0
  } = props;

  const initialX = Math.cos(alpha) * radius + radius;
  const initialY = Math.sin(alpha) * radius * -1 + radius;

  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [offsetX, setOffsetX] = useState(initialX);
  const [offsetY, setOffsetY] = useState(initialY);
  const translateX = React.useRef(new Animated.Value(initialX)).current;
  const translateY = React.useRef(new Animated.Value(initialY)).current;

  const saveDisplacementCords = (
    state: State,
    translationX: number,
    translationY: number
  ) => {
    if (state === State.ACTIVE) {
      setX(offsetX + translationX);
      setY(offsetY + translationY);
    }
    if (state === State.END) {
      setOffsetX(x);
      setOffsetY(y);
    }
  };

  const moveCursor = (angle: number) => {
    const _translateX = radius * Math.cos(angle) + radius;
    const _translateY = radius * Math.sin(angle) * -1 + radius;
    translateX.setValue(_translateX);
    translateY.setValue(_translateY);
  };

  const onGestureEvent = (
    _event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    let { translationX, translationY, state } = _event.nativeEvent;
    const _x = offsetX + translationX;
    const _y = offsetY + translationY;
    let _animatedAlpha = atan2(_y * -1 + radius, _x - radius);

    let newValue = resolveNewValue(_animatedAlpha, beta, maxValue);

    if (newValue >= maxValue) newValue = maxValue;
    if (newValue <= minValue) newValue = minValue;

    if (newValue <= minValue || newValue >= maxValue) {
      setX(initialX);
      setY(initialY);
      setOffsetX(initialX);
      setOffsetY(initialY);
      _animatedAlpha = atan2(initialY * -1 + radius, initialX - radius);
      translationX = 0;
      translationY = 0;
    }

    moveCursor(_animatedAlpha);
    saveDisplacementCords(state, translationX, translationY);
    onChangeValue(newValue);
  };

  return (
    <GestureHandlerRootView
      style={[
        styles.gestureContainer,
        {
          width: area,
          height: area
        }
      ]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }, { translateX }]
            }
          ]}
        />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    position: 'absolute'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    width: 39,
    height: 39,
    borderRadius: 19,
    borderWidth: 5,
    marginLeft: -11,
    marginTop: -11,
    borderColor: COLORS.GRAYBRAND,
    backgroundColor: COLORS.BRAND,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
});
interface CursorProps {
  radius: number;
  alpha: number;
  maxValue: number;
  minValue?: number;
  area: number;
  beta: number;
  onChangeValue: (value: number) => void;
}
export default Cursor;
