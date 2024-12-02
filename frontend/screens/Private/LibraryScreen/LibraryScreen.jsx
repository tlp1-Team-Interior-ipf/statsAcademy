import { FlatList, StyleSheet, Text, View, Image, Linking, ScrollView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { bookImages } from '../../../utils/booksInfo'
import { Temas } from "../../../utils/selectTheme";

const LibraryScreen = () => {
    const { t } = useTranslation();

    const { BackgroundTheme, ColumnBackgroundTheme, BorderColumnTheme  } = Temas();

    const centerIndex = Math.floor(bookImages.length / 2);

    const renderItem = ({ item }) => (
        <View style={[stylesKanban.card, {backgroundColor: ColumnBackgroundTheme, borderColor: BorderColumnTheme}]}>
            <Image source={item.image} style={stylesKanban.image} />
            <ScrollView>
                <Text style={stylesKanban.title}>{item.title}</Text>
                <Text style={stylesKanban.description}>{item.description}</Text>
                <Text style={stylesKanban.details}>
                    {t('Library-book-author')}: {item.author}{"\n"}
                    {t('Library-book-pages')}: {item.pages}{"\n"}
                    {t('lanzamiento')}: {item.lanzamiento}{"\n"}
                    {t('Library-book-language')}: {item.language}
                </Text>
                <Text style={stylesKanban.link} onPress={() => Linking.openURL(item.link)}>{t('Library-book-link')}</Text>
            </ScrollView>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ backgroundColor: BackgroundTheme, height: '100%' }}>
                <Text style={stylesKanban.textButtonAdd}>{t('Library-title')}</Text>
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
                        offset: 340 * index,
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
        width: 210,
        height: 299,
        marginBottom: 10
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
        textAlign: 'center',
        height: 60
    },
    link: {
        fontSize: 14,
        color: '#66ccff',
        textDecorationLine: 'underline',
        marginTop: 10,
        textAlign: 'center'
    }
});

export default LibraryScreen;
