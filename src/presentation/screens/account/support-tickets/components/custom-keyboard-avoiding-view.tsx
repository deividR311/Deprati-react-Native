import React, { FC, useEffect, useRef } from 'react';
import { Animated, Keyboard } from 'react-native';
export const CustomKeyboardAvoidingView: FC<
  KeyboardAvoidingViewProps
> = props => {
  const heightValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardEventToShow = Keyboard.addListener('keyboardDidShow', _ => {
      Animated.timing(heightValue, {
        toValue: _.endCoordinates.height + (props.offset ?? 0),
        duration: _.duration,
        useNativeDriver: false
      }).start(state => {
        if (state.finished) {
          props.onKeyboardChangeState?.(_.endCoordinates.height);
        }
      });
    });

    const keyboardEventToHide = Keyboard.addListener('keyboardWillHide', _ => {
      Animated.timing(heightValue, {
        toValue: 0,
        duration: _.duration,
        useNativeDriver: false
      }).start(state => {
        if (state.finished) {
          props.onKeyboardChangeState?.(0);
        }
      });
    });

    return () => {
      keyboardEventToShow.remove();
      keyboardEventToHide.remove();
    };
  }, []);

  return (
    <>
      {props.children}
      {!props.disable && <Animated.View style={[{ height: heightValue }]} />}
    </>
  );
};

export interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
  onKeyboardChangeState?: (height: number) => void;
  offset?: number;
  disable?: boolean;
}
