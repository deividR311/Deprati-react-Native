import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../application/common/colors';

const Point = ({ point, showCardHandle, showCard }) => {
  const { top, left } = point;
  return (
    <TouchableOpacity
      style={[styles.points_border, { top, left }]}
      onPress={() => showCardHandle(point)}>
      <View style={[styles.points_body, showCard && styles.point_selected]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  points_border: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 2,
    zindex: 2
  },
  points_body: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 14,
    height: 14,
    borderRadius: 25,
    overflow: 'hidden'
  },
  point_selected: {
    backgroundColor: COLORS.DARKBRAND
  }
});

export default Point;
