import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../application/common/colors';
import { FontStyles } from '../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import {
  SkeletonContentLayoutBuyItem,
  SkeletonContentLayoutBuyTitleItem
} from '../../screens/account/order-details/components/skeleton';
import { BoxProps, RowProps } from './table.interfaces';
import { Styles } from './table.stylesheet';

export const Box: React.FC<BoxProps> = props => {
  const {
    title,
    rows,
    separator = false,
    titleStyle,
    initialRowComponent,
    boxStyle
  } = props;
  const {
    backgroundColor = FontStyles.LightColor,
    fontColor = COLORS.DARK,
    titleColor = FontStyles.DarkColor
  } = boxStyle ?? {};
  return (
    <View
      style={{
        ...boxStyle,
        backgroundColor: backgroundColor as any,
        paddingHorizontal: MARING_HORIZONTAL
      }}>
      {title && (
        <Text style={[FontStyles.Subtitle_1, Styles.row__title, titleStyle]}>
          {title ?? ''}
        </Text>
      )}
      {initialRowComponent ?? null}
      <View style={[Styles.row__container, props?.rowContainerStyle]}>
        {rows.map((row, index) => {
          if (!row || row === null) return null;
          return (
            <Row
              style={row.style}
              title={row.title ?? ''}
              value={row.value ?? ''}
              titleStyle={row.titleStyle}
              valueStyle={row?.valueStyle}
              key={index}
              maxWithRowTitle={row.maxWithRowTitle}
              maxWithRowValue={row.maxWithRowValue}
              fontColor={row.fontColor ?? fontColor}
              fontValueColor={row.fontValueColor ?? row.fontColor ?? fontColor}
              semicolom={row.semicolom}
              size={row.size}
              onPress={row.onPress}
              valueComponent={row.valueComponent}
            />
          );
        })}
      </View>
      {separator && <View style={[Styles.row__separator]} />}
    </View>
  );
};

export const Row: React.FC<RowProps> = ({
  title,
  value,
  semicolom = true,
  fontColor = COLORS.DARK,
  fontValueColor,
  size = 'small',
  maxWithRowValue = '60%',
  maxWithRowTitle = '100%',
  style,
  titleStyle,
  valueStyle,
  valueComponent: ValueComponent,
  onPress = undefined
}) => {
  const getFontSize = (size: 'small' | 'medium' | 'large' | 'asLink') => {
    switch (size) {
      case 'medium':
        return FontStyles.Body_1;
      case 'large':
        return FontStyles.H3_Headline;
      case 'asLink':
        return FontStyles.Link;
      default:
        return FontStyles.Regular;
    }
  };
  return (
    <View style={[Styles.row, style]}>
      <TouchableOpacity disabled={!onPress} onPress={onPress}>
        <Text
          style={[
            getFontSize(size),
            {
              color: size === 'asLink' ? FontStyles.Link.color : fontColor,
              maxWidth: maxWithRowTitle
            },
            titleStyle
          ]}>
          {title ?? ''}
          {semicolom ? ':' : ''}
        </Text>
      </TouchableOpacity>
      {ValueComponent ? (
        ValueComponent
      ) : (
        <Text
          style={[
            getFontSize(size),
            { color: fontValueColor ?? fontColor },
            Styles.row__value,
            { maxWidth: maxWithRowValue },
            valueStyle
          ]}>
          {value ?? ''}
        </Text>
      )}
    </View>
  );
};

export const SkeletonBox: React.FC<{
  isLoading?: boolean;
  repeat?: number;
  rows?: number;
}> = props => {
  return (
    <>
      {new Array(props?.repeat ?? 1).fill('box-skeleton-').map((_, _index) => (
        <View key={_ + _index} style={Styles.skeletonSpace}>
          <SkeletonContent
            isLoading={!!props?.isLoading}
            animationDirection="diagonalDownRight"
            animationType="shiver"
            containerStyle={Styles.sketonContentLayout}
            layout={SkeletonContentLayoutBuyTitleItem}
          />
          {new Array(props?.rows ?? 8)
            .fill('row-skeleton-')
            .map((__, __index) => (
              <SkeletonContent
                key={__ + _index + '-' + __index}
                isLoading={!!props?.isLoading}
                animationDirection="diagonalDownRight"
                animationType="shiver"
                containerStyle={Styles.sketonContentLayoutBuyItem}
                layout={SkeletonContentLayoutBuyItem}
              />
            ))}
        </View>
      ))}
    </>
  );
};
