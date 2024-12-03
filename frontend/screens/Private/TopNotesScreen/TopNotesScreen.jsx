import { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Temas } from "../../../utils/selectTheme";
import { ProfileCard } from "../../../components/Cards/ProfileCard/ProfileCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopNotesScreen = () => {
    const { t } = useTranslation();
    const { BackgroundTheme } = Temas();

    const [ratings, setRatings] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Agrupar datos en pares para filas
    const groupInPairs = (data) => {
        const pairs = [];
        for (let i = 0; i < data.length; i += 2) {
            pairs.push(data.slice(i, i + 2));
        }
        return pairs;
    };

    useEffect(() => {
        const fetchRatings = async () => {
            const userId = await AsyncStorage.getItem('userId')
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/ratings/${userId}`);
                const data = await response.json();

                if (data.success) {
                    const formattedRatings = data.data
                        .filter((item) => item.note > 60) // Filtrar notas mayores a 60
                        .map((item) => ({
                            note: item.note,
                            topicName: item.topics.name,
                            topicId: item.topicId,
                        }))
                        .sort((a, b) => b.topicId - a.topicId); // Ordenar por nota de menor a mayor

                    setRatings(formattedRatings);
                } else {
                    console.error("Error en la respuesta:", data);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchRatings();
    }, []);

    const pairedRatings = groupInPairs(ratings);

    return (
        <View style={{ backgroundColor: BackgroundTheme, alignItems: "center", height: "100%" }}>
            {/* Tema seleccionado */}
            <View
                style={{
                    width: "90%",
                    height: 120,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 5,
                    marginVertical: 5,
                    justifyContent: "center",
                    backgroundColor: "#3366ff50",
                }}
            >
                {selectedTopic ? (
                    <>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 20, padding: 10 }}>
                            {`Tu nota en el tema de ${selectedTopic.topicName} es:`}
                        </Text>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 25 }}>
                            {selectedTopic.note}
                        </Text>
                    </>
                ) : (
                    <Text style={{ color: "#ddd", textAlign: "center", fontSize: 18 }}>
                        {t("Selecciona un tema")}
                    </Text>
                )}
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                {pairedRatings.map((pair, index) => (
                    <View key={index} style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10, width: 300 }}>
                        {pair.map((item, subIndex) => (
                            <TouchableOpacity
                                key={subIndex}
                                style={{ flex: 1, marginHorizontal: 5, alignItems: 'center' }}
                                onPress={() => setSelectedTopic(item)}
                            >
                                <ProfileCard
                                    NameLibrariIcon={"MaterialCommunityIcons"}
                                    nameIcon={"notebook-check"}
                                    sizeIcon={30}
                                    textCardProfile={`Tema ${item.topicId}`}
                                    sizeText={32}
                                    sizePaddingText={10}
                                    showCounter={false}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default TopNotesScreen;
