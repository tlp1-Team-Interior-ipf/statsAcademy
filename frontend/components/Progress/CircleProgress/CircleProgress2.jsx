import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyCircleProgress2 = ({ heightCircle, widthCircle }) => {
  const [percentage, setPercentage] = useState(0); // Estado para el porcentaje
  const radius = 45; // Radio del círculo
  const strokeWidth = 10; // Ancho del borde
  const circumference = 2 * Math.PI * radius; // Circunferencia
  const fetchInterval = 5000; // Intervalo para el fetch (5 segundos)

  // Determinar la longitud del progreso basado en el porcentaje directo
  const progress = (percentage / 100) * circumference;

  const fetchPercentage = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId"); // Obtener userId de AsyncStorage
      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/progress/${userId}`);
      const data = await response.json();

      console.log("Respuesta del servidor:", data.data);

      if (data.data) {
        setPercentage(data.data); // Actualizar el estado con el porcentaje
      }
    } catch (error) {
      console.error("Error al obtener el progreso:", error);
    }
  };

  // Llamar a fetchPercentage periódicamente
  useEffect(() => {
    fetchPercentage(); // Llamar inmediatamente al cargar el componente
    const interval = setInterval(fetchPercentage, fetchInterval);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <View
        style={[
          stylesCircle.containerCircle,
          { height: heightCircle, width: widthCircle },
        ]}
      >
        <Svg height={100} width={100}>
          {/* Fondo del círculo */}
          <Circle
            cx={50}
            cy={50}
            r={radius}
            stroke={"#ffffff80"}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progreso del círculo */}
          <Circle
            cx={50}
            cy={50}
            r={radius}
            stroke={"#36f"}
            strokeWidth={strokeWidth}
            fill={"none"}
            strokeDasharray={`${progress}, ${circumference}`}
            strokeLinecap="round"
            rotation={-175}
            origin={"50, 50"}
          />
        </Svg>

        {/* Texto de porcentaje */}
        <Text style={stylesCircle.textBarProgress}>{percentage}%</Text>
      </View>
    </>
  );
};

const stylesCircle = StyleSheet.create({
  containerCircle: {
    zIndex: 1,
    top: -50,
    justifyContent: "center",
    alignItems: "center",
  },

  textBarProgress: {
    position: "absolute",
    fontSize: 25,
    color: "#fff",
  },
});

export default MyCircleProgress2;
