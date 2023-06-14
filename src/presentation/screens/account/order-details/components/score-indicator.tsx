import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../../../application/common/colors';

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  score = 0,
  size = 16,
  disabled = false,
  onChangeRating
}) => {
  const [rating, setRating] = React.useState(score);
  useEffect(() => {
    onChangeRating?.(rating);
  }, [rating]);
  return (
    <View style={Styles.container}>
      {new Array(5).fill(score).map((_, index) => (
        <TouchableOpacity
          key={'icon-rate-' + index}
          disabled={disabled}
          onPress={() => setRating(index + 1)}>
          <Icon
            name={'star-rate'}
            size={size}
            color={index < rating ? COLORS.ACCENTBRAND : COLORS.GRAYBRAND}
            style={Styles.icon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  icon: {
    marginLeft: 8
  }
});

export type ScoreRange = 1 | 2 | 3 | 4 | 5;
export interface ScoreIndicatorProps {
  score?: ScoreRange;
  size?: number;
  disabled?: boolean;
  onChangeRating?: (rating: number) => void;
}

export default ScoreIndicator;
