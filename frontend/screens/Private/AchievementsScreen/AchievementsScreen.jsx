import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Temas } from "../../../utils/selectTheme";
import { useTranslation } from "react-i18next";

const AchievementsScreen = () => {
  const { t } = useTranslation();
  
  const [achievements, setAchievements] = useState([
    { id: 1, title: t('Achievement-1'), description: t('DescAchievement-1'), unlocked: true },
    { id: 2, title: t('Achievement-2'), description: t('DescAchievement-2'), unlocked: false },
    { id: 3, title: t('Achievement-3'), description: t('DescAchievement-3'), unlocked: true },
    { id: 4, title: t('Achievement-4'), description: t('DescAchievement-4'), unlocked: false },
    { id: 5, title: t('Achievement-5'), description: t('DescAchievement-5'), unlocked: true },
    { id: 6, title: t('Achievement-6'), description: t('DescAchievement-6'), unlocked: true },
    { id: 7, title: t('Achievement-7'), description: t('DescAchievement-7'), unlocked: false },
    { id: 8, title: t('Achievement-8'), description: t('DescAchievement-8'), unlocked: false },
  ]);

  const { BackgroundTheme, TextBackgroundTheme, TextAndLineTheme } = Temas();

  return (
    <View style={{ flex: 1, backgroundColor: BackgroundTheme, padding: 20 }}>
      {/* Título */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        {/* <Text style={{ fontSize: 24, fontWeight: "bold", color: TextBackgroundTheme }}>Logros</Text> */}
        <Text style={{ fontSize: 20, color: TextAndLineTheme, textAlign: 'center' }}>{t('TextAchievements')}</Text>
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
