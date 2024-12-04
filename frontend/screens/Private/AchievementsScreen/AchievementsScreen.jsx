import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Temas } from "../../../utils/selectTheme";

const AchievementsScreen = () => {
  // Lista de logros
  const [achievements, setAchievements] = useState([
    { id: 1, title: "Primeros pasos", description: "Completa tu primera lección", unlocked: true },
    { id: 2, title: "Constancia", description: "Ingresa a la app por 5 días seguidos", unlocked: false },
    { id: 3, title: "Superación", description: "Mejora una calificación", unlocked: true },
    { id: 4, title: "Explorador", description: "Estudia 5 temas diferentes", unlocked: false },
    { id: 5, title: "Maestro", description: "Obtén el puntaje máximo en un cuestionario", unlocked: true },
    { id: 6, title: "Comprometido", description: "Estudiar durante 30 minutos", unlocked: true },
    { id: 7, title: "100% Completado", description: "Terminar todos los modulos disponibles", unlocked: false },
    { id: 8, title: "Perfeccionista", description: "Obtener más de 90 puntos en cada tema", unlocked: false },
  ]);

  const { BackgroundTheme, TextBackgroundTheme } = Temas();

  return (
    <View style={{ flex: 1, backgroundColor: BackgroundTheme, padding: 20 }}>
      {/* Título */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: TextBackgroundTheme }}>Logros</Text>
        <Text style={{ fontSize: 16, color: TextBackgroundTheme }}>Desbloquea logros a medida que progresas</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: achievement.unlocked ? "#e0ffe0" : "#ffe0e0",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            {/* Ícono */}
            <MaterialCommunityIcons
              name={achievement.unlocked ? "trophy" : "lock"}
              size={40}
              color={achievement.unlocked ? "#4caf50" : "#f44336"}
              style={{ marginRight: 15 }}
            />
            {/* Detalles del logro */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                {achievement.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>{achievement.description}</Text>
            </View>
            {/* Estado */}
            <TouchableOpacity
              style={{
                backgroundColor: achievement.unlocked ? "#4caf50" : "#f44336",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
                {achievement.unlocked ? "Desbloqueado" : "Bloqueado"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AchievementsScreen;
