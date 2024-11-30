// import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
// import { useTranslation } from "react-i18next";

// export const OpenOptionModal = ({visible, handleCancelModal, position}) => {
//     const { t } = useTranslation();

//     return(
//         <>
//             <Modal visible={visible} transparent animationType="fade">
//                 <Pressable style={[StylesModalChat.containerModal]} onPress={handleCancelModal}>
//                     <View style={[StylesModalChat.modalContent, ]}>
//                         <Pressable onPress={() => console.log("hola")}>
//                             <Text style={StylesModalChat.TextModalChat}>En proceso</Text>
//                         </Pressable>
//                         <Pressable onPress={() => console.log("holaa")}>
//                             <Text style={StylesModalChat.TextModalChat}>Editar</Text>
//                         </Pressable>
//                     </View>
//                 </Pressable>
//             </Modal>
//         </>
//     )
// }

// const StylesModalChat = StyleSheet.create({

//     containerModal: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         left: 90
//     },

//     SubContainerModalChat: {
//         width: 100,
//         alignItems: "center",
//         borderTopWidth: 1,
//         borderWidth: 1,
//         borderColor: '#fff',
//         top: -15
//     },

//     modalContent: {
//         backgroundColor: '#ffffff50', 
//         borderRadius: 5
//     },

//     InfoModalChat: {
//         backgroundColor: '#ffffff50',
//         padding: 30,
//         borderRadius: 10,
//     },

//     TextModalChat: {
//         textAlign: 'center',
//         color: '#fff',
//         fontSize: 18,
//         padding: 5,
//         backgroundColor: '#ffffff30',
//         margin: 2
//     },
    
//     ContainerButtonModalChat: {
//         gap: 15,
//         marginVertical: 10
//     }

// })


import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

export const OpenOptionModal = ({ visible, handleCancelModal, position }) => {
    const { t } = useTranslation();

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.containerModal} onPress={handleCancelModal}>
                <View
                    style={[
                        styles.modalContent,
                        { position: 'absolute', top: position.y, left: position.x }
                    ]}
                >
                    <Pressable onPress={() => console.log("En proceso")} style={{backgroundColor: '#eee', padding: 5}}>
                        <Text style={styles.TextModalChat}>En proceso</Text>
                    </Pressable>
                    <Pressable onPress={() => console.log("Editar")} style={{backgroundColor: '#eee', padding: 5}}>
                        <Text style={styles.TextModalChat}>Editar</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 5,
        gap: 5
    },
    TextModalChat: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
        margin: 5,
        
    },
});
