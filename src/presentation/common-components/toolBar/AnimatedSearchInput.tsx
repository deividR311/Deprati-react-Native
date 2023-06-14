import React, { useRef, useLayoutEffect } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { SearchInput } from '../search-input';

interface Props {
  collapse: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  contiainerStyle?: StyleProp<ViewStyle>;
}

const AnimatedSearchInput = (props: Props) => {
  const { collapse = true, inputStyle, contiainerStyle } = props;
  const HiddenInOutRef = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    Animated.timing(HiddenInOutRef, {
      toValue: collapse ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [HiddenInOutRef, collapse]);

  return (
    <Animated.View
      style={[
        {
          height: HiddenInOutRef.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 60]
          })
        },
        contiainerStyle
      ]}>
      <SearchInput />
    </Animated.View>
  );
};

export default AnimatedSearchInput;
