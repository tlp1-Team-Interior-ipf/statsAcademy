import { router, Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View, Image, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { Temas } from "../../utils/selectTheme";
import { bookImages } from "../../utils/books";

const Library = () => {
    const { t } = useTranslation();

    const { BackgroundTheme, ColumnBackgroundTheme, BorderColumnTheme  } = Temas();

    

    const centerIndex = Math.floor(bookImages.length / 2);

    const renderItem = ({ item }) => (
        <View style={[stylesKanban.card, {backgroundColor: ColumnBackgroundTheme, borderColor: BorderColumnTheme}]}>
            <Image source={item.image} style={stylesKanban.image} />
            <Text style={stylesKanban.title}>{item.title}</Text>
            <Text style={stylesKanban.description}>{item.description}</Text>
            <Text style={stylesKanban.details}>
                Autor: {item.author}{"\n"}
                Páginas: {item.pages}{"\n"}
                Idioma: {item.language}
            </Text>
            <Text style={stylesKanban.link} onPress={() => Linking.openURL(item.link)}>Más información</Text>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: BackgroundTheme, height: '100%' }}>
                <Stack.Screen
                    options={{
                        title: "Libreria",
                        headerStyle: {
                            backgroundColor: BackgroundTheme
                        },
                        headerTintColor: '#ddd',
                        headerLeft: () => (
                            <AntDesign name="arrowleft" size={22} color={'#ddd'} onPress={() => router.push('explore')} style={{ paddingLeft: 20 }} />
                        )
                    }}
                />
                <Text style={stylesKanban.textButtonAdd}>Encontrá los libros de Estadística que quieras</Text>
                <FlatList
                    data={bookImages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    initialScrollIndex={centerIndex}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesKanban.flatListContainer}
                    getItemLayout={(data, index) => ({
                        length: 330,
                        offset: 330 * index,
                        index
                    })}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const stylesKanban = StyleSheet.create({
    buttonAdd: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        borderColor: '#ddd',
        margin: 'auto',
        width: '90%',
    },

    textButtonAdd: {
        color: '#ddd',
        fontSize: 25,
        width: 350,
        textAlign: 'center',
        marginVertical: 10
    },

    textColumn: {
        color: '#ddd',
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#ddd'
    },

    flatListContainer: {
        gap: 10,
        paddingHorizontal: 10
    },

    card: {
        alignItems: 'center',
        width: 330,
        height: 630,
        padding: 20,
        borderRadius: 5,
        borderWidth: 1
    },

    image: {
        width: 207,
        height: 299
    },

    title: {
        fontSize: 25,
        color: '#ddd',
        marginVertical: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 10,
        textAlign: 'center'
    },
    details: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
        textAlign: 'center'
    },
    link: {
        fontSize: 14,
        color: '#66ccff',
        textDecorationLine: 'underline',
        marginTop: 10,
        textAlign: 'center'
    }
});

export default Library;
