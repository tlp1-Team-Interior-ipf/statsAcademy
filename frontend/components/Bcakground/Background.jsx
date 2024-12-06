import React from 'react';
import { View, Dimensions } from 'react-native';
import Point from '../points/Points';

const BackgroundPoints = ({ dotColor = '#ffffff20', dotSize = 10, spacing = 70, positionBackground }) => {
  const { width, height } = Dimensions.get('window');
  const dots = [];

  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      dots.push({ x, y });
    }
  }

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%', left: 30, top: positionBackground}}>
      {dots.map((dot, index) => (
        <Point
          key={index}
          size={dotSize}
          color={dotColor}
          position={{ left: dot.x, top: dot.y }}
        />
      ))}
    </View>
  );
};

export default BackgroundPoints;