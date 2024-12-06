import { StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { Temas } from "../../utils/selectTheme";

export const ThematicUnit2 = ({ThematicUnit}) => {
    const { t } = useTranslation();
    const { ButtonShadowChatTheme, contentUnitsTheme2 } = Temas();

    return(
        <View style={[ThematicUniStyles.shadowContainer, { backgroundColor: ButtonShadowChatTheme }]}>
            <View style={[ThematicUniStyles.containerThematic, { backgroundColor: contentUnitsTheme2 }]}>
                <Text style={ThematicUniStyles.contentThematic}>
                    {t('Thematic-Unit')} - {ThematicUnit}
                </Text>
            </View>
        </View>
    )
}

const ThematicUniStyles = StyleSheet.create({
    containerThematic: {
        padding: 10,
        // borderWidth: 2,
        borderRadius: 10,
        width: 300,
        marginHorizontal: 'auto',
        margin: 5,
        top: -1.8
    },
    contentThematic: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#ffffff20',
        borderRadius: 10,
        padding: 5
    },
    shadowContainer: {
        left: 25,
        width: '85%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})