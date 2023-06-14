import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions
} from '@react-navigation/bottom-tabs';
import { styles } from './index.stylesheet';
import { NAV } from '../../../application/common/namesNav';
import LinearGradient from 'react-native-linear-gradient';
import { testProps } from '../../../application/utils/accessibleId';

interface PropsButtonTab {
  index: number;
  label: string;
  options: BottomTabNavigationOptions;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  testID: string;
}

interface Props extends BottomTabBarProps {
  showMenu?: () => void;
  nameEvent?: string;
}

export const TabBarNavigation = ({ state, descriptors, navigation }: Props) => {
  const tabOffsetValue = React.useRef(new Animated.Value(0)).current;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  function getWidth() {
    let width = Dimensions.get('window').width;
    return width / 5 - 40;
  }

  const lineAnimation = (index: number, coordX: number, width: number) => {
    Animated.spring(tabOffsetValue, {
      toValue: index === 2 ? coordX + width / 4 : coordX,
      useNativeDriver: true
    }).start();
  };

  const ButtonTab = (props: PropsButtonTab) => {
    const {
      index,
      options,
      isFocused,
      onPress,
      onLongPress,
      label,
      testID = ''
    } = props;
    const [layout, setLayout] = useState();

    useEffect(() => {
      if (isFocused && layout) {
        lineAnimation(index, layout?.x ?? 0, layout?.width ?? 0);
      }
    }, [isFocused, layout, index]);

    return (
      <TouchableOpacity
        accessible
        {...testProps(`${testID}`)}
        accessibilityState={isFocused ? { selected: true } : {}}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.tab__button,
          index === 2
            ? {
                flexGrow: 2
              }
            : null
        ]}
        onLayout={({ nativeEvent }) => {
          setLayout(nativeEvent.layout);
        }}>
        {options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused
          })}
        <Text
          style={[
            styles.tab__button__text,
            isFocused && styles.tab__button__text_active
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tab__container}>
      <Animated.View
        style={[
          styles.tab__button__line,
          {
            transform: [{ translateX: tabOffsetValue }],
            width: getWidth()
          }
        ]}
      />
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.03)',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.1)'
        ]}
        style={styles.tab__shadow}
      />
      <View style={styles.tab__bar} accessible>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          let label: any = route.name;
          if (options.tabBarLabel !== undefined) label = options.tabBarLabel;
          else if (options.title !== undefined) label = options.title;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              const current = state.routes[index];
              if (current.name === 'Cuenta') {
                navigation.navigate(NAV.AUTH_NAVIGATION);
              }
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          return (
            <ButtonTab
              testID={`tab${index}`}
              key={index}
              index={index}
              label={label}
              options={options}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};
