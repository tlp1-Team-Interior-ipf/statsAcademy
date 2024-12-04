import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Temas } from "../../../utils/selectTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const UserJourneyScreen = () => {
  const { t } = useTranslation();
  const { BackgroundTheme, TextBackgroundTheme, TextAndLineTheme } = Temas();
  const [percentage, setPercentage] = useState(0); // Estado para el porcentaje
  const fetchInterval = 5000; // Intervalo de actualización (5 segundos)

  const totalSegments = 36; // Total de segmentos (incluye horizontales y verticales)
  const lineLength = 100; // Longitud de cada línea
  const circleRadius = 15; // Radio de los círculos en las esquinas
  const strokeWidth = 15; // Ancho de las líneas
  const totalPathLength = totalSegments * lineLength; // Longitud total del camino

  // Función para obtener el porcentaje del servidor
  const fetchPercentage = async () => {
    const userId = await AsyncStorage.getItem('userId')
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/progress/${userId}`);

      const data = await response.json();

      console.log("respuesta: ", data.data);
      
      if (data.data) {
        setPercentage(data.data);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  // Llamar a fetchPercentage periódicamente
  useEffect(() => {
    fetchPercentage(); // Llamar inmediatamente al cargar el componente
    const interval = setInterval(fetchPercentage, fetchInterval);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Generar los puntos para el patrón (derecha, abajo, izquierda, abajo)
  const points = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i <= totalSegments; i++) {
    points.push({ x, y });
    if (i % 2 === 0) {
      // Horizontal
      x = i % 4 === 0 ? x + lineLength : x - lineLength;
    } else {
      // Vertical
      y += lineLength;
    }
  }

  const progressLength = (percentage / 100) * totalPathLength; // Longitud rellenada según porcentaje

  let remainingProgress = progressLength;
  const progressPoints = points.slice(0, totalSegments).map((point, index) => {
    if (remainingProgress <= 0) {
      return { ...point, next: points[index + 1], progress: 0, completed: false };
    }
    const nextPoint = points[index + 1];
    const segmentLength = Math.sqrt(
      Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
    );
    const segmentProgress = Math.min(segmentLength, remainingProgress);
    remainingProgress -= segmentProgress;
    return {
      ...point,
      next: nextPoint,
      progress: segmentProgress,
      completed: segmentProgress === segmentLength,
    };
  });

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: BackgroundTheme }]}>
        <Text style={[styles.percentageText, {color: TextAndLineTheme}]}>{t('JourneyMapText-1')} {percentage.toFixed(2)}% {t('JourneyMapText-2')}</Text>
        <View style={{right: 20}}>
            <Svg height={2000} width={lineLength * 3}>
            {/* Líneas grises */}
            {progressPoints.map(({ x, y, next }, index) => (
                <Line
                key={`line-gray-${index}`}
                x1={x + lineLength * 1.5}
                y1={y + circleRadius}
                x2={next.x + lineLength * 1.5}
                y2={next.y + circleRadius}
                stroke="#999"
                strokeWidth={strokeWidth}
                />
            ))}

            {/* Líneas azules (progreso) */}
            {progressPoints.map(({ x, y, next, progress }, index) =>
                progress > 0 ? (
                <Line
                    key={`line-blue-${index}`}
                    x1={x + lineLength * 1.5}
                    y1={y + circleRadius}
                    x2={
                    x +
                    (next.x - x) * (progress / lineLength) +
                    lineLength * 1.5
                    }
                    y2={y + (next.y - y) * (progress / lineLength) + circleRadius}
                    stroke="#36f"
                    strokeWidth={strokeWidth}
                />
                ) : null
            )}

            {/* Círculos */}
            {points.map((point, index) => (
                <Circle
                key={`circle-${index}`}
                cx={point.x + lineLength * 1.5}
                cy={point.y + circleRadius}
                r={circleRadius}
                fill={index * lineLength <= progressLength ? "#36f" : "#999"}
                />
            ))}
            </Svg>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: 2000,
  },
  percentageText: {
    fontSize: 30,
    marginTop: -20,
    textAlign: "center",
    paddingBottom: 20,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
});

export default UserJourneyScreen;
