import { Pressable, StyleSheet, Text, View } from "react-native";
// import { OpenChatModal } from "../Modals/OpenChatModal/OpenChatModal";
import { OpenChatModal2 } from "../Modals/OpenChatModal/OpenChatModal2";
import { useState } from "react";
import { Entypo } from 'react-native-vector-icons'
import { Temas } from "../../utils/selectTheme";

export const Topics2 = ({ topicTop, topicLeft }) => {
  const { ButtonChatTheme1, ButtonShadowChatTheme } = Temas();
  const [showChatModal, setShowChatModal] = useState(false);

  const handleChatModal = () => {
    console.log("chat2");
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
  };

  return (
    <>
      <Pressable
        onPress={handleChatModal}
        style={({ pressed }) => [
          [TopicsStyle.TopicsContainer, { backgroundColor: ButtonShadowChatTheme }],
          { top: topicTop, left: topicLeft },
          pressed && TopicsStyle.PressedStyle, // Estilo adicional cuando está presionado
        ]}
      >
        <View style={[TopicsStyle.ButtonTopic, { backgroundColor: ButtonChatTheme1 }]}>
          <View style={TopicsStyle.TopicsContent}>
            <View style={TopicsStyle.buttonEffect}>
                <Entypo name="controller-play" size={45} color={'#ddd'} style={{position: 'absolute', left: 15, top: 12}} />
                <View style={TopicsStyle.buttonLight}></View>
            </View>
          </View>
        </View>
      </Pressable>
      <OpenChatModal2
        visible={showChatModal}
        handleCancelModalChat={closeChatModal}
      />
    </>
  );
};

const TopicsStyle = StyleSheet.create({
    TopicsContainer: {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 20,
      borderColor: "#ddd",
      // backgroundColor: "#ffffff40",
      justifyContent: "center",
      position: "absolute",
      width: 88,
      height: 90,
      alignItems: "center",
    },
  
    PressedStyle: {
    //   borderBottomWidth: 0, // Cambiar la sombra/borde
    //   transform: [{ scale: 0.95 }], // Efecto de reducción visual

        transform: [{ scaleY: 0.95 }], // Reduce solo la altura
        transformOrigin: "bottom", // Mantiene la parte inferior fija
    },
  
    TopicsContent: {
      color: "#fff",
      textAlign: "center",
    },
  
    ButtonTopic: {
      justifyContent: "center",
      // backgroundColor: "#3366ff50",
      borderRadius: 15,
      height: 75,
      width: 80,
      top: -4
    },

    buttonEffect: {
        backgroundColor: '#ffffff20',
        height: '80%',
        width: '90%',
        borderRadius: 20,
        margin: 10,
        left:-5,
        top: -5
        
    },

    buttonLight: {
        width: 20,
        height: '25%',
        backgroundColor: '#ffffff40',
        borderRadius: 50,
        top: 6,
        left: 40
    }
  });

