import React from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import ExtensionComponent from '../extension-component';

export type ExtensionSlotProps = {
  slot: string[] | any[];
  content: any;
  horizontal?: boolean | null | undefined;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  contentStyle?: StyleProp<ViewStyle>;
  customRenderItem?: ListRenderItem<any> | null | undefined;
  children?: React.ReactNode;
  hasScroll?: boolean;
  stylesComponent?: object;
};

const ExtensionSlot = (props: ExtensionSlotProps) => {
  const {
    slot,
    content,
    horizontal,
    contentContainerStyle,
    contentStyle,
    customRenderItem,
    children,
    hasScroll = true,
    stylesComponent
  } = props;

  const renderItem = ({ item, index }) => {
    try {
      const componentContent = content?.components[item];
      if (customRenderItem)
        return customRenderItem({
          item,
          index,
          typeCode: componentContent.typeCode
        });
      const style = stylesComponent
        ? stylesComponent[componentContent?.uid]
        : {};
      if (componentContent)
        return (
          <ExtensionComponent key={index} style={style} {...componentContent} />
        );
      return null;
    } catch (err) {
      return null;
    }
  };

  if (!hasScroll) {
    return (
      <>
        {slot?.map((item, index) => renderItem({ item, index }))}
        {children}
      </>
    );
  }

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      data={slot}
      renderItem={renderItem}
      style={[{ width: '100%' }, contentStyle]}
      contentContainerStyle={contentContainerStyle}
      ListFooterComponent={() => <>{children}</>}
    />
  );
};

export default ExtensionSlot;
