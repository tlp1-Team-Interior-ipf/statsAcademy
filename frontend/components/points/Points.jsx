import React from 'react';
import { View } from 'react-native';

const Point = ({ size, color, position }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      position: 'absolute',
      ...position,
    }}
  />
);

export default Point;
