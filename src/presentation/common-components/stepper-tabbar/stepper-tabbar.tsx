import React, { useEffect } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native';
import { StepperTabBarNavigationProps } from './interface';
import { ArrowButtonTab } from './items';
import { Styles } from './stepper-tabbar.stylesheet';
import { COLORS } from '../../../application/common/colors';
import { FontStyles } from '../../../application/common/fonts';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const StepperTabBarNavigation = (
  props: StepperTabBarNavigationProps
) => {
  const {
    state,
    navigation,
    descriptors,
    title,
    subtitle,
    onBackFromTabbar,
    onNextFromTabbar,
    showButtomsWhenZero
  } = props;

  const getSteps = (): string => {
    if (subtitle) return subtitle;
    const text = 'Paso #step# de #total#';
    const total = state.routes.length;
    const step = state.index + 1;
    return text
      .replace('#step#', step.toString())
      .replace('#total#', total.toString());
  };

  const isFocused = (index: number): boolean => index === state.index;
  const canShowNavButtons = (): boolean =>
    showButtomsWhenZero ? state.index > 0 : false;

  const onLongPress = () => {
    const target = state.routes[state.index].key;
    navigation.emit({
      type: 'tabLongPress',
      target
    });
  };

  const onBackPress = () => {
    if (onBackFromTabbar) {
      onBackFromTabbar(state);
      return;
    }
    if (state.index === 0) return;
    const previousRoute = state.routes[state.index - 1];
    const target = state.routes[state.index + 1].key;
    navigation.emit({
      type: 'tabPress',
      canPreventDefault: true,
      target
    });
    navigation.navigate(previousRoute.name, { target });
  };

  const onNextPress = () => {
    if (onNextFromTabbar) {
      onNextFromTabbar(state);
      return;
    }
    if (state.index === state.routes.length - 1) return;
    const target = state.routes[state.index + 1].key;
    const routName = state.routes[state.index + 1].name;
    navigation.emit({
      type: 'tabPress',
      canPreventDefault: true,
      target
    });
    navigation.navigate(routName, { target });
  };

  return (
    <View style={Styles.tab__container}>
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.03)',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.1)'
        ]}
        style={Styles.tab__shadow}
      />

      <View style={Styles.tab__bar}>
        {canShowNavButtons() && (
          <ArrowButtonTab
            arrowIconDirection="left"
            options={{}}
            onPress={onBackPress}
            onLongPress={onLongPress}
          />
        )}

        <View style={Styles.tab__stepper__container}>
          <Text style={FontStyles.Body_1}>
            {title ||
              descriptors[state.index].options.tabBarLabel ||
              descriptors[state.index].options.title}
          </Text>
          <Text style={FontStyles.ProductDescription}>{getSteps()}</Text>
          <View style={Styles.tab__stepper__indicator_container}>
            {state.routes.map((_, index) => (
              <View
                key={index}
                style={[
                  Styles.tab__stepper__indicator_line,
                  isFocused(index)
                    ? Styles.tab__stepper__indicator_line_onfocus
                    : Styles.tab__stepper__indicator_onblur
                ]}
              />
            ))}
          </View>
        </View>

        {canShowNavButtons() && (
          <ArrowButtonTab
            arrowIconDirection="right"
            onPress={onNextPress}
            onLongPress={onLongPress}
          />
        )}
      </View>
    </View>
  );
};
