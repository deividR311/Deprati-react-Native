import React from 'react';
import { Text } from 'react-native';
import { Components } from '../index';

export type ExtensionComponentProps = {
  uid: string;
  typeCode: string;
  modifiedTime: string;
  name: string;
  container: boolean;
  childrenComponentsList: string[] | null;
  childrenComponents?: object;
  keySearch?: string;
  componentList?: {
    [key: string]: React.ReactNode;
  };
};

const extensionComponentCustom = (props: ExtensionComponentProps) => {
  const { uid, typeCode, keySearch = 'typeCode', componentList } = props;

  const { [keySearch]: keyComponent } = props;

  const DynamicComponent = componentList
    ? componentList[keyComponent]
    : Components[keyComponent];

  if (typeof DynamicComponent !== 'undefined') {
    return React.createElement(DynamicComponent, {
      key: `${uid}`,
      customProps: props
    });
  }

  if (__DEV__)
    return React.createElement(
      () => <Text>The component {typeCode} has not been created yet.</Text>,
      { key: `${uid}` }
    );
  return null;
};

export default extensionComponentCustom;
