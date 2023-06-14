import React from 'react';
import ExtensionComponent, {
  ExtensionComponentProps
} from '../../../../../common-components/extension-component';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {}

const BannerPLP = (props: Props) => {
  //obtener component child
  const { childrenComponentsList = [], childrenComponents = {} } =
    props?.customProps;
  const [firstBanner] = childrenComponentsList;
  const contentFirstBanner = childrenComponents[firstBanner];

  return <ExtensionComponent {...contentFirstBanner} />;
};

export default BannerPLP;
