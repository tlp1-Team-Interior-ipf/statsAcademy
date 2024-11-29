import { View, Modal, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { CancelChatButton } from "../../Buttons/CancelChatButton/CancelChatButton";
import { InitClassButton } from "../../Buttons/InitClassButton/InitClassButton";

export const OpenChatModal = ({visible, handleCancelModalChat}) => {
    const { t } = useTranslation();

    return(
        <>
            <Modal visible={visible} transparent animationType="fade">
                <View style={StylesModalChat.containerModal}>
                    <View style={StylesModalChat.SubContainerModalChat}>
                        <View style={StylesModalChat.InfoModalChat}>
                            <Text style={StylesModalChat.TextModalChat}>{t('Chat-Modal')} Funciones</Text>
                        </View>
                        <View style={StylesModalChat.ContainerButtonModalChat}>
                            <InitClassButton onClose={handleCancelModalChat} />
                            <CancelChatButton onClose={handleCancelModalChat} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const StylesModalChat = StyleSheet.create({

    containerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    SubContainerModalChat: {
        backgroundColor: "#3366ff",
        padding: 25,
        borderRadius: 10,
        width: "90%",
        alignItems: "center"
    },

    InfoModalChat: {
        backgroundColor: '#ffffff50',
        padding: 30,
        borderRadius: 10,
    },

    TextModalChat: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 25
    },
    
    ContainerButtonModalChat: {
        gap: 15,
        marginVertical: 10
    }

})