import { StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"

export const ThematicUnit = ({ThematicUnit}) => {
    const { t } = useTranslation();

    return(
       <View style={ThematicUniStyles.containerThematic}>
                <Text style={ThematicUniStyles.contentThematic}>
                    {t('Thematic-Unit')} - {ThematicUnit}
                </Text>
       </View>
    )
}

const ThematicUniStyles = StyleSheet.create({
    containerThematic: {
        backgroundColor: '#ffffff40',
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#fff',
        width: 300,
        marginHorizontal: 'auto'
    },
    contentThematic: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
})