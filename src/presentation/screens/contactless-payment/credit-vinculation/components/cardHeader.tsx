import * as React from 'react';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { HeaderStyle } from '../styles';
import ImageCard from '../../../../common-components/credito/ImageCard';

interface Props {
  stepText: string;
  titleText: string;
  bodyText: string;
}

const CardHeader: React.FC<Props> = props => (
  <View style={HeaderStyle.container}>
    <ImageCard style={HeaderStyle.imageCard} />
    <View style={HeaderStyle.content}>
      <Text style={HeaderStyle.breadcrumb}>{props.stepText}</Text>
      <Text style={HeaderStyle.title}>{props.titleText}</Text>
      <Text style={HeaderStyle.body}>{props.bodyText}</Text>
    </View>
  </View>
);

export default memo(CardHeader);
