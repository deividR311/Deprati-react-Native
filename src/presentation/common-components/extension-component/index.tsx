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
  childrenComponents?: {
    [key: string]: any;
  };
  style?: {
    [key: string]: any;
  };
  [key: string]: any;
};

const ExtensionComponent = (props: ExtensionComponentProps) => {
  const { uid, typeCode, children } = props;

  const DynamicComponent = Components[typeCode];

  if (typeof DynamicComponent !== 'undefined') {
    return React.createElement(DynamicComponent, {
      key: `${uid}`,
      customProps: props,
      ...children
    });
  }

  if (__DEV__)
    return React.createElement(
      () => <Text>The component {typeCode} has not been created yet.</Text>,
      { key: `${uid}` }
    );
  return null;
};

export default ExtensionComponent;
